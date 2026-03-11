# AI Vocabulary Parsing

## Overview
Teachers can paste text or upload images containing vocabulary lists. The system uses OpenAI to extract structured word pairs.

## Implementation
- Service: `Services/OpenAiVocabParser.cs`
- Model: GPT-4.1-mini (with vision for images)
- Endpoints:
  - POST `/api/vocab/ai-parse` - Text-only parsing
  - POST `/api/vocab/ai-parse-upload` - Text + file upload

## Flow
1. Teacher pastes vocabulary text or uploads image
2. Frontend sends to AI parse endpoint
3. `OpenAiVocabParser` calls OpenAI API with structured JSON output schema
4. Returns array of `{ swedish, translation }` pairs
5. Teacher reviews and confirms before saving to week

## Fallback
If OpenAI fails or no API key configured:
- Regex-based text parser activates
- Detects separators: `-`, `:`, `=`
- Detects alternating rows (Swedish diacritics indicate source language)
- Returns best-effort parsed pairs

## Configuration
```json
{
  "OpenAI": {
    "ApiKey": "sk-...",
    "Model": "gpt-4.1-mini"
  }
}
```
Fallback: `OPENAI_API_KEY` environment variable.
