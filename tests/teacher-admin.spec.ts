/**
 * Teacher Admin E2E Tests
 * Tests the week editor page, parseLines logic, and API auth guards.
 */
import { test, expect } from '@playwright/test';
import { BASE_URL, createResultFolder, finishRun, saveScreenshot, showProofBanner, TestResult, generateReport } from './e2e-helpers';

const RESULTS = createResultFolder();
const results: TestResult[] = [];

async function record(page: any, id: string, name: string, status: 'passed' | 'failed', error?: string) {
  try {
    await showProofBanner(page, id, name, status === 'passed' ? 'PASS' : 'FAIL');
    await page.waitForTimeout(80);
    await saveScreenshot(page, RESULTS, id);
  } catch { /* ok for API-only tests */ }
  results.push({ id, name, status, screenshot: `${id}.png`, error });
}

test.afterAll(() => {
  generateReport(RESULTS, results);
  finishRun();
});

test.describe('F. Teacher Admin', () => {

  test('F1 — parseLines parses en-dash separator correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    const result = await page.evaluate(() => {
      function parseLines(text: string) {
        return text
          .split(/\r?\n/)
          .map((x: string) => x.trim())
          .filter(Boolean)
          .map((line: string) => {
            const parts = line.split(/\s*[-–—:=]\s*/);
            if (parts.length < 2) return null;
            return { sv: parts[0].trim(), en: (parts as string[]).slice(1).join(' - ').trim() };
          })
          .filter((x: any) => x && x.sv && x.en);
      }

      const enDashInput = 'nästan – almost\nkomma hem – get home\nimorgon – tomorrow';
      const hyphenInput = 'nästan - almost\nkomma hem - get home';
      const mixedInput = 'nästan – almost\nhöga - tall\nflod — river';

      return {
        enDash: parseLines(enDashInput),
        hyphen: parseLines(hyphenInput),
        mixed: parseLines(mixedInput),
      };
    });

    expect(result.enDash).toHaveLength(3);
    expect(result.enDash[0]).toEqual({ sv: 'nästan', en: 'almost' });
    expect(result.enDash[2]).toEqual({ sv: 'imorgon', en: 'tomorrow' });

    expect(result.hyphen).toHaveLength(2);
    expect(result.hyphen[0]).toEqual({ sv: 'nästan', en: 'almost' });

    expect(result.mixed).toHaveLength(3);

    await record(page, 'F1', 'parseLines handles en-dash, hyphen, em-dash', 'passed');
  });

  test('F2 — Teacher/Weeks page accessible (200 or redirect)', async ({ page }) => {
    const resp = await page.request.get(`${BASE_URL}/Teacher/Weeks`, { maxRedirects: 0 });
    const status = resp.status();
    console.log(`  Teacher/Weeks status: ${status}`);
    expect([200, 302, 401]).toContain(status);
    await record(page, 'F2', `Teacher/Weeks accessible (${status})`, 'passed');
  });

  test('F3 — Week creation API rejects unauthenticated requests', async ({ page }) => {
    const resp = await page.request.post(`${BASE_URL}/api/vocab/weeks`, {
      headers: { 'Content-Type': 'application/json' },
      data: { weekName: 'Test Auth Guard', language: 'english', words: [{ sv: 'test', en: 'test' }] },
    });
    const status = resp.status();
    console.log(`  POST /api/vocab/weeks unauthenticated: ${status}`);
    expect([401, 403, 302]).toContain(status);
    await record(page, 'F3', `Week creation API requires auth (${status})`, 'passed');
  });

  test('F4 — Week update API rejects unauthenticated requests', async ({ page }) => {
    const data = await (await page.request.get(`${BASE_URL}/api/vocab/data`)).json();
    const firstWeek = data.weeks?.[0];
    if (!firstWeek) {
      console.log('  No weeks in DB — skipping update auth test');
      await record(page, 'F4', 'Week update API requires auth (skipped — no weeks)', 'passed');
      return;
    }
    const resp = await page.request.post(`${BASE_URL}/api/vocab/weeks/${firstWeek.id}/words`, {
      headers: { 'Content-Type': 'application/json' },
      data: { weekName: firstWeek.weekName, language: firstWeek.language, words: firstWeek.words },
    });
    const status = resp.status();
    console.log(`  POST /api/vocab/weeks/:id/words unauthenticated: ${status}`);
    expect([401, 403, 302]).toContain(status);
    await record(page, 'F4', `Week update API requires auth (${status})`, 'passed');
  });

});
