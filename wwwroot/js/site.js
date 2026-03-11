(function () {
  const elements = {
    levelValue: document.getElementById("levelValue"),
    xpValue: document.getElementById("xpValue"),
    coinsValue: document.getElementById("coinsValue"),
    streakValue: document.getElementById("streakValue"),
    userSelectLabel: document.getElementById("userSelectLabel"),
    userSelect: document.getElementById("userSelect"),
    guestNameLabel: document.getElementById("guestNameLabel"),
    guestNameInput: document.getElementById("guestNameInput"),
    weekSelect: document.getElementById("weekSelect"),
    appLanguageSelect: document.getElementById("appLanguageSelect"),
    bossSelect: document.getElementById("bossSelect"),
    soundToggleButton: document.getElementById("soundToggleButton"),
    trainModeButton: document.getElementById("trainModeButton"),
    fortressModeButton: document.getElementById("fortressModeButton"),
    nextWordButton: document.getElementById("nextWordButton"),
    flipDirectionButton: document.getElementById("flipDirectionButton"),
    toggleModeButton: document.getElementById("toggleModeButton"),
    resetButton: document.getElementById("resetButton"),
    playerHpBar: document.getElementById("playerHpBar"),
    bossHpBar: document.getElementById("bossHpBar"),
    playerAvatarCard: document.getElementById("playerAvatarCard"),
    playerHpText: document.getElementById("playerHpText"),
    bossHpText: document.getElementById("bossHpText"),
    bossAvatarCard: document.getElementById("bossAvatarCard"),
    bossTimerText: document.getElementById("bossTimerText"),
    bossWordsLeftText: document.getElementById("bossWordsLeftText"),
    wordsProgressWrap: document.getElementById("wordsProgressWrap"),
    wordsProgressFill: document.getElementById("wordsProgressFill"),
    wordsProgressText: document.getElementById("wordsProgressText"),
    bossName: document.getElementById("bossName"),
    bossFightCanvas: document.getElementById("bossFightCanvas"),
    questionWord: document.getElementById("questionWord"),
    questionLabel: document.getElementById("questionLabel"),
    answerForm: document.getElementById("answerForm"),
    answerInput: document.getElementById("answerInput"),
    specialCharsRow: document.getElementById("specialCharsRow"),
    feedbackText: document.getElementById("feedbackText"),
    trainProgressWrap: document.getElementById("trainProgressWrap"),
    trainProgressBar: document.getElementById("trainProgressBar"),
    trainProgressText: document.getElementById("trainProgressText"),
    hintButton: document.getElementById("hintButton"),
    healButton: document.getElementById("healButton"),
    doubleButton: document.getElementById("doubleButton"),
    hintText: document.getElementById("hintText"),
    eventLog: document.getElementById("eventLog"),
    aiInput: document.getElementById("aiInput"),
    aiParseButton: document.getElementById("aiParseButton"),
    aiSaveButton: document.getElementById("aiSaveButton"),
    aiCreateWeekButton: document.getElementById("aiCreateWeekButton"),
    aiFilesInput: document.getElementById("aiFilesInput"),
    targetLanguageSelect: document.getElementById("targetLanguageSelect"),
    aiStatus: document.getElementById("aiStatus"),
    tempWordsInput: document.getElementById("tempWordsInput"),
    tempWordsAddButton: document.getElementById("tempWordsAddButton"),
    tempWordsStatus: document.getElementById("tempWordsStatus"),
    authStatusText: document.getElementById("authStatusText"),
    loginLink: document.getElementById("loginLink"),
    registerLink: document.getElementById("registerLink"),
    teacherLoginLink: document.getElementById("teacherLoginLink"),
    logoutLink: document.getElementById("logoutLink"),
    adminLink: document.getElementById("adminLink"),
    weeksOverview: document.getElementById("weeksOverview"),
    weekStatsContainer: document.getElementById("weekStatsContainer"),
    leaderboardList: document.getElementById("leaderboardList"),
    leaderboardWeekSelect: document.getElementById("leaderboardWeekSelect"),
    onlineUsersList: document.getElementById("onlineUsersList"),
    challengeInboxList: document.getElementById("challengeInboxList"),
    createGroupFightButton: document.getElementById("createGroupFightButton"),
    teacherQuickLoginButton: document.getElementById("teacherQuickLoginButton"),
    groupFightPopup: document.getElementById("groupFightPopup"),
    groupFightLanguageSelect: document.getElementById("groupFightLanguageSelect"),
    groupFightWeekSelect: document.getElementById("groupFightWeekSelect"),
    groupPoolList: document.getElementById("groupPoolList"),
    groupTeamAList: document.getElementById("groupTeamAList"),
    groupTeamBList: document.getElementById("groupTeamBList"),
    groupFightCreateButton: document.getElementById("groupFightCreateButton"),
    groupFightCancelButton: document.getElementById("groupFightCancelButton"),
    playerAvatarSelect: document.getElementById("playerAvatarSelect"),
    playerAvatarPreview: document.getElementById("playerAvatarPreview"),
    castleTree: document.getElementById("castleTree"),
    duelPrepOverlay: document.getElementById("duelPrepOverlay"),
    groupResultOverlay: document.getElementById("groupResultOverlay"),
    groupBattleFeed: document.getElementById("groupBattleFeed"),
    groupBattleBoard: document.getElementById("groupBattleBoard"),
    groupBattleStatusText: document.getElementById("groupBattleStatusText"),
    groupBattleProgressWrap: document.getElementById("groupBattleProgressWrap"),
    groupBattleProgressFill: document.getElementById("groupBattleProgressFill"),
    groupBattleProgressText: document.getElementById("groupBattleProgressText"),
    groupBattlePlayers: document.getElementById("groupBattlePlayers"),
    resetSessionButton: document.getElementById("resetSessionButton"),
    combatPanel: document.getElementById("combatPanel"),
  };

  const defaultState = {
    level: 1,
    xp: 0,
    coins: 0,
    streak: 0,
    bossMode: false,
    fortressMode: false,
    playerHp: 100,
    playerMaxHp: 100,
    bossHp: 100,
    bossMaxHp: 100,
    bossNumber: 1,
    doubleHitReady: false,
    currentWord: null,
    correctKeys: [],
    trainQueue: [],
    trainMissed: [],
    trainTotal: 0,
    trainDone: 0,
  };

  const appState = {
    users: [],
    weeks: [],
    playerAvatars: [],
    selectedPlayerImage: "",
    selectedUserId: "",
    selectedWeekId: "",
    parsedWords: [],
    detectedLanguage: "",
    suggestedWeekName: "",
    pastedFiles: [],
    tempWordsByWeek: {},
    flippedDirection: true,
    bossFight: {
      selectedBossId: "oiia",
      roundIndex: 0,
      roundWords: [],
      wordIndex: 0,
      durationSec: 20,
      startMs: 0,
    },
    fortress: {
      timerSec: 10,
      roundIndex: 0,
      blockCount: 0,
    },
    auth: {
      isAuthenticated: false,
      isAdmin: false,
      displayName: null,
      linkedProfileId: null,
      loginConfigured: true,
    },
    settings: {
      soundEnabled: true,
    },
    duel: {
      active: false,
      matchId: null,
      weekId: null,
      totalWords: 0,
      myCorrect: 0,
      myMultiplier: 1,
      pendingChallengeId: null,
      pendingChallengeWeekId: null,
      prepEndsAtMs: 0,
      prepMatchId: null,
      pendingTargetId: null,
      pendingTargetName: null,
      visualMatchId: null,
      lastSyncPlayerHp: null,
      lastSyncEnemyHp: null,
      pendingEnemyVisualShots: 0,
      initialPollDone: false,
    },
    onlineUsers: [],
    groupFight: {
      teamA: [],
      teamB: [],
      open: false,
      answerLanguage: "english",
      selectedBotId: "bot-oiia",
      botSeq: 0,
      readOnly: false,
      filterText: "",
    },
    groupBattle: {
      active: false,
      localTeam: "A",
      finishing: false,
      winnerTeam: null,
      prepEndsAtMs: 0,
      lastPrepBroadcastSecond: -1,
      teamA: [],
      teamB: [],
      maxHpA: 100,
      maxHpB: 100,
      hpA: 100,
      hpB: 100,
      totalWords: 0,
      resolvedWords: 0,
      botTimerId: 0,
      feed: [],
    },
    groupInvite: {
      current: null,
      inbox: [],
      lastInviteId: null,
      lastEventId: 0,
      initialPollDone: false,
    },
    availableLanguages: [],
    selectedLanguage: "english",
    practiceAnswerLanguage: "english",
    challengeInboxSeenIds: [],
    challengeInboxRenderKey: "",
  };

  function ensureWordsProgressElements() {
    if (elements.wordsProgressWrap && elements.wordsProgressFill && elements.wordsProgressText) {
      return;
    }
    const anchor = elements.bossWordsLeftText;
    if (!anchor || !anchor.parentElement) {
      return;
    }
    const wrap = document.createElement("div");
    wrap.id = "wordsProgressWrap";
    wrap.className = "words-progress";
    wrap.style.display = "none";

    const track = document.createElement("div");
    track.className = "words-progress-track";
    const fill = document.createElement("div");
    fill.id = "wordsProgressFill";
    track.appendChild(fill);

    const text = document.createElement("p");
    text.id = "wordsProgressText";
    text.textContent = "";

    wrap.appendChild(track);
    wrap.appendChild(text);
    anchor.insertAdjacentElement("afterend", wrap);

    elements.wordsProgressWrap = wrap;
    elements.wordsProgressFill = fill;
    elements.wordsProgressText = text;
  }

  let state = { ...defaultState };
  let bossFightEngine = null;
  let audioCtx = null;
  let toastSeed = 0;

  const bossRoster = [
    { id: "oiia", name: "OIIA Cat", color: "#f8d7a7", imageUrl: "/images/bosses/oiia.gif", difficulty: 1, difficultyLabel: "Lätt" },
    { id: "dino", name: "Chrome Dino", color: "#1f2937", imageUrl: "/images/bosses/dino.gif", difficulty: 2, difficultyLabel: "Medel" },
    { id: "kirby", name: "Kirby", color: "#ff8fc4", imageUrl: "/images/bosses/kirby.gif", difficulty: 3, difficultyLabel: "Medel" },
    { id: "t90", name: "T90 Tank", color: "#4b5d3e", imageUrl: "/images/bosses/t90.gif", difficulty: 4, difficultyLabel: "Svår" },
    { id: "shelly", name: "Shelly", color: "#8c6c4a", imageUrl: "/images/bosses/shelly.gif", difficulty: 5, difficultyLabel: "Mycket svår" },
    { id: "reaper", name: "Liemannen", color: "#262626", imageUrl: "/images/bosses/reaper.gif", difficulty: 6, difficultyLabel: "Extrem" },
  ];

  const botRoster = bossRoster.map((boss) => ({
    id: `bot-${boss.id}`,
    bossId: boss.id,
    name: `Bot ${boss.name}`,
    imageUrl: boss.imageUrl,
  }));

  const castleRoster = Array.from({ length: 20 }).map((_, idx) => ({
    level: idx + 1,
    name: `Slott ${idx + 1}`,
    icon: idx < 4 ? "🏰" : idx < 8 ? "🛡️" : idx < 12 ? "🏯" : idx < 16 ? "🏛️" : "🏟️",
  }));

  function createBossFightEngine(canvas) {
    if (!canvas) {
      return null;
    }

    const ctx = canvas.getContext("2d");
    const arena = {
      mode: "idle",
      phase: 0,
      textFlash: null,
      flashes: [],
      playerProjectiles: [],
      bossProjectiles: [],
      particles: [],
      debris: [],
      bossDeadPulse: 0,
      bossDestroyed: false,
      activeBoss: bossRoster[0],
      running: true,
      roundStartMs: 0,
      roundDurationSec: 20,
      bossX: 730,
      bossY: 190,
      onBossReach: null,
      hasReachedPlayer: false,
      bossDamageRatio: 0,
      bgFarOffset: 0,
      bgMidOffset: 0,
      bgNearOffset: 0,
      fortressBlocks: [],
      fortressShells: [],
      fortressShrapnel: [],
      fortressTimerStartMs: 0,
      fortressTimerSec: 9,
      fortressGroundY: 255,
      fortressCastleHp: 100,
      fortressMaxCastleHp: 100,
      fortressFinisherActive: false,
      fortressDefeatActive: false,
      onCastleDestroyed: null,
      images: {},
      castleImages: {},
      playerAvatarImage: null,
      duel: {
        playerHp: 100,
        playerMaxHp: 100,
        enemyHp: 100,
        enemyMaxHp: 100,
        playerLevel: 1,
        enemyLevel: 1,
        playerBlocks: [],
        enemyBlocks: [],
        projectiles: [],
        groupActive: false,
        groupLeft: [],
        groupRight: [],
        prepEndsAtMs: 0,
        leftBroadcast: { text: "", color: "#22c55e", untilMs: 0 },
        rightBroadcast: { text: "", color: "#ef4444", untilMs: 0 },
        victoryFx: null,
      },
    };

    bossRoster.forEach((boss) => {
      if (!boss.imageUrl) {
        return;
      }
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = boss.imageUrl;
      arena.images[boss.id] = image;
    });

    function getApproachRatio() {
      const startX = 730;
      const targetX = 145;
      const total = startX - targetX;
      if (total <= 0) {
        return 0;
      }
      return Math.max(0, Math.min(1, (startX - arena.bossX) / total));
    }

    function drawParallaxBackground() {
      const w = canvas.width;
      const h = canvas.height;
      const horizonY = 186;
      const groundY = 255;
      const approach = getApproachRatio();
      const speed = 0.45 + approach * 7.2;

      arena.bgFarOffset += speed * 0.2;
      arena.bgMidOffset += speed * 0.5;
      arena.bgNearOffset += speed * 1.05;

      const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
      sky.addColorStop(0, "#eef7ff");
      sky.addColorStop(1, "#dbefff");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, horizonY);

      ctx.fillStyle = "rgba(80,111,140,0.14)";
      ctx.beginPath();
      ctx.arc(760, 42, 26, 0, Math.PI * 2);
      ctx.fill();

      const farTile = 220;
      const farShift = arena.bgFarOffset % farTile;
      ctx.fillStyle = "#c4d9ea";
      for (let i = -1; i <= Math.ceil(w / farTile) + 1; i += 1) {
        const x = i * farTile - farShift;
        ctx.beginPath();
        ctx.moveTo(x - 8, horizonY);
        ctx.lineTo(x + farTile * 0.32, horizonY - 46);
        ctx.lineTo(x + farTile * 0.7, horizonY);
        ctx.closePath();
        ctx.fill();
      }

      const midTile = 120;
      const midShift = arena.bgMidOffset % midTile;
      ctx.fillStyle = "#9ab8cc";
      for (let i = -1; i <= Math.ceil(w / midTile) + 2; i += 1) {
        const x = i * midTile - midShift;
        ctx.fillRect(x + 8, 206, 6, 14);
        ctx.fillRect(x + 2, 220, 14, 36);
      }

      const ground = ctx.createLinearGradient(0, horizonY, 0, h);
      ground.addColorStop(0, "#eef0e3");
      ground.addColorStop(0.56, "#e2e8cf");
      ground.addColorStop(1, "#ccd8ae");
      ctx.fillStyle = ground;
      ctx.fillRect(0, horizonY, w, h - horizonY);

      const nearTile = 76;
      const nearShift = arena.bgNearOffset % nearTile;
      ctx.strokeStyle = "rgba(57,73,50,0.45)";
      ctx.lineWidth = 2;
      for (let i = -1; i <= Math.ceil(w / nearTile) + 2; i += 1) {
        const x = i * nearTile - nearShift;
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + 36, groundY);
        ctx.stroke();
      }

      ctx.strokeStyle = "#6b7f5a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.stroke();
    }

    function drawBossFallback(boss, bx, by) {
      ctx.fillStyle = boss.color;
      if (boss.id === "oiia") {
        ctx.beginPath();
        ctx.arc(bx, by, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(bx - 35, by - 46, 18, 18);
        ctx.fillRect(bx + 17, by - 46, 18, 18);
      } else if (boss.id === "dino") {
        ctx.fillRect(bx - 45, by - 42, 70, 70);
        ctx.fillRect(bx + 20, by - 26, 24, 16);
        ctx.fillRect(bx - 40, by + 20, 15, 22);
        ctx.fillRect(bx - 12, by + 24, 15, 18);
      } else if (boss.id === "kirby") {
        ctx.beginPath();
        ctx.arc(bx, by, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d73f86";
        ctx.fillRect(bx - 42, by + 24, 26, 16);
        ctx.fillRect(bx + 16, by + 24, 26, 16);
      } else if (boss.id === "t90") {
        ctx.fillRect(bx - 52, by - 18, 94, 36);
        ctx.fillRect(bx - 22, by - 36, 44, 20);
        ctx.fillRect(bx + 22, by - 30, 52, 8);
      } else {
        ctx.fillRect(bx - 34, by - 42, 68, 58);
        ctx.fillStyle = "#404040";
        ctx.beginPath();
        ctx.moveTo(bx - 54, by - 42);
        ctx.lineTo(bx + 54, by - 42);
        ctx.lineTo(bx, by - 84);
        ctx.closePath();
        ctx.fill();
      }
    }

    function drawBoss(t) {
      if (arena.bossDestroyed) {
        return;
      }
      const bx = arena.bossX;
      const by = arena.bossY + Math.sin(t / 220) * 4;
      const boss = arena.activeBoss;
      const damageRatio = Math.max(0, Math.min(1, arena.bossDamageRatio));
      const spinAngle = boss.id === "oiia" ? t / 180 : 0;
      const oiiaTurnPhase = t / 220;
      const oiiaSqueeze = boss.id === "oiia" ? 0.14 + 0.86 * Math.abs(Math.cos(oiiaTurnPhase)) : 1;
      const oiiaFlip = boss.id === "oiia" && Math.cos(oiiaTurnPhase) < 0 ? -1 : 1;
      const orbitX = 0;
      const orbitY = 0;
      const drawX = bx + orbitX;
      const drawY = by + orbitY;
      ctx.save();
      if (arena.bossDeadPulse > 0) {
        ctx.globalAlpha = 0.45 + Math.sin(t / 30) * 0.25;
      }

      const image = arena.images[boss.id];
      if (image && image.complete && image.naturalWidth > 0) {
        const w = boss.id === "oiia" ? 120 : 105;
        const h = boss.id === "oiia" ? 95 : 95;
        const rx = boss.id === "t90" ? w * 0.5 : w * 0.46;
        const ry = boss.id === "t90" ? h * 0.34 : h * 0.48;
        ctx.save();
        ctx.translate(drawX, drawY);
        if (boss.id === "oiia") {
          // Simulate turning around own axis: squeeze to center, flip, expand again.
          ctx.scale(oiiaSqueeze * oiiaFlip, 1);
          ctx.rotate(spinAngle * 0.08);
        }
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.clip();
        if (arena.bossDamageRatio > 0) {
          const saturation = Math.max(0.2, 1 - arena.bossDamageRatio * 0.8);
          ctx.filter = `saturate(${saturation})`;
        }
        ctx.drawImage(image, -w / 2, -h / 2, w, h);
        ctx.filter = "none";
        ctx.restore();
      } else {
        drawBossFallback(boss, bx, by);
      }

      const crackCount = Math.floor(damageRatio * 22);
      ctx.strokeStyle = "rgba(20,20,20,0.45)";
      ctx.lineWidth = 2;
      for (let i = 0; i < crackCount; i += 1) {
        const x1 = drawX - 45 + ((i * 17) % 90);
        const y1 = drawY - 40 + ((i * 29) % 80);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + ((i % 3) - 1) * 14, y1 + 16);
        ctx.stroke();
      }

      const woundCount = Math.floor(damageRatio * 9);
      for (let i = 0; i < woundCount; i += 1) {
        const wx = drawX - 36 + ((i * 21) % 72);
        const wy = drawY - 26 + ((i * 17) % 52);
        const wr = 3 + (i % 3);
        ctx.fillStyle = "rgba(90,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(wx, wy, wr, 0, Math.PI * 2);
        ctx.fill();
        if (damageRatio > 0.35 && i % 2 === 0) {
          ctx.strokeStyle = "rgba(180,20,20,0.55)";
          ctx.lineWidth = 1.7;
          ctx.beginPath();
          ctx.moveTo(wx, wy + wr);
          ctx.lineTo(wx + ((i % 3) - 1) * 2, wy + wr + 8 + (i % 4));
          ctx.stroke();
        }
      }

      ctx.restore();

      ctx.fillStyle = "#111827";
      ctx.font = "bold 16px Segoe UI";
      ctx.textAlign = "center";
      ctx.fillText(boss.name, drawX, 40);
    }

    function drawFortressBlock(block) {
      ctx.save();
      ctx.fillStyle = "#8b6a45";
      ctx.fillRect(block.x, block.y, block.w, block.h);
      ctx.strokeStyle = "rgba(40,25,12,0.4)";
      ctx.strokeRect(block.x, block.y, block.w, block.h);

      if (block.holes.length > 0) {
        ctx.globalCompositeOperation = "destination-out";
        block.holes.forEach((hole) => {
          ctx.beginPath();
          ctx.arc(block.x + hole.x, block.y + hole.y, hole.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      ctx.restore();
    }

    function drawFortressMode(t) {
      const castleX = 56;
      const castleY = 170;
      const castleW = 58;
      const castleH = 85;

      ctx.fillStyle = "#9ca3af";
      ctx.fillRect(castleX, castleY, castleW, castleH);
      ctx.fillStyle = "#6b7280";
      ctx.fillRect(castleX + 8, castleY - 12, 14, 12);
      ctx.fillRect(castleX + 36, castleY - 12, 14, 12);
      ctx.fillStyle = "#111827";
      ctx.fillRect(castleX + 22, castleY + 45, 14, 40);

      drawBoss(t);
      arena.fortressBlocks.forEach(drawFortressBlock);

      arena.fortressShells.forEach((shell) => {
        ctx.fillStyle = "#7f1d1d";
        ctx.beginPath();
        ctx.arc(shell.x, shell.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(90,10,10,0.3)";
        ctx.fillRect(shell.x + 4, shell.y + 4, 6, 6);
      });
      arena.fortressShrapnel.forEach((piece) => {
        ctx.fillStyle = "#fde68a";
        ctx.beginPath();
        ctx.arc(piece.x, piece.y, piece.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      const hpRatio = Math.max(0, arena.fortressCastleHp / arena.fortressMaxCastleHp);
      ctx.fillStyle = "#111827";
      ctx.fillRect(28, 16, 170, 12);
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(28, 16, 170 * hpRatio, 12);
      ctx.fillStyle = "#111827";
      ctx.font = "bold 13px Segoe UI";
      ctx.textAlign = "left";
      ctx.fillText(`Borg HP: ${Math.round(arena.fortressCastleHp)}`, 28, 44);
    }

    function buildDuelCastleBlocks(side, level) {
      const blocks = [];
      const baseX = side === "left" ? 54 : canvas.width - 124;
      const scale = 1 + Math.min(0.95, Math.max(0, level - 1) * 0.035);
      const rows = [
        [30, 18], [30, 18], [30, 18],
        [34, 20], [34, 20], [34, 20],
        [40, 22], [40, 22],
        [48, 24],
      ];
      let y = 252;
      let idx = 0;
      for (let r = 0; r < 3; r += 1) {
        const count = 3 - r;
        for (let c = 0; c < count; c += 1) {
          const shape = rows[idx] || [34, 20];
          const w = shape[0] * scale;
          const h = shape[1] * scale;
          const x = baseX + (side === "left" ? c * (w + 3) : -c * (w + 3));
          blocks.push({
            x: side === "left" ? x : x - w,
            y: y - h,
            w,
            h,
            holes: [],
          });
          idx += 1;
        }
        y -= 22 * scale;
      }
      return blocks;
    }

    function ensureCastleImage(level) {
      const safeLevel = Math.max(1, Math.min(20, Math.round(Number(level || 1))));
      if (arena.castleImages[safeLevel]) {
        return arena.castleImages[safeLevel];
      }
      const candidates = [
        `/images/castles/level-${safeLevel}.gif`,
        `/images/castles/level-${safeLevel}.png`,
        `/images/castles/level-${safeLevel}.webp`,
        `/images/castles/level-${safeLevel}.jpg`,
        `/images/castles/slott-${safeLevel}.gif`,
        `/images/castles/slott-${safeLevel}.png`,
        `/images/castles/slott-${safeLevel}.webp`,
        `/images/castles/slott-${safeLevel}.jpg`,
      ];
      const entry = { image: new Image(), ready: false };
      arena.castleImages[safeLevel] = entry;
      let candidateIndex = 0;
      entry.image.crossOrigin = "anonymous";
      entry.image.onload = () => {
        entry.ready = true;
      };
      entry.image.onerror = () => {
        candidateIndex += 1;
        if (candidateIndex < candidates.length) {
          entry.image.src = candidates[candidateIndex];
        }
      };
      entry.image.src = candidates[0];
      return entry;
    }

    function getCastleDamageRatio(blocks) {
      if (!Array.isArray(blocks) || !blocks.length) {
        return 1;
      }
      let totalArea = 0;
      let intactArea = 0;
      blocks.forEach((block) => {
        const area = Math.max(1, block.w * block.h);
        totalArea += area;
        intactArea += area * Math.max(0, Math.min(1, getBlockIntegrity(block)));
      });
      if (totalArea <= 0) {
        return 0;
      }
      return Math.max(0, Math.min(1, 1 - intactArea / totalArea));
    }

    function drawLevelCastleSprite(level, x, y, w, h, side, damageRatio = 0) {
      const safeLevel = Math.max(1, Math.min(20, Math.round(Number(level || 1))));
      const imageEntry = ensureCastleImage(safeLevel);
      const dir = side === "left" ? 1 : -1;
      ctx.save();
      if (imageEntry.ready && imageEntry.image.complete && imageEntry.image.naturalWidth > 0) {
        ctx.drawImage(imageEntry.image, x, y, w, h);
      } else {
        const tone = side === "left" ? "#94a3b8" : "#fca5a5";
        const shade = side === "left" ? "#475569" : "#9f1239";
        const towerCount = 2 + Math.min(4, Math.floor((safeLevel - 1) / 4));
        const baseH = h * (0.5 + Math.min(0.4, safeLevel * 0.02));
        const baseY = y + h - baseH;
        ctx.fillStyle = tone;
        ctx.fillRect(x, baseY, w, baseH);
        ctx.strokeStyle = shade;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, baseY, w, baseH);
        for (let i = 0; i < towerCount; i += 1) {
          const tw = Math.max(8, w * 0.12);
          const gap = towerCount === 1 ? 0 : ((w - tw) / (towerCount - 1));
          const tx = x + i * gap;
          const th = h * (0.3 + (i % 2 === 0 ? 0.1 : 0.04)) + (safeLevel * 0.35);
          const ty = baseY - th;
          ctx.fillRect(tx, ty, tw, th);
          ctx.strokeRect(tx, ty, tw, th);
          ctx.fillRect(tx + 2, ty - 5, tw - 4, 5);
        }
        const gateW = Math.max(10, w * 0.16);
        const gateH = Math.max(14, h * 0.24);
        const gateX = x + w / 2 - gateW / 2 + dir * 2;
        const gateY = y + h - gateH;
        ctx.fillStyle = "#1f2937";
        ctx.fillRect(gateX, gateY, gateW, gateH);
      }

      const cracks = Math.floor(Math.max(0, Math.min(1, damageRatio)) * 22);
      ctx.strokeStyle = "rgba(15,23,42,0.45)";
      ctx.lineWidth = 1.6;
      for (let i = 0; i < cracks; i += 1) {
        const cx = x + 8 + ((i * 17) % Math.max(10, w - 16));
        const cy = y + 8 + ((i * 29) % Math.max(10, h - 16));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + ((i % 3) - 1) * 9, cy + 10);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawBlockWithHoles(block, fill = "#9ca3af", edge = "#6b7280") {
      ctx.save();
      ctx.fillStyle = fill;
      ctx.fillRect(block.x, block.y, block.w, block.h);
      ctx.strokeStyle = edge;
      ctx.strokeRect(block.x, block.y, block.w, block.h);
      if (block.holes.length) {
        ctx.globalCompositeOperation = "destination-out";
        block.holes.forEach((hole) => {
          ctx.beginPath();
          ctx.arc(block.x + hole.x, block.y + hole.y, hole.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      ctx.restore();
    }

    function damageCastleBlocks(blocks, x, y, radius, intensity = 1) {
      blocks.forEach((block) => {
        const closestX = Math.max(block.x, Math.min(x, block.x + block.w));
        const closestY = Math.max(block.y, Math.min(y, block.y + block.h));
        const dx = x - closestX;
        const dy = y - closestY;
        if (dx * dx + dy * dy > radius * radius) {
          return;
        }
        const holesToAdd = Math.max(2, Math.floor(3 * intensity + Math.random() * 3));
        for (let i = 0; i < holesToAdd; i += 1) {
          const localX = Math.max(2, Math.min(block.w - 2, x - block.x + (Math.random() - 0.5) * radius));
          const localY = Math.max(2, Math.min(block.h - 2, y - block.y + (Math.random() - 0.5) * radius));
          const r = 4 + Math.random() * (7 + 6 * intensity);
          block.holes.push({ x: localX, y: localY, r });
        }
      });
      for (let i = blocks.length - 1; i >= 0; i -= 1) {
        if (getBlockIntegrity(blocks[i]) < 0.28) {
          const b = blocks[i];
          addImpactParticles(b.x + b.w / 2, b.y + b.h / 2, 55, "#fca5a5", "#fde68a");
          blocks.splice(i, 1);
        }
      }
    }

    function createGroupCastleBlocks() {
      return [
        { x: 0, y: 30, w: 36, h: 14, holes: [] },
        { x: 6, y: 16, w: 24, h: 14, holes: [] },
        { x: 11, y: 4, w: 14, h: 12, holes: [] },
      ];
    }

    function slotById(id) {
      return arena.duel.groupLeft.find((x) => x.id === id) || arena.duel.groupRight.find((x) => x.id === id) || null;
    }

    function ensureSlotImage(slot) {
      if (!slot || !slot.avatarUrl) {
        return;
      }
      if (slot.avatarImage) {
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = slot.avatarUrl;
      slot.avatarImage = img;
    }

    function updateGroupVictoryFx() {
      const fx = arena.duel.victoryFx;
      if (!fx || !fx.active) {
        return;
      }
      const floor = canvas.height - 10;
      fx.icons.forEach((icon) => {
        icon.x += icon.vx;
        icon.y += icon.vy;
        icon.vy += 0.24;
        if (icon.x <= icon.r) {
          icon.x = icon.r;
          icon.vx = Math.abs(icon.vx) * 0.92;
        } else if (icon.x >= canvas.width - icon.r) {
          icon.x = canvas.width - icon.r;
          icon.vx = -Math.abs(icon.vx) * 0.92;
        }
        if (icon.y >= floor - icon.r) {
          icon.y = floor - icon.r;
          icon.vy = -Math.abs(icon.vy) * 0.78;
          icon.vx *= 0.98;
        }
      });
      if (Date.now() > fx.untilMs) {
        fx.active = false;
      }
    }

    function drawGroupVictoryFx() {
      const fx = arena.duel.victoryFx;
      if (!fx || !fx.active) {
        return;
      }
      const alpha = Math.max(0.2, Math.min(1, (fx.untilMs - Date.now()) / 1200));
      ctx.save();
      ctx.globalAlpha = 0.28 * alpha;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 28px Segoe UI";
      ctx.textAlign = "center";
      ctx.fillText(`${fx.winnerName} VANN!`, canvas.width / 2, 42);
      ctx.restore();

      fx.icons.forEach((icon) => {
        if (icon.image && icon.image.complete && icon.image.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(icon.x, icon.y, icon.r, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(icon.image, icon.x - icon.r, icon.y - icon.r, icon.r * 2, icon.r * 2);
          ctx.restore();
        } else {
          ctx.save();
          ctx.fillStyle = icon.color;
          ctx.beginPath();
          ctx.arc(icon.x, icon.y, icon.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 11px Segoe UI";
          ctx.textAlign = "center";
          ctx.fillText(icon.letter, icon.x, icon.y + 3);
          ctx.restore();
        }
      });
    }

    function drawGroupSlot(slot, index, side) {
      const y = 70 + index * 84;
      const x = side === "left" ? 56 : canvas.width - 112;
      slot._cx = side === "left" ? x + 18 : x + 18;
      slot._cy = y + 22;

      const castleDamage = getCastleDamageRatio(slot.blocks);
      drawLevelCastleSprite(slot.castleLevel || 1, x - 6, y - 2, 52, 56, side, castleDamage);

      const hpRatio = Math.max(0, Math.min(1, slot.hp / Math.max(1, slot.maxHp)));
      ctx.fillStyle = "#111827";
      ctx.fillRect(x - 4, y + 48, 44, 6);
      ctx.fillStyle = side === "left" ? "#22c55e" : "#ef4444";
      ctx.fillRect(x - 4, y + 48, 44 * hpRatio, 6);

      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 6);
      ctx.lineTo(x + 18, y - 14);
      ctx.stroke();
      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.moveTo(x + 18, y - 14);
      ctx.lineTo(x + 34, y - 8);
      ctx.lineTo(x + 18, y - 2);
      ctx.closePath();
      ctx.fill();

      ensureSlotImage(slot);
      if (slot.avatarImage && slot.avatarImage.complete && slot.avatarImage.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + 26, y - 8, 7, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(slot.avatarImage, x + 19, y - 15, 14, 14);
        ctx.restore();
      } else {
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 8px Segoe UI";
        ctx.textAlign = "center";
        const letter = (slot.name || "?").trim().charAt(0).toUpperCase() || "?";
        ctx.fillText(letter, x + 26, y - 6);
      }
    }

    function drawGroupBattleMode() {
      arena.duel.groupLeft.forEach((slot, idx) => drawGroupSlot(slot, idx, "left"));
      arena.duel.groupRight.forEach((slot, idx) => drawGroupSlot(slot, idx, "right"));

      const now = Date.now();
      if (arena.duel.leftBroadcast.untilMs > now && arena.duel.leftBroadcast.text) {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = arena.duel.leftBroadcast.color;
        ctx.font = "bold 14px Segoe UI";
        ctx.textAlign = "left";
        ctx.fillText(arena.duel.leftBroadcast.text, 24, 58);
        ctx.restore();
      }
      if (arena.duel.rightBroadcast.untilMs > now && arena.duel.rightBroadcast.text) {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = arena.duel.rightBroadcast.color;
        ctx.font = "bold 14px Segoe UI";
        ctx.textAlign = "right";
        ctx.fillText(arena.duel.rightBroadcast.text, canvas.width - 24, 58);
        ctx.restore();
      }

      if (arena.duel.prepEndsAtMs > now) {
        const remain = Math.max(0, arena.duel.prepEndsAtMs - now);
        const seconds = Math.ceil(remain / 1000);
        ctx.save();
        ctx.fillStyle = "rgba(15,23,42,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 26px Segoe UI";
        ctx.textAlign = "center";
        ctx.fillText(`GOR DIG REDO: ${seconds}`, canvas.width / 2, canvas.height / 2 - 6);
        ctx.font = "bold 14px Segoe UI";
        ctx.fillStyle = "#93c5fd";
        ctx.fillText("Matchen startar om 10 sekunder", canvas.width / 2, canvas.height / 2 + 24);
        ctx.restore();
      }

      arena.duel.projectiles.forEach((p) => {
        ctx.fillStyle = p.color || "#f97316";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5.4, 0, Math.PI * 2);
        ctx.fill();
      });

      drawGroupVictoryFx();
    }

    function drawDuelMode() {
      if (arena.duel.groupActive) {
        drawGroupBattleMode();
        return;
      }
      const leftBlocks = arena.duel.playerBlocks;
      const rightBlocks = arena.duel.enemyBlocks;
      const leftX = 48;
      const rightX = canvas.width - 128;
      const castleY = 152;
      const castleW = 80;
      const castleH = 98;
      drawLevelCastleSprite(arena.duel.playerLevel || 1, leftX, castleY, castleW, castleH, "left", getCastleDamageRatio(leftBlocks));
      drawLevelCastleSprite(arena.duel.enemyLevel || 1, rightX, castleY, castleW, castleH, "right", getCastleDamageRatio(rightBlocks));

      arena.duel.projectiles.forEach((p) => {
        ctx.fillStyle = p.color || "#f97316";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      const pRatio = Math.max(0, Math.min(1, arena.duel.playerHp / Math.max(1, arena.duel.playerMaxHp)));
      const eRatio = Math.max(0, Math.min(1, arena.duel.enemyHp / Math.max(1, arena.duel.enemyMaxHp)));
      ctx.fillStyle = "#111827";
      ctx.fillRect(20, 12, 180, 10);
      ctx.fillRect(canvas.width - 200, 12, 180, 10);
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(20, 12, 180 * pRatio, 10);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(canvas.width - 200 + 180 * (1 - eRatio), 12, 180 * eRatio, 10);
      ctx.fillStyle = "#111827";
      ctx.font = "bold 12px Segoe UI";
      ctx.textAlign = "left";
      ctx.fillText(`Ditt slott HP ${Math.round(arena.duel.playerHp)}/${Math.round(arena.duel.playerMaxHp)}`, 20, 38);
      ctx.textAlign = "right";
      ctx.fillText(`Motst. slott HP ${Math.round(arena.duel.enemyHp)}/${Math.round(arena.duel.enemyMaxHp)}`, canvas.width - 20, 38);

      if (arena.duel.prepEndsAtMs > Date.now()) {
        const remain = Math.max(0, arena.duel.prepEndsAtMs - Date.now());
        const seconds = Math.ceil(remain / 1000);
        ctx.save();
        ctx.fillStyle = "rgba(15,23,42,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 28px Segoe UI";
        ctx.textAlign = "center";
        ctx.fillText(`GOR DIG REDO: ${seconds}`, canvas.width / 2, canvas.height / 2 - 8);
        ctx.font = "bold 14px Segoe UI";
        ctx.fillStyle = "#93c5fd";
        ctx.fillText("Fighten startar om 10 sekunder", canvas.width / 2, canvas.height / 2 + 22);
        ctx.restore();
      }
    }

    function tickDuelProjectiles() {
      arena.duel.projectiles = arena.duel.projectiles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.life -= 1;
        if (p.life <= 0) {
          return false;
        }
        if (p.toSlotId) {
          const slot = slotById(p.toSlotId);
          if (!slot) {
            return false;
          }
          const reached = Math.hypot(p.x - (slot._cx || p.tx), p.y - (slot._cy || p.ty)) < 11 || p.y >= 260;
          if (reached) {
            arena.flashes.push({ x: p.x, y: p.y, radius: 36, life: 14, color: "#fb7185" });
            addImpactParticles(p.x, p.y, 96, "#f59e0b", "#fca5a5");
            slot.blocks.forEach((b) => {
              const abs = { x: (slot._cx - 18) + b.x, y: (slot._cy - 22) + b.y, w: b.w, h: b.h, holes: b.holes };
              damageCastleBlocks([abs], p.x, p.y, 42, Math.max(0.2, p.damageRatio || 0.2));
              b.holes = abs.holes;
            });
            return false;
          }
          return true;
        }
        if ((p.to === "enemy" && p.x >= p.tx) || (p.to === "player" && p.x <= p.tx) || p.y >= 252) {
          arena.flashes.push({ x: p.x, y: p.y, radius: 42, life: 14, color: "#fb7185" });
          addImpactParticles(p.x, p.y, 120, "#f59e0b", "#fca5a5");
          if (p.to === "enemy") {
            damageCastleBlocks(arena.duel.enemyBlocks, p.x, p.y, 52, Math.max(0.2, p.damageRatio));
          } else {
            damageCastleBlocks(arena.duel.playerBlocks, p.x, p.y, 52, Math.max(0.2, p.damageRatio));
          }
          return false;
        }
        return true;
      });
    }

    function addImpactParticles(x, y, count, colorA = "#fbbf24", colorB = "#fca5a5") {
      for (let i = 0; i < count; i += 1) {
        arena.particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 7.6,
          vy: (Math.random() - 0.5) * 7.6,
          life: 24 + Math.random() * 28,
          color: i % 2 === 0 ? colorA : colorB,
        });
      }
    }

    function damageBlocksAt(x, y, blastRadius) {
      arena.fortressBlocks.forEach((block) => {
        const closestX = Math.max(block.x, Math.min(x, block.x + block.w));
        const closestY = Math.max(block.y, Math.min(y, block.y + block.h));
        const dx = x - closestX;
        const dy = y - closestY;
        if (dx * dx + dy * dy > blastRadius * blastRadius) {
          return;
        }

        const holesToAdd = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < holesToAdd; i += 1) {
          const localX = Math.max(2, Math.min(block.w - 2, x - block.x + (Math.random() - 0.5) * blastRadius));
          const localY = Math.max(2, Math.min(block.h - 2, y - block.y + (Math.random() - 0.5) * blastRadius));
          const r = 4 + Math.random() * 11;
          block.holes.push({ x: localX, y: localY, r });
        }

        addImpactParticles(x, y, 70, "#f59e0b", "#fef08a");
      });
    }

    function damageCastle(amount, hitX, hitY) {
      if (amount <= 0) {
        return;
      }
      const hpBefore = arena.fortressCastleHp;
      arena.fortressCastleHp = Math.max(0, arena.fortressCastleHp - amount);
      arena.flashes.push({ x: hitX, y: hitY, radius: 34, life: 16, color: "#ef4444" });
      addImpactParticles(hitX, hitY, 95, "#ef4444", "#fca5a5");
      if (hpBefore > 0 && arena.fortressCastleHp <= 0 && typeof arena.onCastleDestroyed === "function") {
        arena.onCastleDestroyed();
      }
    }

    function applyExplosionDamageToCastle(x, y, blastRadius, maxDamage) {
      const castleRect = { x: 56, y: 170, w: 58, h: 85 };
      const closestX = Math.max(castleRect.x, Math.min(x, castleRect.x + castleRect.w));
      const closestY = Math.max(castleRect.y, Math.min(y, castleRect.y + castleRect.h));
      const dx = x - closestX;
      const dy = y - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > blastRadius) {
        return;
      }
      const overlapRatio = Math.max(0, 1 - distance / blastRadius);
      const damage = maxDamage * overlapRatio;
      damageCastle(damage, closestX, closestY);
    }

    function spawnFortressShrapnel(x, y, count) {
      for (let i = 0; i < count; i += 1) {
        arena.fortressShrapnel.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 11.8,
          vy: -1.8 + (Math.random() - 0.5) * 8.6,
          life: 34 + Math.random() * 44,
          r: 2.2 + Math.random() * 2.8,
          damage: 1.8 + Math.random() * 3.2,
          bounces: 3,
        });
      }
    }

    function explodeFortressShell(x, y, blastRadius, maxCastleExplosionDamage, shrapnelCount = 56) {
      arena.flashes.push({ x, y, radius: blastRadius * 1.25, life: 16, color: "#fb7185" });
      arena.flashes.push({ x, y, radius: blastRadius * 0.8, life: 14, color: "#fde68a" });
      addImpactParticles(x, y, 460, "#f59e0b", "#fca5a5");
      damageBlocksAt(x, y, blastRadius);
      applyExplosionDamageToCastle(x, y, blastRadius, maxCastleExplosionDamage);
      if (shrapnelCount > 0) {
        spawnFortressShrapnel(x, y, shrapnelCount);
      }
    }

    function isLocalPointSolid(block, localX, localY) {
      if (localX < 0 || localX > block.w || localY < 0 || localY > block.h) {
        return false;
      }
      for (let i = 0; i < block.holes.length; i += 1) {
        const hole = block.holes[i];
        const dx = localX - hole.x;
        const dy = localY - hole.y;
        if (dx * dx + dy * dy <= hole.r * hole.r) {
          return false;
        }
      }
      return true;
    }

    function isPointInSolidFortressBlock(px, py, block) {
      if (px < block.x || px > block.x + block.w || py < block.y || py > block.y + block.h) {
        return false;
      }
      return isLocalPointSolid(block, px - block.x, py - block.y);
    }

    function getBlockIntegrity(block) {
      let holeArea = 0;
      for (let i = 0; i < block.holes.length; i += 1) {
        const hole = block.holes[i];
        holeArea += Math.PI * hole.r * hole.r;
      }
      const blockArea = Math.max(1, block.w * block.h);
      return Math.max(0, 1 - holeArea / blockArea);
    }

    function pruneCollapsedBlocks() {
      const survivors = [];
      for (let i = 0; i < arena.fortressBlocks.length; i += 1) {
        const block = arena.fortressBlocks[i];
        if (getBlockIntegrity(block) < 0.36) {
          const cx = block.x + block.w / 2;
          const cy = block.y + block.h / 2;
          arena.flashes.push({ x: cx, y: cy, radius: 34, life: 12, color: "#f59e0b" });
          addImpactParticles(cx, cy, 85, "#fbbf24", "#fca5a5");
          continue;
        }
        survivors.push(block);
      }
      arena.fortressBlocks = survivors;
    }

    function getSupportCoverage(other, overlapStart, overlapEnd) {
      const overlapWidth = overlapEnd - overlapStart;
      if (overlapWidth <= 0) {
        return 0;
      }
      const samples = 7;
      let solid = 0;
      for (let i = 0; i < samples; i += 1) {
        const t = i / (samples - 1);
        const x = overlapStart + overlapWidth * t;
        if (isLocalPointSolid(other, x - other.x, 1.2)) {
          solid += 1;
        }
      }
      return solid / samples;
    }

    function doesShellHitSolidFortressBlock(shell, block) {
      const shellRadius = 7;
      if (shell.x + shellRadius < block.x || shell.x - shellRadius > block.x + block.w
        || shell.y + shellRadius < block.y || shell.y - shellRadius > block.y + block.h) {
        return false;
      }

      const sampleOffsets = [
        [0, 0],
        [shellRadius * 0.8, 0],
        [-shellRadius * 0.8, 0],
        [0, shellRadius * 0.8],
        [0, -shellRadius * 0.8],
        [shellRadius * 0.56, shellRadius * 0.56],
        [shellRadius * 0.56, -shellRadius * 0.56],
        [-shellRadius * 0.56, shellRadius * 0.56],
        [-shellRadius * 0.56, -shellRadius * 0.56],
      ];

      for (let i = 0; i < sampleOffsets.length; i += 1) {
        const offset = sampleOffsets[i];
        if (isPointInSolidFortressBlock(shell.x + offset[0], shell.y + offset[1], block)) {
          return true;
        }
      }
      return false;
    }

    function resolveBlockPhysics() {
      pruneCollapsedBlocks();
      const groundY = arena.fortressGroundY;
      const gravity = 0.34;
      const maxFallSpeed = 12;
      for (let i = 0; i < arena.fortressBlocks.length; i += 1) {
        const block = arena.fortressBlocks[i];
        const previousBottom = block.y + block.h;
        block.vy = Math.min(maxFallSpeed, block.vy + gravity);
        block.y += block.vy;

        if (block.y + block.h >= groundY) {
          block.y = groundY - block.h;
          block.vy = 0;
          continue;
        }

        let bestSupportY = Number.POSITIVE_INFINITY;
        for (let j = 0; j < arena.fortressBlocks.length; j += 1) {
          if (i === j) {
            continue;
          }
          const other = arena.fortressBlocks[j];
          const overlapStart = Math.max(block.x, other.x);
          const overlapEnd = Math.min(block.x + block.w, other.x + other.w);
          if (overlapEnd <= overlapStart) {
            continue;
          }
          const crossedTop = previousBottom <= other.y + 1.5 && block.y + block.h >= other.y;
          if (!crossedTop) {
            continue;
          }
          const coverage = getSupportCoverage(other, overlapStart, overlapEnd);
          if (coverage < 0.34) {
            continue;
          }
          if (other.y < bestSupportY) {
            bestSupportY = other.y;
          }
        }
        if (Number.isFinite(bestSupportY)) {
          block.y = bestSupportY - block.h;
          block.vy = 0;
        }
      }
    }

    function lobFortressShell() {
      const sx = arena.bossX - 24;
      const sy = arena.bossY - 6;
      const castleCenterX = 56 + 58 / 2;
      let targetX = castleCenterX + (Math.random() - 0.5) * 18;
      if (arena.fortressBlocks.length > 0) {
        // Prioritize closest block to the castle to pressure defense weak spots.
        let bestBlock = arena.fortressBlocks[0];
        for (let i = 1; i < arena.fortressBlocks.length; i += 1) {
          if (arena.fortressBlocks[i].x < bestBlock.x) {
            bestBlock = arena.fortressBlocks[i];
          }
        }
        targetX = bestBlock.x + bestBlock.w * (0.35 + Math.random() * 0.3) + (Math.random() - 0.5) * 10;
      }
      targetX = Math.max(78, Math.min(540, targetX));
      const targetY = arena.fortressGroundY - 4;
      const g = 0.18;
      const time = 39 + Math.random() * 7.5;
      const vx = (targetX - sx) / time;
      const vy = (targetY - sy - 0.5 * g * time * time) / time;
      arena.fortressShells.push({ x: sx, y: sy, vx, vy, life: 260 });
    }

    function tickFortressShells() {
      const castleRect = { x: 56, y: 170, w: 58, h: 85 };
      arena.fortressShells = arena.fortressShells.filter((shell) => {
        shell.x += shell.vx;
        shell.y += shell.vy;
        shell.vy += 0.18;
        shell.life -= 1;

        const hitsCastle = shell.x >= castleRect.x && shell.x <= castleRect.x + castleRect.w
          && shell.y >= castleRect.y && shell.y <= castleRect.y + castleRect.h;
        if (hitsCastle) {
          // Direct hit on castle should deal a fixed chunk, not instant-kill.
          damageCastle(33, shell.x, shell.y);
          explodeFortressShell(shell.x, shell.y, 56, 0, 0);
          return false;
        }

        let hitBlock = false;
        for (let i = 0; i < arena.fortressBlocks.length; i += 1) {
          const b = arena.fortressBlocks[i];
          if (doesShellHitSolidFortressBlock(shell, b)) {
            hitBlock = true;
            break;
          }
        }

        if (hitBlock || shell.y >= arena.fortressGroundY) {
          explodeFortressShell(shell.x, shell.y, 42 + Math.random() * 16, 22);
          return false;
        }

        return shell.life > 0;
      });
    }

    function tickFortressShrapnel() {
      const castleRect = { x: 56, y: 170, w: 58, h: 85 };
      arena.fortressShrapnel = arena.fortressShrapnel.filter((piece) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vy += 0.17;
        piece.vx *= 0.995;
        piece.life -= 1;

        const hitsCastle = piece.x >= castleRect.x && piece.x <= castleRect.x + castleRect.w
          && piece.y >= castleRect.y && piece.y <= castleRect.y + castleRect.h;
        if (hitsCastle) {
          damageCastle(piece.damage, piece.x, piece.y);
          return false;
        }

        for (let i = 0; i < arena.fortressBlocks.length; i += 1) {
          const block = arena.fortressBlocks[i];
          if (isPointInSolidFortressBlock(piece.x, piece.y, block)) {
            damageBlocksAt(piece.x, piece.y, 8 + Math.random() * 4);
            if (piece.bounces > 0) {
              piece.vx *= -0.55;
              piece.vy *= -0.45;
              piece.bounces -= 1;
              piece.life -= 3;
              return piece.life > 0;
            }
            return false;
          }
        }

        if (piece.y >= arena.fortressGroundY) {
          if (piece.bounces > 0) {
            piece.y = arena.fortressGroundY - 1;
            piece.vy *= -0.5;
            piece.vx *= 0.8;
            piece.bounces -= 1;
            piece.life -= 2;
            addImpactParticles(piece.x, arena.fortressGroundY - 2, 12, "#fca5a5", "#fde68a");
            return piece.life > 0;
          }
          return false;
        }

        return piece.life > 0;
      });
    }

    function tickProjectiles() {
      arena.playerProjectiles = arena.playerProjectiles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (arena.bossDestroyed) {
          return p.life > 0;
        }
        if (Math.abs(p.x - arena.bossX) < 46 && Math.abs(p.y - arena.bossY) < 44) {
          if (typeof p.onHit === "function") {
            p.onHit();
          }
          return false;
        }
        return p.life > 0;
      });
      arena.bossProjectiles = arena.bossProjectiles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        return p.life > 0;
      });
      arena.particles = arena.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life -= 1;
        return p.life > 0;
      });
      arena.debris = arena.debris.filter((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.06;
        d.rot += d.vr;
        d.life -= 1;
        return d.life > 0;
      });
      arena.flashes = arena.flashes.filter((f) => {
        f.life -= 1;
        return f.life > 0;
      });
      arena.bossDeadPulse = Math.max(0, arena.bossDeadPulse - 0.03);
      updateGroupVictoryFx();
    }

    function drawEffects() {
      arena.playerProjectiles.forEach((p) => {
        ctx.fillStyle = p.color || "#22d3ee";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });
      arena.bossProjectiles.forEach((p) => {
        ctx.fillStyle = "#fb7185";
        ctx.fillRect(p.x - 4, p.y - 4, 8, 8);
      });
      arena.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      });
      arena.debris.forEach((d) => {
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rot);
        if (d.image && d.image.complete && d.image.naturalWidth > 0) {
          ctx.drawImage(d.image, d.sx, d.sy, d.sw, d.sh, -d.dw / 2, -d.dh / 2, d.dw, d.dh);
        } else {
          ctx.fillStyle = d.color;
          ctx.fillRect(-d.dw / 2, -d.dh / 2, d.dw, d.dh);
        }
        ctx.restore();
      });
      arena.flashes.forEach((f) => {
        ctx.fillStyle = f.color;
        ctx.globalAlpha = f.life / 14;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Player avatar intentionally hidden in canvas for cleaner group/duel readability.
    }

    function updateBossAdvance(nowMs) {
      if (!arena.roundStartMs || arena.hasReachedPlayer || arena.bossDestroyed) {
        return;
      }

      const durationMs = Math.max(1000, arena.roundDurationSec * 1000);
      const elapsed = nowMs - arena.roundStartMs;
      const progress = Math.min(1, elapsed / durationMs);
      const startX = 730;
      const targetX = 145;
      arena.bossX = startX - (startX - targetX) * progress;

      if (progress >= 1) {
        arena.hasReachedPlayer = true;
        if (typeof arena.onBossReach === "function") {
          arena.onBossReach();
        }
      }
    }

    function updateFortress(nowMs) {
      if (arena.mode !== "fortress") {
        return;
      }

      if (arena.fortressCastleHp <= 0 && !arena.fortressDefeatActive && typeof arena.onCastleDestroyed === "function") {
        arena.onCastleDestroyed();
        return;
      }

      if (arena.fortressTimerStartMs > 0) {
        const elapsed = (nowMs - arena.fortressTimerStartMs) / 1000;
        if (elapsed >= arena.fortressTimerSec) {
          lobFortressShell();
          arena.fortressTimerStartMs = nowMs;
        }
      }

      resolveBlockPhysics();
      tickFortressShells();
      tickFortressShrapnel();
    }

    function updateDuel() {
      if (arena.mode !== "duel") {
        return;
      }
      tickDuelProjectiles();
    }

    function frame(t) {
      if (!arena.running) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nowMs = performance.now();
      updateBossAdvance(nowMs);
      updateFortress(nowMs);
      updateDuel();
      drawParallaxBackground();
      if (arena.mode === "fortress") {
        drawFortressMode(t);
      } else if (arena.mode === "duel") {
        drawDuelMode();
      } else if (arena.mode === "idle") {
        ctx.save();
        ctx.fillStyle = "rgba(15,23,42,0.55)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (arena.textFlash && Date.now() < arena.textFlash.expiresAt) {
          const tf = arena.textFlash;
          const elapsed = Date.now() - tf.startedAt;
          const alpha = Math.max(0, 1 - elapsed / tf.duration);
          ctx.globalAlpha = 0.15 + 0.85 * alpha;
          ctx.font = "bold 32px sans-serif";
          ctx.fillStyle = tf.color;
          ctx.fillText(tf.line1, canvas.width / 2, canvas.height / 2 - (tf.line2 ? 18 : 0));
          if (tf.line2) {
            ctx.font = "bold 20px sans-serif";
            ctx.fillStyle = "#fff";
            ctx.fillText(tf.line2, canvas.width / 2, canvas.height / 2 + 22);
          }
        } else {
          arena.textFlash = null;
          ctx.font = "bold 22px sans-serif";
          ctx.fillStyle = "#fff";
          ctx.fillText("Välj en vecka och börja svara, eller skapa gruppfight", canvas.width / 2, canvas.height / 2);
        }
        ctx.restore();
      } else {
        drawBoss(t);
      }
      tickProjectiles();
      drawEffects();
      arena.phase += 0.02;
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    return {
      stop() {
        arena.running = false;
      },
      setMode(mode) {
        arena.mode = mode;
      },
      showTextFlash(line1, color, line2, durationMs) {
        const now = Date.now();
        arena.textFlash = { line1, color, line2: line2 || null, duration: durationMs || 2000, startedAt: now, expiresAt: now + (durationMs || 2000) };
      },
      getBossById(id) {
        return bossRoster.find((b) => b.id === id) || bossRoster[0];
      },
      setPreviewBoss(bossId) {
        arena.mode = "boss";
        arena.activeBoss = this.getBossById(bossId);
        arena.roundStartMs = 0;
        arena.hasReachedPlayer = false;
        arena.bossX = 730;
        arena.bossDamageRatio = 0;
        arena.bossDeadPulse = 0;
        arena.bossDestroyed = false;
        arena.playerProjectiles = [];
        arena.bossProjectiles = [];
        arena.flashes = [];
        arena.particles = [];
        arena.debris = [];
      },
      startRound(bossId, durationSec, onBossReach) {
        arena.mode = "boss";
        arena.activeBoss = this.getBossById(bossId);
        arena.roundDurationSec = durationSec;
        arena.roundStartMs = performance.now();
        arena.onBossReach = onBossReach;
        arena.hasReachedPlayer = false;
        arena.bossX = 730;
        arena.bossDamageRatio = 0;
        arena.bossDestroyed = false;
      },
      restartAdvance() {
        arena.roundStartMs = performance.now();
        arena.hasReachedPlayer = false;
        arena.bossX = 730;
      },
      setBossDamageRatio(value) {
        arena.bossDamageRatio = Math.max(0, Math.min(1, value));
      },
      getBossName() {
        return arena.activeBoss.name;
      },
      setPlayerAvatar(imageUrl) {
        if (!imageUrl) {
          arena.playerAvatarImage = null;
          return;
        }
        const img = new Image();
        img.src = imageUrl;
        arena.playerAvatarImage = img;
      },
      playerShot(options = {}) {
        arena.playerProjectiles.push({
          x: 152,
          y: 198 + (options.yOffset || 0),
          vx: 9,
          vy: options.vy || 0,
          life: 90,
          color: options.color || "#22d3ee",
          onHit: typeof options.onHit === "function" ? options.onHit : null,
        });
      },
      bossShot() {
        arena.bossProjectiles.push({ x: arena.bossX - 20, y: arena.bossY, vx: -6.6, vy: 0, life: 90 });
      },
      playerHit() {
        arena.flashes.push({ x: 100, y: 196, radius: 22, life: 14, color: "#ef4444" });
      },
      bossHit() {
        const boss = arena.activeBoss;
        const image = arena.images[boss.id];
        const imageReady = !!(image && image.complete && image.naturalWidth > 0);
        const sourceW = imageReady ? image.naturalWidth : 100;
        const sourceH = imageReady ? image.naturalHeight : 100;
        const scale = 2.5;
        const sizeBoost = 4;

        // Reuse death-style explosion on every successful hit.
        arena.flashes.push({ x: arena.bossX, y: arena.bossY, radius: 52 * scale * sizeBoost, life: 22, color: "#fde68a" });
        arena.flashes.push({ x: arena.bossX, y: arena.bossY, radius: 78 * scale * sizeBoost, life: 18, color: "#fb7185" });

        for (let i = 0; i < 30; i += 1) {
          const sw = 8 + Math.random() * 16;
          const sh = 8 + Math.random() * 16;
          arena.debris.push({
            image: imageReady ? image : null,
            sx: Math.random() * Math.max(1, sourceW - sw),
            sy: Math.random() * Math.max(1, sourceH - sh),
            sw,
            sh,
            dw: sw * 0.62,
            dh: sh * 0.62,
            x: arena.bossX + (Math.random() - 0.5) * 30,
            y: arena.bossY + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 8.4,
            vy: -1 + (Math.random() - 0.5) * 7.2,
            vr: (Math.random() - 0.5) * 0.24,
            rot: Math.random() * Math.PI * 2,
            life: 30 + Math.random() * 30,
            color: boss.color,
          });
        }

        for (let i = 0; i < 1000; i += 1) {
          arena.particles.push({
            x: arena.bossX - 18 + Math.random() * 36,
            y: arena.bossY - 18 + Math.random() * 36,
            vx: (Math.random() - 0.5) * 14.5,
            vy: (Math.random() - 0.5) * 14.5,
            life: 36 + Math.random() * 36,
            color: i % 3 === 0 ? "#fca5a5" : "#fde68a",
          });
        }
      },
      bossDefeated() {
        arena.bossDeadPulse = 1;
        arena.bossDestroyed = true;
        arena.roundStartMs = 0;
        arena.hasReachedPlayer = true;
        const boss = arena.activeBoss;
        const image = arena.images[boss.id];
        const imageReady = !!(image && image.complete && image.naturalWidth > 0);
        const sourceW = imageReady ? image.naturalWidth : 100;
        const sourceH = imageReady ? image.naturalHeight : 100;
        const scale = 3;
        arena.flashes.push({ x: arena.bossX, y: arena.bossY, radius: 86 * scale, life: 24, color: "#fde68a" });
        arena.flashes.push({ x: arena.bossX, y: arena.bossY, radius: 132 * scale, life: 20, color: "#fb7185" });
        for (let i = 0; i < 170; i += 1) {
          const sw = 10 + Math.random() * 24;
          const sh = 10 + Math.random() * 24;
          arena.debris.push({
            image: imageReady ? image : null,
            sx: Math.random() * Math.max(1, sourceW - sw),
            sy: Math.random() * Math.max(1, sourceH - sh),
            sw,
            sh,
            dw: sw * 1.2,
            dh: sh * 1.2,
            x: arena.bossX + (Math.random() - 0.5) * 40,
            y: arena.bossY + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 18.5,
            vy: -3 + (Math.random() - 0.5) * 14.2,
            vr: (Math.random() - 0.5) * 0.42,
            rot: Math.random() * Math.PI * 2,
            life: 58 + Math.random() * 72,
            color: boss.color,
          });
        }
        for (let i = 0; i < 2500; i += 1) {
          arena.particles.push({
            x: arena.bossX - 30 + Math.random() * 60,
            y: arena.bossY - 30 + Math.random() * 60,
            vx: (Math.random() - 0.5) * 14.8,
            vy: (Math.random() - 0.5) * 14.8,
            life: 44 + Math.random() * 68,
            color: i % 2 === 0 ? "#fca5a5" : "#fef08a",
          });
        }
      },
      runFortressVictorySequence(onFinished) {
        if (arena.mode !== "fortress" || arena.fortressFinisherActive) {
          return;
        }

        arena.fortressFinisherActive = true;
        arena.fortressTimerStartMs = 0;
        arena.fortressShells = [];
        arena.fortressShrapnel = [];

        // Step 1: blow up all placed blocks.
        arena.fortressBlocks.forEach((block) => {
          const cx = block.x + block.w / 2;
          const cy = block.y + block.h / 2;
          arena.flashes.push({ x: cx, y: cy, radius: 64, life: 16, color: "#f59e0b" });
          addImpactParticles(cx, cy, 120, "#fbbf24", "#fca5a5");
        });
        arena.fortressBlocks = [];

        // Step 2: launch final grenade from the castle into the boss.
        window.setTimeout(() => {
          arena.playerProjectiles.push({
            x: 116,
            y: 205,
            vx: 9.4,
            vy: -0.65,
            life: 180,
            color: "#fde047",
            onHit: () => {
              this.bossDefeated();
              // Extra burst so the boss really explodes "as hell".
              for (let i = 0; i < 800; i += 1) {
                arena.particles.push({
                  x: arena.bossX - 24 + Math.random() * 48,
                  y: arena.bossY - 24 + Math.random() * 48,
                  vx: (Math.random() - 0.5) * 18.2,
                  vy: (Math.random() - 0.5) * 18.2,
                  life: 50 + Math.random() * 60,
                  color: i % 2 === 0 ? "#fde68a" : "#fca5a5",
                });
              }

              window.setTimeout(() => {
                arena.fortressFinisherActive = false;
                if (typeof onFinished === "function") {
                  onFinished();
                }
              }, 700);
            },
          });
        }, 700);
      },
      runFortressDefeatSequence(onFinished) {
        if (arena.mode !== "fortress" || arena.fortressDefeatActive) {
          return;
        }
        arena.fortressDefeatActive = true;
        arena.fortressFinisherActive = false;
        arena.fortressTimerStartMs = 0;
        arena.fortressShells = [];
        arena.fortressShrapnel = [];

        const castleX = 56;
        const castleY = 170;
        const castleW = 58;
        const castleH = 85;
        const cx = castleX + castleW / 2;
        const cy = castleY + castleH / 2;

        arena.fortressBlocks.forEach((block) => {
          const bx = block.x + block.w / 2;
          const by = block.y + block.h / 2;
          arena.flashes.push({ x: bx, y: by, radius: 70, life: 16, color: "#f59e0b" });
          addImpactParticles(bx, by, 140, "#fbbf24", "#fca5a5");
        });
        arena.fortressBlocks = [];

        arena.flashes.push({ x: cx, y: cy, radius: 180, life: 26, color: "#ef4444" });
        arena.flashes.push({ x: cx, y: cy, radius: 260, life: 22, color: "#fb7185" });
        arena.flashes.push({ x: cx, y: cy, radius: 320, life: 18, color: "#fde68a" });
        addImpactParticles(cx, cy, 1800, "#ef4444", "#fde68a");
        spawnFortressShrapnel(cx, cy, 130);

        window.setTimeout(() => {
          arena.fortressDefeatActive = false;
          arena.mode = "boss";
          arena.activeBoss = this.getBossById(appState.bossFight.selectedBossId);
          arena.fortressBlocks = [];
          arena.fortressShells = [];
          arena.fortressShrapnel = [];
          arena.fortressCastleHp = arena.fortressMaxCastleHp;
          arena.bossX = 730;
          if (typeof onFinished === "function") {
            onFinished();
          }
        }, 950);
      },
      reset() {
        arena.mode = "boss";
        arena.playerProjectiles = [];
        arena.bossProjectiles = [];
        arena.flashes = [];
        arena.particles = [];
        arena.debris = [];
        arena.bossDeadPulse = 0;
        arena.roundStartMs = 0;
        arena.hasReachedPlayer = false;
        arena.bossX = 730;
        arena.bossDamageRatio = 0;
        arena.bossDestroyed = false;
        arena.fortressBlocks = [];
        arena.fortressShells = [];
        arena.fortressShrapnel = [];
        arena.fortressTimerStartMs = 0;
        arena.fortressCastleHp = arena.fortressMaxCastleHp;
        arena.fortressFinisherActive = false;
        arena.fortressDefeatActive = false;
        arena.duel.projectiles = [];
        arena.duel.playerBlocks = [];
        arena.duel.enemyBlocks = [];
        arena.duel.groupActive = false;
        arena.duel.groupLeft = [];
        arena.duel.groupRight = [];
      },
      startFortressMode(timerSec, onCastleDestroyed) {
        arena.mode = "fortress";
        arena.fortressBlocks = [];
        arena.fortressShells = [];
        arena.fortressShrapnel = [];
        arena.fortressTimerSec = Math.max(2.5, timerSec);
        arena.fortressTimerStartMs = performance.now();
        arena.fortressCastleHp = arena.fortressMaxCastleHp;
        arena.onCastleDestroyed = onCastleDestroyed;
        arena.bossX = 730;
        arena.bossDestroyed = false;
        arena.fortressFinisherActive = false;
        arena.fortressDefeatActive = false;

        const starterBlocks = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < starterBlocks; i += 1) {
          const w = 44 + Math.random() * 30;
          const h = 26 + Math.random() * 20;
          const x = 210 + Math.random() * 210;
          arena.fortressBlocks.push({
            x,
            y: -h - 12 - i * (h + 6),
            w,
            h,
            vy: 0,
            holes: [],
          });
        }
      },
      triggerFortressBarrage(count = 1) {
        if (arena.mode !== "fortress" || arena.fortressFinisherActive) {
          return;
        }
        const shots = Math.max(1, Math.floor(count));
        for (let i = 0; i < shots; i += 1) {
          window.setTimeout(() => {
            if (arena.mode === "fortress" && !arena.fortressFinisherActive) {
              lobFortressShell();
            }
          }, i * 120);
        }
      },
      addFortressBlock() {
        if (arena.mode !== "fortress") {
          return;
        }

        const w = 44 + Math.random() * 30;
        const h = 26 + Math.random() * 20;
        const x = 210 + Math.random() * 210;
        const block = {
          x,
          y: -h - 8,
          w,
          h,
          vy: 0,
          holes: [],
        };
        arena.fortressBlocks.push(block);
      },
      getFortressRemainingSec() {
        if (arena.mode !== "fortress" || arena.fortressTimerStartMs <= 0) {
          return 0;
        }
        const elapsed = (performance.now() - arena.fortressTimerStartMs) / 1000;
        return Math.max(0, arena.fortressTimerSec - elapsed);
      },
      getFortressCastleHp() {
        return arena.fortressCastleHp;
      },
      getFortressBlockCount() {
        return arena.fortressBlocks.length;
      },
      getRemainingTimeSec() {
        if (!arena.roundStartMs || arena.hasReachedPlayer) {
          return 0;
        }
        const elapsed = (performance.now() - arena.roundStartMs) / 1000;
        return Math.max(0, arena.roundDurationSec - elapsed);
      },
      startDuelMode(options = {}) {
        arena.mode = "duel";
        arena.duel.playerLevel = Math.max(1, Number(options.playerLevel || 1));
        arena.duel.enemyLevel = Math.max(1, Number(options.enemyLevel || 1));
        arena.duel.playerMaxHp = Math.max(1, Number(options.playerMaxHp || 100));
        arena.duel.enemyMaxHp = Math.max(1, Number(options.enemyMaxHp || 100));
        arena.duel.playerHp = Math.max(0, Math.min(arena.duel.playerMaxHp, Number(options.playerHp ?? arena.duel.playerMaxHp)));
        arena.duel.enemyHp = Math.max(0, Math.min(arena.duel.enemyMaxHp, Number(options.enemyHp ?? arena.duel.enemyMaxHp)));
        arena.duel.playerBlocks = buildDuelCastleBlocks("left", arena.duel.playerLevel);
        arena.duel.enemyBlocks = buildDuelCastleBlocks("right", arena.duel.enemyLevel);
        arena.duel.projectiles = [];
        arena.flashes = [];
        arena.duel.prepEndsAtMs = 0;
      },
      setDuelHp(playerHp, enemyHp, playerMaxHp, enemyMaxHp) {
        arena.duel.playerMaxHp = Math.max(1, Number(playerMaxHp || arena.duel.playerMaxHp || 100));
        arena.duel.enemyMaxHp = Math.max(1, Number(enemyMaxHp || arena.duel.enemyMaxHp || 100));
        arena.duel.playerHp = Math.max(0, Math.min(arena.duel.playerMaxHp, Number(playerHp ?? arena.duel.playerHp)));
        arena.duel.enemyHp = Math.max(0, Math.min(arena.duel.enemyMaxHp, Number(enemyHp ?? arena.duel.enemyHp)));
      },
      duelShotToEnemy(damageRatio = 0.2) {
        if (arena.mode !== "duel") {
          return;
        }
        const sx = 108;
        const sy = 214;
        const tx = canvas.width - 108;
        const ty = 214;
        const time = 24;
        const g = 0.14;
        const vx = (tx - sx) / time;
        const vy = (ty - sy - 0.5 * g * time * time) / time;
        arena.duel.projectiles.push({
          x: sx, y: sy, vx, vy, g, tx, to: "enemy",
          life: 90,
          color: "#f97316",
          damageRatio: Math.max(0.05, damageRatio),
        });
      },
      duelShotToPlayer(damageRatio = 0.2) {
        if (arena.mode !== "duel") {
          return;
        }
        const sx = canvas.width - 108;
        const sy = 214;
        const tx = 108;
        const ty = 214;
        const time = 24;
        const g = 0.14;
        const vx = (tx - sx) / time;
        const vy = (ty - sy - 0.5 * g * time * time) / time;
        arena.duel.projectiles.push({
          x: sx, y: sy, vx, vy, g, tx, to: "player",
          life: 90,
          color: "#ef4444",
          damageRatio: Math.max(0.05, damageRatio),
        });
      },
      startGroupBattleMode(groupState = {}) {
        arena.mode = "duel";
        arena.duel.groupActive = true;
        arena.duel.projectiles = [];
        arena.duel.prepEndsAtMs = Number(groupState.prepEndsAtMs || 0);
        arena.duel.leftBroadcast = { text: "", color: "#22c55e", untilMs: 0 };
        arena.duel.rightBroadcast = { text: "", color: "#ef4444", untilMs: 0 };
        arena.duel.victoryFx = null;
        this.syncGroupBattleState(groupState);
      },
      syncGroupBattleState(groupState = {}) {
        const leftIn = Array.isArray(groupState.teamA) ? groupState.teamA : [];
        const rightIn = Array.isArray(groupState.teamB) ? groupState.teamB : [];
        const mapSlots = (existing, incoming) => incoming.map((p) => {
          const prev = existing.find((x) => x.id === p.id);
          const inferredLevel = Math.max(1, Math.min(20, Math.round((Math.max(100, Number(p.maxHp || 100)) - 100) / 10) + 1));
          return {
            id: p.id,
            name: p.name,
            hp: Number(p.hp || 0),
            maxHp: Math.max(1, Number(p.maxHp || 100)),
            castleLevel: Math.max(1, Math.min(20, Number(p.castleLevel || inferredLevel || 1))),
            avatarUrl: p.avatarUrl || "",
            avatarImage: prev?.avatarImage || null,
            blocks: prev?.blocks || createGroupCastleBlocks(),
          };
        });
        arena.duel.groupLeft = mapSlots(arena.duel.groupLeft, leftIn);
        arena.duel.groupRight = mapSlots(arena.duel.groupRight, rightIn);
        arena.duel.prepEndsAtMs = Number(groupState.prepEndsAtMs || arena.duel.prepEndsAtMs || 0);
      },
      setDuelPrepEndsAt(prepEndsAtMs = 0) {
        arena.duel.prepEndsAtMs = Number(prepEndsAtMs || 0);
      },
      setGroupBattleBroadcast(team, text, isGood) {
        const now = Date.now();
        const payload = {
          text: String(text || ""),
          color: isGood ? "#22c55e" : "#ef4444",
          untilMs: now + 3200,
        };
        if (team === "A") {
          arena.duel.leftBroadcast = payload;
        } else {
          arena.duel.rightBroadcast = payload;
        }
      },
      startGroupBattleVictoryFx(options = {}) {
        if (arena.mode !== "duel" || !arena.duel.groupActive) {
          return;
        }
        const winnerTeam = options.winnerTeam === "B" ? "B" : "A";
        const loserSide = winnerTeam === "A" ? "right" : "left";
        const losingSlots = loserSide === "left" ? arena.duel.groupLeft : arena.duel.groupRight;
        losingSlots.forEach((slot, idx) => {
          const x = (slot._cx || (loserSide === "left" ? 72 : canvas.width - 72));
          const y = (slot._cy || (90 + idx * 80));
          addImpactParticles(x, y, 260, "#fb7185", "#fde68a");
          arena.flashes.push({ x, y, radius: 56, life: 24, color: "#fb7185" });
          slot.blocks = [];
        });

        const iconsIn = Array.isArray(options.playerIcons) ? options.playerIcons : [];
        const copies = Math.max(1, Math.min(20, Number(options.iconCopiesPerPlayer || 15)));
        const palette = ["#60a5fa", "#a78bfa", "#34d399", "#f59e0b", "#f472b6", "#22d3ee"];
        const icons = [];
        iconsIn.forEach((p, idx) => {
          const letter = (String(p.name || "?").trim().charAt(0).toUpperCase() || "?");
          let image = null;
          if (p.avatarUrl) {
            image = new Image();
            image.crossOrigin = "anonymous";
            image.src = p.avatarUrl;
          }
          for (let i = 0; i < copies; i += 1) {
            icons.push({
              x: 80 + Math.random() * (canvas.width - 160),
              y: 38 + Math.random() * 58,
              vx: (Math.random() - 0.5) * 7.6,
              vy: -3.8 - Math.random() * 4.8,
              r: 9 + Math.random() * 6,
              color: palette[(idx + i) % palette.length],
              letter,
              image,
            });
          }
        });

        arena.duel.victoryFx = {
          active: true,
          winnerTeam,
          winnerName: String(options.winnerName || "Vinnare"),
          icons,
          untilMs: Date.now() + 3400,
        };
      },
      groupBattleShot(fromTeam, toSlotId, damageRatio = 0.2) {
        if (arena.mode !== "duel" || !arena.duel.groupActive) {
          return;
        }
        const shooters = fromTeam === "A" ? arena.duel.groupLeft : arena.duel.groupRight;
        const shooter = shooters.find((x) => x.hp > 0) || shooters[0];
        const target = slotById(toSlotId);
        if (!shooter || !target) {
          return;
        }
        const sx = (shooter._cx || (fromTeam === "A" ? 74 : canvas.width - 74));
        const sy = (shooter._cy || 104) - 8;
        const tx = target._cx || (fromTeam === "A" ? canvas.width - 74 : 74);
        const ty = (target._cy || 104) - 4;
        const time = 54;
        const g = 0.14;
        const vx = (tx - sx) / time;
        const vy = (ty - sy - 0.5 * g * time * time) / time;
        arena.duel.projectiles.push({
          x: sx, y: sy, vx, vy, g,
          life: 160,
          color: fromTeam === "A" ? "#f97316" : "#ef4444",
          toSlotId,
          damageRatio: Math.max(0.05, Math.min(0.95, damageRatio)),
        });
      },
    };
  }

  function stateKey() {
    const userPart = appState.auth.linkedProfileId || appState.selectedUserId || "guest";
    const weekPart = appState.selectedWeekId || "week";
    return `glos_trainer_state_v3_${userPart}_${weekPart}`;
  }

  function guestNameKey() {
    return "glos_trainer_guest_name_v1";
  }

  function playerAvatarKey() {
    const userPart = appState.auth.linkedProfileId || appState.selectedUserId || "guest";
    return `glos_trainer_player_avatar_${userPart}`;
  }

  function guestSessionKey() {
    return "glos_trainer_guest_session_v1";
  }

  function weekXpKey() {
    const actor = appState.auth.linkedProfileId || getGuestSessionId();
    return `glos_week_xp_v1_${actor}`;
  }

  function loadWeekXpMap() {
    try {
      const raw = localStorage.getItem(weekXpKey());
      if (!raw) {
        return {};
      }
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveWeekXpMap(map) {
    localStorage.setItem(weekXpKey(), JSON.stringify(map || {}));
  }

  function xpForNextWeekLevel(level) {
    return 20 + (level - 1) * 15;
  }

  function resolveWeekLevelAndProgress(weekId) {
    const map = loadWeekXpMap();
    const xp = Number(map[weekId] || 0);
    let level = 1;
    let rest = xp;
    while (level < 20) {
      const need = xpForNextWeekLevel(level);
      if (rest < need) {
        break;
      }
      rest -= need;
      level += 1;
    }
    const needNext = xpForNextWeekLevel(level);
    const progress = needNext > 0 ? Math.max(0, Math.min(1, rest / needNext)) : 0;
    return { level, xp, progress, rest, needNext };
  }

  function grantWeekXp(amount = 1) {
    if (!appState.selectedWeekId) {
      return;
    }
    const map = loadWeekXpMap();
    map[appState.selectedWeekId] = Number(map[appState.selectedWeekId] || 0) + amount;
    saveWeekXpMap(map);
  }

  function getGuestSessionId() {
    let value = localStorage.getItem(guestSessionKey());
    if (!value) {
      value = `guest-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(guestSessionKey(), value);
    }
    return value;
  }

  function challengeHeaders() {
    const headers = { "Content-Type": "application/json" };
    if (!appState.auth.isAuthenticated) {
      headers["X-Guest-Session"] = getGuestSessionId();
      headers["X-Guest-Name"] = (elements.guestNameInput.value || appState.selectedUserId || "GÄST").trim();
    }
    return headers;
  }

  function fortressButtonLabel(isActive) {
    const text = isActive ? "Avsluta Byggförsvar" : "Byggförsvar";
    return `<span class="cta-icon" aria-hidden="true">&#x1F6E1;</span> ${text}`;
  }

  function ensureDynamicControls() {
    if (!elements.questionLabel) {
      const label = document.querySelector(".card-panel .question-label");
      if (label) {
        label.id = "questionLabel";
        elements.questionLabel = label;
      }
    }

    if (!elements.teacherQuickLoginButton) {
      const controls = document.querySelector(".controls-panel");
      if (controls) {
        const link = document.createElement("a");
        link.id = "teacherQuickLoginButton";
        link.href = "/Auth/TeacherLogin";
        link.className = "btn teacher-login-cta";
        link.textContent = "Larar-login";
        if (elements.createGroupFightButton && elements.createGroupFightButton.parentElement === controls) {
          elements.createGroupFightButton.insertAdjacentElement("afterend", link);
        } else {
          controls.prepend(link);
        }
        elements.teacherQuickLoginButton = link;
      }
    }

    if (!elements.fortressModeButton) {
      const controls = document.querySelector(".controls-panel");
      if (controls) {
        const btn = document.createElement("button");
        btn.id = "fortressModeButton";
        btn.type = "button";
        btn.className = "primary-cta fortress-cta";
        btn.innerHTML = fortressButtonLabel(false);
        const bossBtn = elements.toggleModeButton;
        if (bossBtn && bossBtn.parentElement === controls) {
          bossBtn.insertAdjacentElement("afterend", btn);
        } else {
          controls.prepend(btn);
        }
        elements.fortressModeButton = btn;
      }
    }
  }

  function loadState() {
    state = { ...defaultState };
  }

  function saveState() {
    // State is no longer persisted to localStorage (reset on each page load)
  }

  function escapeHtml(str) {
    return String(str ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function normalize(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function appLanguageKey() {
    return "glos_app_language_v1";
  }

  function normalizeLanguage(value) {
    const normalized = normalize(value);
    if (!normalized) {
      return "english";
    }
    const aliases = {
      svenska: "swedish",
      engelska: "english",
      spanska: "spanish",
      tyska: "german",
      franska: "french",
    };
    return aliases[normalized] || normalized;
  }

  function languageDisplayName(value) {
    const normalized = normalizeLanguage(value);
    const names = {
      english: "Engelska",
      swedish: "Svenska",
      spanish: "Spanska",
      german: "Tyska",
      french: "Franska",
    };
    return names[normalized] || normalized;
  }

  function filteredWeeks() {
    const selectedLanguage = normalizeLanguage(appState.selectedLanguage);
    return (appState.weeks || []).filter((week) => normalizeLanguage(week.language) === selectedLanguage);
  }

  function settingsKey() {
    return "glos_trainer_settings_v1";
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(settingsKey());
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      appState.settings.soundEnabled = parsed.soundEnabled !== false;
    } catch {
      appState.settings.soundEnabled = true;
    }
  }

  function saveSettings() {
    localStorage.setItem(settingsKey(), JSON.stringify(appState.settings));
  }

  function loadSelectedLanguage() {
    const saved = normalizeLanguage(localStorage.getItem(appLanguageKey()) || "");
    appState.selectedLanguage = saved || "english";
  }

  function saveSelectedLanguage() {
    localStorage.setItem(appLanguageKey(), normalizeLanguage(appState.selectedLanguage));
  }

  function selectedWeekKey() {
    return "glos_selected_week_v1";
  }

  function loadSelectedWeek() {
    return localStorage.getItem(selectedWeekKey()) || "";
  }

  function saveSelectedWeek() {
    localStorage.setItem(selectedWeekKey(), appState.selectedWeekId || "");
  }

  function expectedAnswerForCurrentWord() {
    if (!state.currentWord) {
      return "";
    }
    return appState.flippedDirection ? String(state.currentWord.sv || "") : String(state.currentWord.en || "");
  }

  function questionTextForWord(word) {
    if (!word) {
      return "";
    }
    return appState.flippedDirection ? String(word.en || "") : String(word.sv || "");
  }

  function renderQuestionLabel() {
    if (!elements.questionLabel) {
      return;
    }
    if (appState.flippedDirection) {
      elements.questionLabel.textContent = `Översätt till svenska:`;
    } else {
      elements.questionLabel.textContent = `Översätt till ${languageDisplayName(appState.practiceAnswerLanguage)}:`;
    }
  }

  function renderFlipButton() {
    if (!elements.flipDirectionButton) {
      return;
    }
    const lang = languageDisplayName(appState.practiceAnswerLanguage);
    if (appState.flippedDirection) {
      elements.flipDirectionButton.textContent = `Klicka för att välja ordning: ${lang} \u2192 Svenska`;
    } else {
      elements.flipDirectionButton.textContent = `Klicka för att välja ordning: Svenska \u2192 ${lang}`;
    }
  }

  function renderSpecialChars() {
    if (!elements.specialCharsRow) return;
    const lang = normalizeLanguage(appState.practiceAnswerLanguage || appState.selectedLanguage || "english");
    const charSets = {
      spanish: ["\u00e1", "\u00e9", "\u00ed", "\u00f3", "\u00fa", "\u00fc", "\u00f1", "\u00bf", "\u00a1"],
      french: ["\u00e0", "\u00e2", "\u00e7", "\u00e8", "\u00e9", "\u00ea", "\u00eb", "\u00ee", "\u00ef", "\u00f4", "\u00f9", "\u00fb", "\u00fc", "\u0153"],
      german: ["\u00e4", "\u00f6", "\u00fc", "\u00df"],
    };
    const chars = charSets[lang];
    if (!chars) {
      elements.specialCharsRow.style.display = "none";
      return;
    }
    elements.specialCharsRow.style.display = "flex";
    elements.specialCharsRow.innerHTML = "";
    chars.forEach((ch) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = ch;
      btn.style.cssText = "min-width:32px;height:32px;padding:0 6px;font-size:1.05rem;font-weight:700;border:1px solid #b8d2e9;border-radius:8px;background:#f1f5f9;color:#1e293b;cursor:pointer;";
      btn.addEventListener("mousedown", (e) => { e.preventDefault(); });
      btn.addEventListener("click", () => {
        const inp = elements.answerInput;
        inp.focus();
        const start = inp.selectionStart ?? inp.value.length;
        const end = inp.selectionEnd ?? inp.value.length;
        const val = inp.value;
        inp.value = val.slice(0, start) + ch + val.slice(end);
        inp.selectionStart = inp.selectionEnd = start + ch.length;
      });
      elements.specialCharsRow.append(btn);
    });
  }

  function renderSoundToggle() {
    elements.soundToggleButton.textContent = appState.settings.soundEnabled ? "Ljud: På" : "Ljud: Av";
  }

  function getAudioContext() {
    if (audioCtx) {
      return audioCtx;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      return null;
    }
    audioCtx = new Ctx();
    return audioCtx;
  }

  function playBossHitSound() {
    if (!appState.settings.soundEnabled) {
      return;
    }
    const ctx = getAudioContext();
    if (!ctx) {
      return;
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  function playBossExplosionSound() {
    if (!appState.settings.soundEnabled) {
      return;
    }
    const ctx = getAudioContext();
    if (!ctx) {
      return;
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.45);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  function pushLog(text) {
    const item = document.createElement("li");
    item.textContent = text;
    elements.eventLog.prepend(item);
    while (elements.eventLog.childNodes.length > 12) {
      elements.eventLog.removeChild(elements.eventLog.lastChild);
    }
  }

  function showToast(message, tone = "info") {
    if (!message) {
      return;
    }
    let host = document.getElementById("toastHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "toastHost";
      host.className = "toast-host";
      document.body.append(host);
    }
    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${tone}`;
    toast.setAttribute("role", "status");
    toast.textContent = message;
    toast.dataset.toastId = String(++toastSeed);
    host.append(toast);
    window.setTimeout(() => {
      toast.classList.add("toast-leave");
      window.setTimeout(() => toast.remove(), 320);
    }, 2200);
  }

  function pulseChallengeBox() {
    if (!elements.challengeInboxList) {
      return;
    }
    const panel = elements.challengeInboxList.closest(".card-panel");
    if (!panel) {
      return;
    }
    panel.classList.remove("challenge-pulse");
    void panel.offsetWidth;
    panel.classList.add("challenge-pulse");
  }

  function xpToNextLevel(level) {
    return 100 + (level - 1) * 40;
  }

  function currentWeek() {
    return appState.weeks.find((w) => w.id === appState.selectedWeekId) || filteredWeeks()[0] || appState.weeks[0] || null;
  }

  function syncAnswerLanguageFromCurrentWeek() {
    const week = currentWeek();
    appState.practiceAnswerLanguage = normalizeLanguage(week?.language || appState.selectedLanguage || "english");
    renderQuestionLabel();
    renderFlipButton();
    renderSpecialChars();
  }

  function currentWords() {
    const week = currentWeek();
    const baseWords = week && Array.isArray(week.words) ? week.words : [];
    const tempWords = appState.tempWordsByWeek[appState.selectedWeekId] || [];
    return [...baseWords, ...tempWords];
  }

  function getBossDurationSec(roundIndex) {
    const selectedBoss = bossRoster.find((b) => b.id === appState.bossFight.selectedBossId) || bossRoster[0];
    const baseDurations = [20, 16, 12, 10, 8];
    const base = baseDurations[Math.min(roundIndex, baseDurations.length - 1)];
    const difficultyMultiplier = 1 + (selectedBoss.difficulty - 1) * 0.15;
    return Math.max(4, Math.round(base / difficultyMultiplier));
  }

  function shuffleWords(words) {
    const copy = [...words];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startBossRound() {
    const words = shuffleWords(currentWords());
    if (!words.length) {
      state.bossMode = false;
      elements.feedbackText.className = "feedback bad";
      elements.feedbackText.textContent = "Ingen glosa finns i vald vecka.";
      return false;
    }

    appState.bossFight.roundWords = words;
    appState.bossFight.wordIndex = 0;
    appState.bossFight.durationSec = getBossDurationSec(appState.bossFight.roundIndex);
    appState.bossFight.startMs = performance.now();

    state.bossMaxHp = words.length;
    state.bossHp = words.length;
    state.playerHp = state.playerMaxHp;

    if (bossFightEngine) {
      bossFightEngine.startRound(appState.bossFight.selectedBossId, appState.bossFight.durationSec, () => {
        if (!state.bossMode) {
          return;
        }
        state.playerHp = 0;
        state.streak = 0;
        state.bossMode = false;
        if (bossFightEngine) {
          bossFightEngine.bossShot();
          bossFightEngine.playerHit();
        }
        elements.feedbackText.className = "feedback bad";
        elements.feedbackText.textContent = "Bossen hann fram till dig. Bossfighten avbryts.";
        pushLog("Bossen kraschade in i spelaren.");
        renderStats();
      });
    }

    setQuestion(appState.bossFight.roundWords[0]);
    return true;
  }

  function startFortressMode() {
    const words = shuffleWords(currentWords());
    if (!words.length) {
      state.fortressMode = false;
      elements.feedbackText.className = "feedback bad";
      elements.feedbackText.textContent = "Ingen glosa finns i vald vecka.";
      return false;
    }

    appState.bossFight.roundWords = words;
    appState.bossFight.wordIndex = 0;
    appState.fortress.timerSec = Math.max(1.75, getBossDurationSec(appState.fortress.roundIndex) * 0.325);

    state.playerMaxHp = 100;
    state.playerHp = 100;
    state.bossMaxHp = 100;
    state.bossHp = 100;

    if (bossFightEngine) {
      bossFightEngine.startFortressMode(appState.fortress.timerSec, () => {
        if (!state.fortressMode) {
          return;
        }
        state.playerHp = 0;
        state.fortressMode = false;
        state.bossMode = false;
        state.streak = 0;
        elements.feedbackText.className = "feedback bad";
        elements.feedbackText.textContent = "Borgen exploderar! Försvarslaget är utslaget.";
        setQuestion(null, { focus: false, emptyText: "Borgen är förstörd. Nollställer..." });
        pushLog("Borgen gick till 0 HP. Total explosion och reset startad.");
        renderStats();

        bossFightEngine.runFortressDefeatSequence(() => {
          appState.bossFight.roundWords = [];
          appState.bossFight.wordIndex = 0;
          state.playerHp = state.playerMaxHp;
          state.bossHp = state.bossMaxHp;
          elements.feedbackText.className = "feedback bad";
          elements.feedbackText.textContent = "Byggförsvar avslutat efter 0 HP. Allt är nollställt.";
          setQuestion(pickWord(), { focus: false });
          renderStats();
        });
      });
    }

    setQuestion(appState.bossFight.roundWords[0]);
    return true;
  }

  function updateBars() {
    const combatActive = state.bossMode || state.fortressMode || appState.duel.active || appState.groupBattle.active;
    if (elements.combatPanel) {
      elements.combatPanel.style.display = combatActive ? "" : "none";
    }

    let wordsProgressPercent = null;
    let wordsProgressLabel = "";
    const wordsLeft = (state.bossMode || state.fortressMode)
      ? Math.max(0, appState.bossFight.roundWords.length - appState.bossFight.wordIndex)
      : 0;
    elements.bossWordsLeftText.textContent = (state.bossMode || state.fortressMode) ? `Glosor kvar: ${wordsLeft}` : "Glosor kvar: -";
    if (appState.groupBattle.active) {
      const me = getCurrentGroupBattlePlayer();
      const myTeam = me?.team === "B" ? "B" : getLocalGroupTeam();
      const myPlayers = myTeam === "A" ? appState.groupBattle.teamA : appState.groupBattle.teamB;
      const enemyPlayers = myTeam === "A" ? appState.groupBattle.teamB : appState.groupBattle.teamA;

      state.playerMaxHp = myTeam === "A" ? appState.groupBattle.maxHpA : appState.groupBattle.maxHpB;
      state.bossMaxHp = myTeam === "A" ? appState.groupBattle.maxHpB : appState.groupBattle.maxHpA;
      state.playerHp = Math.round(myTeam === "A" ? appState.groupBattle.hpA : appState.groupBattle.hpB);
      state.bossHp = Math.round(myTeam === "A" ? appState.groupBattle.hpB : appState.groupBattle.hpA);
      if (bossFightEngine) {
        bossFightEngine.syncGroupBattleState(getProjectedGroupState());
      }
      elements.bossTimerText.textContent = `Gruppfight aktiv`;
      const ownCorrect = myPlayers.reduce((s, p) => s + Math.max(0, Number(p.correct || 0)), 0);
      const ownTotal = Math.max(1, myPlayers.length * Math.max(1, appState.groupBattle.totalWords || 1));
      elements.bossWordsLeftText.textContent = `Lagets glosor: ${ownCorrect}/${ownTotal}`;
      elements.bossName.textContent = `Motståndarlag (${enemyPlayers.length})`;
    } else if (appState.duel.active) {
      elements.bossTimerText.textContent = `Duel aktiv - x${appState.duel.myMultiplier}`;
      elements.bossWordsLeftText.textContent = `Glosor kvar: ${Math.max(0, appState.duel.totalWords - appState.duel.myCorrect)}`;
      elements.bossName.textContent = elements.bossName.textContent || "Motståndare";
    } else if (bossFightEngine && state.fortressMode) {
      state.playerHp = Math.max(0, bossFightEngine.getFortressCastleHp());
      const remaining = bossFightEngine.getFortressRemainingSec();
      const blocks = bossFightEngine.getFortressBlockCount();
      elements.bossTimerText.textContent = `Tid till granat: ${remaining.toFixed(1)}s | Block: ${blocks}`;
      elements.playerHpText.textContent = `${Math.round(state.playerHp)} / ${state.playerMaxHp} HP (Borg)`;
      elements.bossName.textContent = "Boss (Bombardemang)";
    } else if (bossFightEngine && state.bossMode) {
      const remaining = bossFightEngine.getRemainingTimeSec();
      elements.bossTimerText.textContent = `Tid till krasch: ${remaining.toFixed(1)}s`;
      elements.bossName.textContent = bossFightEngine.getBossName();
      const ratio = state.bossMaxHp > 0 ? 1 - (state.bossHp / state.bossMaxHp) : 0;
      bossFightEngine.setBossDamageRatio(ratio);
    } else {
      elements.bossTimerText.textContent = "Tid till krasch: -";
      const selected = bossRoster.find((b) => b.id === appState.bossFight.selectedBossId);
      elements.bossName.textContent = selected ? selected.name : "Boss";
    }

    if (elements.bossAvatarCard) {
      const showBossAvatar = state.bossMode || state.fortressMode || (!appState.duel.active && !appState.groupBattle.active);
      const activeBoss = bossRoster.find((b) => b.id === appState.bossFight.selectedBossId);
      if (showBossAvatar && activeBoss && activeBoss.imageUrl) {
        elements.bossAvatarCard.src = activeBoss.imageUrl;
        elements.bossAvatarCard.style.display = "block";
      } else {
        elements.bossAvatarCard.style.display = "none";
      }
    }

    const playerPercent = state.playerMaxHp > 0 ? (state.playerHp / state.playerMaxHp) * 100 : 0;
    const bossPercent = state.bossMaxHp > 0 ? (state.bossHp / state.bossMaxHp) * 100 : 0;
    elements.playerHpBar.style.width = `${Math.max(0, Math.min(100, playerPercent))}%`;
    elements.bossHpBar.style.width = `${Math.max(0, Math.min(100, bossPercent))}%`;
    elements.playerHpText.textContent = `${Math.round(state.playerHp)} / ${Math.round(state.playerMaxHp)} HP`;
    elements.bossHpText.textContent = `${Math.round(state.bossHp)} / ${Math.round(state.bossMaxHp)} HP`;

    if (elements.wordsProgressWrap && elements.wordsProgressFill && elements.wordsProgressText) {
      if (wordsProgressPercent === null) {
        elements.wordsProgressWrap.style.display = "none";
        elements.wordsProgressFill.style.width = "0%";
        elements.wordsProgressText.textContent = "";
      } else {
        elements.wordsProgressWrap.style.display = "";
        elements.wordsProgressFill.style.width = `${wordsProgressPercent}%`;
        elements.wordsProgressText.textContent = wordsProgressLabel;
      }
    }
  }

  function updateDuelPrepOverlay() {
    if (!elements.duelPrepOverlay) {
      return;
    }
    const remainingMs = appState.duel.prepEndsAtMs - Date.now();
    if (!appState.duel.active || remainingMs <= 0) {
      elements.duelPrepOverlay.style.display = "none";
      if (appState.duel.prepEndsAtMs > 0) {
        appState.duel.prepEndsAtMs = 0;
        if (!state.currentWord) {
          setQuestion(pickWord());
        }
      }
      return;
    }
    const seconds = Math.ceil(remainingMs / 1000);
    elements.duelPrepOverlay.style.display = "flex";
    elements.duelPrepOverlay.textContent = `GOR DIG REDO ${seconds}`;
    setQuestion(null, { focus: true, emptyText: `Gor dig redo... ${seconds}` });
    elements.answerInput.focus();
  }

  function updateGroupBattlePrep() {
    if (!appState.groupBattle.active) {
      return;
    }
    const remainingMs = appState.groupBattle.prepEndsAtMs - Date.now();
    if (remainingMs <= 0) {
      if (appState.groupBattle.prepEndsAtMs > 0) {
        appState.groupBattle.prepEndsAtMs = 0;
        appState.groupBattle.lastPrepBroadcastSecond = -1;
        if (bossFightEngine) {
          bossFightEngine.setGroupBattleBroadcast("A", "MATCHEN STARTAR NU!", true);
          bossFightEngine.setGroupBattleBroadcast("B", "MATCHEN STARTAR NU!", true);
        }
        if (!state.currentWord) {
          const first = appState.bossFight.roundWords[appState.bossFight.wordIndex] || appState.bossFight.roundWords[0] || null;
          setQuestion(first);
          elements.answerInput.focus();
        }
      }
      return;
    }
    const seconds = Math.ceil(remainingMs / 1000);
    if (seconds !== appState.groupBattle.lastPrepBroadcastSecond) {
      appState.groupBattle.lastPrepBroadcastSecond = seconds;
      if (bossFightEngine) {
        const text = `MATCHEN STARTAR OM ${seconds}`;
        bossFightEngine.setGroupBattleBroadcast("A", text, true);
        bossFightEngine.setGroupBattleBroadcast("B", text, true);
      }
    }
    setQuestion(null, { focus: false, emptyText: `Gor dig redo... ${seconds}` });
  }

  function renderStats() {
    elements.levelValue.textContent = String(state.level);
    elements.xpValue.textContent = `${state.xp}/${xpToNextLevel(state.level)}`;
    elements.coinsValue.textContent = String(state.coins);
    elements.streakValue.textContent = String(state.streak);
    elements.toggleModeButton.textContent = state.bossMode ? "Avsluta Bossfight" : "☠ Starta Bossfight";
    if (elements.fortressModeButton) {
      elements.fortressModeButton.innerHTML = fortressButtonLabel(state.fortressMode);
    }
    updateBars();
    updateDuelPrepOverlay();
    updateGroupBattlePrep();
    saveState();
  }

  function renderCastleTree() {
    if (!elements.castleTree) {
      return;
    }
    const weekId = appState.selectedWeekId || "";
    const levelInfo = resolveWeekLevelAndProgress(weekId);
    elements.castleTree.innerHTML = "";
    castleRoster.forEach((castle) => {
      const card = document.createElement("div");
      card.className = "castle-card";
      const unlocked = castle.level <= levelInfo.level;
      const hp = 100 + (castle.level - 1) * 10;
      card.innerHTML = `
        <div class="castle-icon">${castle.icon}</div>
        <div><strong>${castle.name}</strong></div>
        <div>Lvl ${castle.level} • HP ${hp}</div>
        <div style="opacity:${unlocked ? "1" : "0.65"}">${unlocked ? "Upplåst" : "Låst"}</div>
      `;
      if (castle.level === levelInfo.level) {
        const xpBar = document.createElement("div");
        xpBar.className = "castle-xp";
        const fill = document.createElement("span");
        fill.style.width = `${Math.round(levelInfo.progress * 100)}%`;
        xpBar.append(fill);
        card.append(xpBar);
      }
      elements.castleTree.append(card);
    });
  }

  function applyAuthUi() {
    if (appState.auth.isAuthenticated) {
      elements.authStatusText.textContent = `Inloggad som ${appState.auth.displayName || "okand"}. Du kan spara glosor och resultat.`;
      elements.loginLink.style.display = "none";
      elements.registerLink.style.display = "none";
      elements.logoutLink.style.display = "inline-block";
      elements.aiSaveButton.disabled = false;
      elements.aiCreateWeekButton.disabled = false;

      if (appState.auth.linkedProfileId) {
        appState.selectedUserId = appState.auth.linkedProfileId;
        elements.userSelect.disabled = true;
      }

      elements.userSelectLabel.style.display = "";
      elements.userSelect.style.display = "";
      elements.guestNameLabel.style.display = "none";
      elements.guestNameInput.style.display = "none";
    } else {
      elements.authStatusText.textContent = "Gastlage aktivt. Registrera eller logga in for att kunna spara.";
      elements.loginLink.style.display = "inline-block";
      elements.registerLink.style.display = "inline-block";
      elements.logoutLink.style.display = "none";
      elements.adminLink.style.display = "none";
      elements.aiSaveButton.disabled = true;
      elements.aiCreateWeekButton.disabled = true;
      elements.userSelect.disabled = false;

      elements.userSelectLabel.style.display = "none";
      elements.userSelect.style.display = "none";
      elements.guestNameLabel.style.display = "";
      elements.guestNameInput.style.display = "";

      const guestName = (elements.guestNameInput.value || "").trim();
      appState.selectedUserId = guestName || "guest";
    }

    if (appState.auth.isAdmin) {
      elements.adminLink.style.display = "inline-block";
    }
  }

  function setQuestion(word, options = {}) {
    const shouldFocus = options.focus !== false;
    const emptyText = options.emptyText || "Inga glosor hittades i vald vecka";
    state.currentWord = word;
    elements.questionWord.textContent = word ? questionTextForWord(word) : emptyText;
    elements.questionWord.style.color = "";
    renderQuestionLabel();
    elements.answerInput.value = "";
    elements.hintText.textContent = "";
    if (word && shouldFocus) {
      elements.answerInput.focus();
    }
    saveState();
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initTrainQueue() {
    const words = currentWords();
    state.trainQueue = shuffleArray([...words]);
    state.trainMissed = [];
    state.trainTotal = words.length;
    state.trainDone = 0;
    renderTrainProgress();
  }

  function pickWord() {
    if (state.bossMode || state.fortressMode || appState.duel.active || appState.groupBattle.active) {
      const words = currentWords();
      if (!words.length) return null;
      return words[Math.floor(Math.random() * words.length)];
    }
    if (state.trainQueue.length === 0 && state.trainMissed.length === 0) {
      initTrainQueue();
    }
    if (state.trainQueue.length > 0) {
      return state.trainQueue[0];
    }
    if (state.trainMissed.length > 0) {
      state.trainQueue = shuffleArray([...state.trainMissed]);
      state.trainMissed = [];
      return state.trainQueue[0];
    }
    return null;
  }

  function onTrainCorrect() {
    if (state.trainQueue.length > 0) {
      state.trainQueue.shift();
    }
    state.trainDone += 1;
    renderTrainProgress();
  }

  function onTrainWrong(word) {
    if (state.trainQueue.length > 0) {
      state.trainQueue.shift();
    }
    if (word) {
      state.trainMissed.push(word);
    }
    renderTrainProgress();
  }

  function renderTrainProgress() {
    const isTraining = !state.bossMode && !state.fortressMode && !appState.duel.active && !appState.groupBattle.active;
    if (!isTraining || state.trainTotal === 0) {
      elements.trainProgressWrap.style.display = "none";
      return;
    }
    elements.trainProgressWrap.style.display = "";
    const pct = Math.min(100, Math.round((state.trainDone / state.trainTotal) * 100));
    elements.trainProgressBar.style.width = pct + "%";
    elements.trainProgressText.textContent = `${state.trainDone} / ${state.trainTotal} (${pct}%)`;
  }

  function grantXp(amount) {
    state.xp += amount;
    let threshold = xpToNextLevel(state.level);
    while (state.xp >= threshold) {
      state.xp -= threshold;
      state.level += 1;
      state.coins += 20;
      pushLog(`Level up! Nu är du level ${state.level}.`);
      threshold = xpToNextLevel(state.level);
    }
  }

  function addCorrectKey(word) {
    const key = `${normalize(word.sv)}|${normalize(word.en)}`;
    if (!state.correctKeys.includes(key)) {
      state.correctKeys.push(key);
    }
    saveProgressQuiet();
  }

  let _saveProgressTimer = null;
  function saveProgressQuiet() {
    if (_saveProgressTimer) clearTimeout(_saveProgressTimer);
    _saveProgressTimer = setTimeout(async () => {
      _saveProgressTimer = null;
      try {
        const hdrs = { "Content-Type": "application/json" };
        if (!appState.auth.isAuthenticated) {
          hdrs["X-Guest-Session"] = getGuestSessionId();
          hdrs["X-Guest-Name"] = (elements.guestNameInput.value || appState.selectedUserId || "GÄST").trim();
        }
        const resp = await fetch("/api/vocab/progress", {
          method: "POST",
          headers: hdrs,
          body: JSON.stringify({
            weekId: appState.selectedWeekId,
            score: state.level * 100 + state.xp + state.coins,
            timeSeconds: 0,
            correctKeys: state.correctKeys,
            quietSave: true,
          }),
        });
        if (resp.ok) {
          loadWeekStats();
        }
      } catch (_) {}
    }, 500);
  }

  function onCorrect() {
    if (appState.duel.active && appState.duel.prepEndsAtMs > Date.now()) {
      return;
    }
    if (appState.groupBattle.active && (appState.groupBattle.prepEndsAtMs > Date.now() || appState.groupBattle.finishing)) {
      return;
    }
    if (appState.groupBattle.active) {
      const me = getCurrentGroupBattlePlayer();
      if (!me) {
        elements.feedbackText.className = "feedback bad";
        elements.feedbackText.textContent = "Kunde inte identifiera din spelare i gruppfight. Prova uppdatera sidan.";
        return;
      }
      applyGroupBattleAnswer(me, true);
      if (appState.groupBattle.finishing) {
        renderStats();
        return;
      }
      const next = pickGroupBattleWordForPlayer(me);
      setQuestion(next);
      renderStats();
      return;
    }
    state.streak += 1;
    const xpGain = state.bossMode || state.fortressMode ? 26 : 12;
    const coinGain = state.bossMode || state.fortressMode ? 8 : 4;
    grantXp(xpGain);
    grantWeekXp(1);
    state.coins += coinGain;
    addCorrectKey(state.currentWord);
    let bossKillPending = false;

    if (appState.duel.active && appState.duel.matchId) {
      const lowestMaxHp = Math.max(1, Math.min(state.playerMaxHp || 100, state.bossMaxHp || 100));
      const perWordBase = lowestMaxHp / Math.max(1, appState.duel.totalWords || 1);
      const estimatedDamage = perWordBase * Math.max(1, appState.duel.myMultiplier || 1);
      const estimatedRatio = Math.max(0.06, Math.min(0.95, estimatedDamage / Math.max(1, state.bossMaxHp || 100)));
      if (bossFightEngine) {
        bossFightEngine.duelShotToEnemy(estimatedRatio);
        appState.duel.pendingEnemyVisualShots += 1;
      }
      (async () => {
        const response = await fetch(`/api/duel/${encodeURIComponent(appState.duel.matchId)}/action`, {
          method: "POST",
          headers: challengeHeaders(),
          body: JSON.stringify({ action: "correct" }),
        });
        if (response.ok) {
          await refreshDuelState();
        } else {
          appState.duel.pendingEnemyVisualShots = Math.max(0, appState.duel.pendingEnemyVisualShots - 1);
        }
      })();
      const words = currentWords();
      if (words.length > 0) {
        setQuestion(words[Math.floor(Math.random() * words.length)]);
      }
      elements.feedbackText.className = "feedback good";
      elements.feedbackText.textContent = `Traff! +${xpGain} XP, +${coinGain} coins.`;
      renderStats();
      return;
    }

    if (state.fortressMode) {
      if (bossFightEngine) {
        bossFightEngine.addFortressBlock();
      }
      appState.bossFight.wordIndex += 1;
      const nextFortressWord = appState.bossFight.roundWords[appState.bossFight.wordIndex] || null;
      if (!nextFortressWord) {
        elements.feedbackText.className = "feedback good";
        elements.feedbackText.textContent = `Rätt! +${xpGain} XP, +${coinGain} coins. Sprängde block och laddar slutgranat...`;
        pushLog("Alla glosor klara. Blocken sprängdes och slutgranat avfyras.");
        setQuestion(null, { focus: false, emptyText: "Alla glosor avklarade. Slutsekvens startar..." });
        renderStats();
        if (bossFightEngine) {
          bossFightEngine.runFortressVictorySequence(() => {
            state.fortressMode = false;
            elements.feedbackText.className = "feedback good";
            elements.feedbackText.textContent = "Fulltraff! Bossen exploderade i tusen bitar.";
            pushLog("Byggforsvar vunnet.");
            renderStats();
          });
        }
        return;
      }
    } else if (state.bossMode) {
      state.bossHp = Math.max(0, state.bossHp - 1);
      appState.bossFight.wordIndex += 1;
      const lethalHit = state.bossHp <= 0;
      bossKillPending = lethalHit;
      if (bossFightEngine) {
        bossFightEngine.playerShot({
          onHit: () => {
            if (lethalHit) {
              bossFightEngine.bossDefeated();
              playBossExplosionSound();
              state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 15);
              state.coins += 30;
              pushLog("Boss sprängdes av sista glosan!");
              state.bossMode = false;
              elements.feedbackText.className = "feedback good";
              elements.feedbackText.textContent = "Bossen är totalförstörd. Du vann fighten!";
              setQuestion(null, { focus: false, emptyText: "Boss besegrad! Välj läge för ny runda." });
              renderStats();
              return;
            }

            bossFightEngine.bossHit();
            playBossHitSound();
            renderStats();
          },
        });
      }

      if (state.doubleHitReady && bossFightEngine && !lethalHit) {
        bossFightEngine.playerShot({
          yOffset: -10,
          color: "#38bdf8",
          onHit: () => {
            bossFightEngine.bossHit();
            playBossHitSound();
            renderStats();
          },
        });
        state.doubleHitReady = false;
      }

      if (state.bossHp > 0 && bossFightEngine) {
        bossFightEngine.restartAdvance();
      }
    }

    elements.feedbackText.className = "feedback good";
    elements.feedbackText.textContent = `Rätt! +${xpGain} XP, +${coinGain} coins.`;

    renderStats();
    renderCastleTree();
    if (state.fortressMode) {
      const next = appState.bossFight.roundWords[appState.bossFight.wordIndex] || null;
      setQuestion(next);
    } else if (state.bossMode) {
      if (!bossKillPending) {
        const next = appState.bossFight.roundWords[appState.bossFight.wordIndex] || null;
        setQuestion(next);
      }
    } else {
      onTrainCorrect();
      if (bossFightEngine) {
        bossFightEngine.showTextFlash("Rätt!", "#22c55e", `+${xpGain} XP, +${coinGain} coins`, 1500);
      }
      const next = pickWord();
      if (next) {
        setQuestion(next);
      } else {
        setQuestion(null, { focus: false, emptyText: "Alla glosor klarade! Bra jobbat!" });
        if (bossFightEngine) {
          bossFightEngine.showTextFlash("Klart!", "#22c55e", "Alla glosor klarade!", 3000);
        }
      }
    }
  }

  function onWrong() {
    if (appState.duel.active && appState.duel.prepEndsAtMs > Date.now()) {
      return;
    }
    if (appState.groupBattle.active && (appState.groupBattle.prepEndsAtMs > Date.now() || appState.groupBattle.finishing)) {
      return;
    }
    if (appState.groupBattle.active) {
      const me = getCurrentGroupBattlePlayer();
      if (!me) {
        elements.feedbackText.className = "feedback bad";
        elements.feedbackText.textContent = "Kunde inte identifiera din spelare i gruppfight. Prova uppdatera sidan.";
        return;
      }
      applyGroupBattleAnswer(me, false);
      if (appState.groupBattle.finishing) {
        renderStats();
        return;
      }
      const next = pickGroupBattleWordForPlayer(me);
      setQuestion(next);
      renderStats();
      return;
    }
    state.streak = 0;
    const dmg = 12;
    if (state.bossMode) {
      state.playerHp = Math.max(0, state.playerHp - dmg);
      if (bossFightEngine) {
        bossFightEngine.bossShot();
        bossFightEngine.playerHit();
      }
    }

    elements.feedbackText.className = "feedback bad";
    elements.feedbackText.textContent = `Fel. Rätt svar: ${expectedAnswerForCurrentWord()}`;
    elements.questionWord.style.color = "#dc2626";
    if (state.bossMode) {
      pushLog(`Miss. Boss träffade dig för ${dmg} HP.`);
    } else if (state.fortressMode) {
      if (bossFightEngine) {
        bossFightEngine.triggerFortressBarrage(1);
      }
      pushLog("Miss i byggforsvar. Extra granat avfyrad mot borgen.");
    } else if (appState.duel.active && appState.duel.matchId) {
      (async () => {
        await fetch(`/api/duel/${encodeURIComponent(appState.duel.matchId)}/action`, {
          method: "POST",
          headers: challengeHeaders(),
          body: JSON.stringify({ action: "miss" }),
        });
        await refreshDuelState();
      })();
      pushLog("Miss i duel. Nästa skott blir starkare.");
    } else if (bossFightEngine) {
      bossFightEngine.showTextFlash("Fel!", "#ef4444", `Rätt svar: ${expectedAnswerForCurrentWord()}`, 2500);
    }

    if (state.bossMode && state.playerHp <= 0) {
      state.playerHp = state.playerMaxHp;
      state.bossHp = state.bossMaxHp;
      state.bossMode = false;
      pushLog("Du forlorade bossfighten. Trana upp dig och forsok igen.");
    }

    renderStats();
    if (state.fortressMode) {
      appState.bossFight.wordIndex += 1;
      const next = appState.bossFight.roundWords[appState.bossFight.wordIndex] || null;
      if (!next) {
        elements.feedbackText.className = "feedback good";
        elements.feedbackText.textContent = "Alla glosor är gjorda. Blocken sprängdes och slutgranat avfyras!";
        pushLog("Ordlistan är slut. Slutsekvens mot bossen startar.");
        setQuestion(null, { focus: false, emptyText: "Alla glosor avklarade. Slutsekvens startar..." });
        if (bossFightEngine) {
          bossFightEngine.runFortressVictorySequence(() => {
            state.fortressMode = false;
            elements.feedbackText.className = "feedback good";
            elements.feedbackText.textContent = "Fulltraff! Bossen exploderade i tusen bitar.";
            pushLog("Byggforsvar vunnet.");
            renderStats();
          });
        }
      } else {
        setQuestion(next);
      }
    } else if (!state.bossMode && !appState.duel.active) {
      onTrainWrong(state.currentWord);
      setQuestion(pickWord());
    }
  }

  function spendCoins(cost) {
    if (state.coins < cost) {
      elements.feedbackText.className = "feedback bad";
      elements.feedbackText.textContent = "Inte tillrackligt med coins.";
      return false;
    }
    state.coins -= cost;
    return true;
  }

  function parseWordLines(text) {
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const split = line.split(/\s*[-:=]\s*/);
        if (split.length < 2) {
          return null;
        }
        return { sv: split[0].trim(), en: split.slice(1).join(" - ").trim() };
      })
      .filter((x) => x && x.sv && x.en);
  }

  async function loadAuthStatus() {
    const response = await fetch("/api/auth/status");
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    appState.auth = {
      isAuthenticated: !!data.isAuthenticated,
      isAdmin: !!data.isAdmin,
      displayName: data.displayName || null,
      linkedProfileId: data.linkedProfileId || null,
      loginConfigured: !!data.loginConfigured,
    };
  }

  async function loadData() {
    const response = await fetch("/api/vocab/data");
    if (!response.ok) {
      throw new Error("Kunde inte läsa databasdata");
    }

    const data = await response.json();
    appState.users = Array.isArray(data.users) ? data.users : [];
    appState.weeks = Array.isArray(data.weeks) ? data.weeks : [];
    appState.availableLanguages = Array.isArray(data.availableLanguages) && data.availableLanguages.length
      ? data.availableLanguages.map((x) => normalizeLanguage(x))
      : Array.from(new Set(appState.weeks.map((x) => normalizeLanguage(x.language || "english"))));

    appState.selectedUserId = data.lastActiveUserId || (appState.users[0] && appState.users[0].id) || "";

    // Prefer: localStorage week > server week > first matching week
    const localWeekId = loadSelectedWeek();
    const serverWeekId = data.lastSelectedWeekId || "";
    const candidateWeekId = localWeekId || serverWeekId || "";
    appState.selectedWeekId = candidateWeekId;

    // If chosen week exists, sync language from it
    if (appState.selectedWeekId) {
      const chosenWeek = appState.weeks.find((w) => w.id === appState.selectedWeekId);
      if (chosenWeek?.language) {
        appState.selectedLanguage = normalizeLanguage(chosenWeek.language);
      }
    }

    // Validate that saved language is available; fall back if not
    if (!appState.availableLanguages.includes(normalizeLanguage(appState.selectedLanguage))) {
      appState.selectedLanguage = appState.availableLanguages[0] || "english";
    }

    // Ensure selectedWeekId matches the current language filter
    const visibleWeeks = filteredWeeks();
    if (!appState.selectedWeekId || !visibleWeeks.some((w) => w.id === appState.selectedWeekId)) {
      appState.selectedWeekId = (visibleWeeks[0] && visibleWeeks[0].id) || (appState.weeks[0] && appState.weeks[0].id) || "";
    }

    if (appState.auth.linkedProfileId) {
      appState.selectedUserId = appState.auth.linkedProfileId;
    }
    syncAnswerLanguageFromCurrentWeek();
  }

  async function loadPlayers() {
    const response = await fetch("/api/players");
    if (!response.ok) {
      appState.playerAvatars = [];
      return;
    }
    const data = await response.json();
    appState.playerAvatars = Array.isArray(data.items) ? data.items : [];
  }

  async function ensureGuestDisplayName() {
    if (appState.auth.isAuthenticated) {
      return;
    }
    const saved = (localStorage.getItem(guestNameKey()) || "").trim();
    if (saved) {
      elements.guestNameInput.value = saved;
      appState.selectedUserId = saved;
      return;
    }

    try {
      const response = await fetch("/api/names/random");
      if (response.ok) {
        const data = await response.json();
        const randomName = (data.name || "").trim().toUpperCase();
        if (randomName) {
          elements.guestNameInput.value = randomName;
          appState.selectedUserId = randomName;
          localStorage.setItem(guestNameKey(), randomName);
          return;
        }
      }
    } catch {
      // Ignore random-name fetch errors.
    }

    const fallbackColors = ["SVART", "VIT", "ROD", "BLA", "GRON", "LILA", "GUL", "ROSA"];
    const fallbackAnimals = ["HUND", "KATT", "BJORN", "VARG", "RAV", "UGGLA", "HARE", "ALG"];
    const fallback = `${fallbackColors[Math.floor(Math.random() * fallbackColors.length)]}-${fallbackAnimals[Math.floor(Math.random() * fallbackAnimals.length)]}`;
    elements.guestNameInput.value = fallback;
    appState.selectedUserId = fallback;
    localStorage.setItem(guestNameKey(), fallback);
  }

  function renderPlayerAvatarPreview() {
    if (!elements.playerAvatarPreview) {
      return;
    }
    const selected = appState.playerAvatars.find((x) => x.id === appState.selectedPlayerImage);
    if (selected) {
      elements.playerAvatarPreview.src = selected.url;
      elements.playerAvatarPreview.style.display = "block";
      if (elements.playerAvatarCard) {
        elements.playerAvatarCard.src = selected.url;
        elements.playerAvatarCard.style.display = "block";
      }
      if (bossFightEngine) {
        bossFightEngine.setPlayerAvatar(selected.url);
      }
      return;
    }
    elements.playerAvatarPreview.removeAttribute("src");
    elements.playerAvatarPreview.style.display = "none";
    if (elements.playerAvatarCard) {
      elements.playerAvatarCard.removeAttribute("src");
      elements.playerAvatarCard.style.display = "none";
    }
    if (bossFightEngine) {
      bossFightEngine.setPlayerAvatar(null);
    }
  }

  function saveAvatarToServer() {
    const selected = appState.playerAvatars.find((x) => x.id === appState.selectedPlayerImage);
    const avatarUrl = selected ? selected.url : "";
    const hdrs = { "Content-Type": "application/json" };
    if (!appState.auth.isAuthenticated) {
      hdrs["X-Guest-Session"] = getGuestSessionId();
      hdrs["X-Guest-Name"] = (elements.guestNameInput.value || appState.selectedUserId || "GÄST").trim();
    }
    fetch("/api/profile/avatar", {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify({ avatarUrl }),
    }).catch(() => {});
  }

  function buildPlayerOptions() {
    if (!elements.playerAvatarSelect) {
      return;
    }
    elements.playerAvatarSelect.innerHTML = "";
    const noneOption = document.createElement("option");
    noneOption.value = "";
    noneOption.textContent = "Ingen";
    elements.playerAvatarSelect.append(noneOption);

    appState.playerAvatars.forEach((player) => {
      const option = document.createElement("option");
      option.value = player.id;
      option.textContent = player.name;
      elements.playerAvatarSelect.append(option);
    });

    const saved = localStorage.getItem(playerAvatarKey()) || "";
    appState.selectedPlayerImage = saved;
    if (!appState.playerAvatars.some((x) => x.id === appState.selectedPlayerImage)) {
      appState.selectedPlayerImage = "";
    }
    elements.playerAvatarSelect.value = appState.selectedPlayerImage;
    renderPlayerAvatarPreview();
    saveAvatarToServer();
  }

  function avatarForName(name) {
    if (!Array.isArray(appState.playerAvatars) || appState.playerAvatars.length === 0) {
      return "";
    }
    const text = String(name || "").trim().toUpperCase();
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
      hash = ((hash * 31) + text.charCodeAt(i)) | 0;
    }
    const idx = Math.abs(hash) % appState.playerAvatars.length;
    return appState.playerAvatars[idx]?.url || "";
  }

  function buildAppLanguageOptions() {
    if (!elements.appLanguageSelect) {
      return;
    }
    const available = Array.isArray(appState.availableLanguages) && appState.availableLanguages.length
      ? appState.availableLanguages.map((x) => normalizeLanguage(x))
      : ["english"];
    elements.appLanguageSelect.innerHTML = "";
    available.forEach((language) => {
      const option = document.createElement("option");
      option.value = language;
      option.textContent = languageDisplayName(language);
      elements.appLanguageSelect.append(option);
    });
    if (!available.includes(normalizeLanguage(appState.selectedLanguage))) {
      appState.selectedLanguage = available[0] || "english";
    }
    elements.appLanguageSelect.value = normalizeLanguage(appState.selectedLanguage);
  }

  function buildGroupFightLanguageOptions() {
    if (!elements.groupFightLanguageSelect) {
      return;
    }
    const available = Array.isArray(appState.availableLanguages) && appState.availableLanguages.length
      ? appState.availableLanguages.map((x) => normalizeLanguage(x))
      : ["english"];
    elements.groupFightLanguageSelect.innerHTML = "";
    available.forEach((language) => {
      const option = document.createElement("option");
      option.value = language;
      option.textContent = languageDisplayName(language);
      elements.groupFightLanguageSelect.append(option);
    });
    if (!available.includes(normalizeLanguage(appState.groupFight.answerLanguage))) {
      appState.groupFight.answerLanguage = normalizeLanguage(appState.selectedLanguage || available[0] || "english");
    }
    elements.groupFightLanguageSelect.value = normalizeLanguage(appState.groupFight.answerLanguage);
  }

  function buildGroupFightWeekOptions() {
    if (!elements.groupFightWeekSelect) {
      return;
    }
    const language = normalizeLanguage(appState.groupFight.answerLanguage);
    const weeks = (appState.weeks || []).filter((week) => normalizeLanguage(week.language) === language);
    elements.groupFightWeekSelect.innerHTML = "";
    weeks.forEach((week) => {
      const option = document.createElement("option");
      option.value = week.id;
      option.textContent = `${week.weekName} (${(week.words || []).length})`;
      elements.groupFightWeekSelect.append(option);
    });
    const gfWeekId = weeks.some((week) => week.id === appState.selectedWeekId) ? appState.selectedWeekId : (weeks[0]?.id || "");
    elements.groupFightWeekSelect.value = gfWeekId;
  }

  function buildLeaderboardWeekOptions() {
    if (!elements.leaderboardWeekSelect) {
      return;
    }
    const current = elements.leaderboardWeekSelect.value;
    elements.leaderboardWeekSelect.innerHTML = "";
    const allOpt = document.createElement("option");
    allOpt.value = "";
    allOpt.textContent = "Alla veckor";
    elements.leaderboardWeekSelect.append(allOpt);
    filteredWeeks().forEach((week) => {
      const option = document.createElement("option");
      option.value = week.id;
      option.textContent = week.weekName;
      elements.leaderboardWeekSelect.append(option);
    });
    if (appState.weeks.some((x) => x.id === current)) {
      elements.leaderboardWeekSelect.value = current;
    } else {
      elements.leaderboardWeekSelect.value = "";
    }
  }

  async function loadLeaderboard() {
    if (!elements.leaderboardList) {
      return;
    }
    const weekId = elements.leaderboardWeekSelect ? (elements.leaderboardWeekSelect.value || "") : "";
    const weekQuery = weekId ? `?weekId=${encodeURIComponent(weekId)}` : "";
    const response = await fetch(`/api/vocab/leaderboard-correct${weekQuery}`);
    if (!response.ok) {
      elements.leaderboardList.innerHTML = "<li>Kunde inte läsa topplista.</li>";
      return;
    }
    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) {
      elements.leaderboardList.innerHTML = "<li>Ingen har spelat an.</li>";
      return;
    }
    elements.leaderboardList.innerHTML = "";
    items.forEach((item, index) => {
      const li = document.createElement("li");
      const rank = document.createElement("strong");
      rank.textContent = `${index + 1}.`;
      const avatar = document.createElement("img");
      avatar.className = "leader-avatar";
      const avatarUrl = item.avatarUrl || avatarForName(item.userName);
      if (avatarUrl) {
        avatar.src = avatarUrl;
        avatar.alt = item.userName;
      }
      const text = document.createElement("span");
      text.textContent = item.userName;
      const score = document.createElement("strong");
      score.textContent = `${item.totalCorrect || 0} klarade  ☠ ${item.matchWins || 0}`;
      li.append(rank, avatar, text, score);
      elements.leaderboardList.append(li);
    });
  }

  async function loadWeekStats() {
    if (!elements.weekStatsContainer) {
      return;
    }
    try {
      const response = await fetch("/api/vocab/week-stats");
      if (!response.ok) {
        elements.weekStatsContainer.innerHTML = "<p>Kunde inte ladda veckostatistik.</p>";
        return;
      }
      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];
      if (!items.length) {
        elements.weekStatsContainer.innerHTML = "<p>Ingen statistik än.</p>";
        return;
      }
      elements.weekStatsContainer.innerHTML = "";
      items.forEach((week) => {
        const section = document.createElement("div");
        section.style.cssText = "margin-bottom:1rem;";

        const header = document.createElement("h4");
        header.style.cssText = "margin:0 0 .3rem 0;font-size:.95rem;";
        header.textContent = `${week.weekName} (${week.totalWords} glosor) — ${languageDisplayName(week.language)}`;
        section.append(header);

        const users = Array.isArray(week.users) ? week.users : [];
        if (!users.length) {
          const empty = document.createElement("p");
          empty.style.cssText = "margin:0;font-size:.85rem;color:#64748b;";
          empty.textContent = "Ingen har sparat framsteg än.";
          section.append(empty);
        } else {
          const table = document.createElement("table");
          table.style.cssText = "width:100%;border-collapse:collapse;font-size:.85rem;";
          const thead = document.createElement("thead");
          thead.innerHTML = "<tr><th style='text-align:left;padding:.25rem .4rem;border-bottom:1px solid #d6e4f3;'>Namn</th><th style='text-align:right;padding:.25rem .4rem;border-bottom:1px solid #d6e4f3;'>Klarade</th><th style='text-align:right;padding:.25rem .4rem;border-bottom:1px solid #d6e4f3;'>%</th><th style='text-align:center;padding:.25rem .4rem;border-bottom:1px solid #d6e4f3;'>Pokaler</th></tr>";
          table.append(thead);
          const tbody = document.createElement("tbody");
          users.forEach((u) => {
            const tr = document.createElement("tr");
            const pct = Number(u.percent || 0);
            const pc = u.perfectCount || 0;
            const barColor = pct >= 100 ? "#16a34a" : pct >= 50 ? "#eab308" : "#ef4444";
            const trophies = [
              { need: 1, label: "Trä", bg: "#d4a574", tint: "sepia(60%) saturate(30%) brightness(90%)" },
              { need: 3, label: "Brons", bg: "#cd7f32", tint: "sepia(80%) saturate(200%) hue-rotate(-10deg) brightness(85%)" },
              { need: 5, label: "Silver", bg: "#c0c0c0", tint: "saturate(0%) brightness(130%)" },
              { need: 10, label: "Guld", bg: "#ffd700", tint: "sepia(60%) saturate(500%) hue-rotate(10deg) brightness(105%)" },
            ];
            let trophyHtml = "";
            trophies.forEach((t) => {
              const achieved = pc >= t.need;
              const progressPct = achieved ? 100 : Math.round((pc / t.need) * 100);
              const trophyOpacity = achieved ? "1" : "0.3";
              trophyHtml += `<span title="${t.label} (${t.need}x 100%) — ${achieved ? 'Klar!' : progressPct + '%'}" style="display:inline-flex;flex-direction:column;align-items:center;margin:0 6px;font-size:1rem;line-height:1;">` +
                `<span style="font-size:1.6rem;filter:${t.tint};opacity:${trophyOpacity};">\uD83C\uDFC6</span>` +
                `<span style="display:inline-block;width:32px;height:6px;background:#e2e8f0;border-radius:3px;margin-top:2px;"><span style="display:block;height:100%;width:${progressPct}%;background:${t.bg};border-radius:3px;"></span></span>` +
                `<span style="font-size:.7rem;color:${t.bg};font-weight:700;margin-top:1px;">${achieved ? t.label : progressPct + '%'}</span>` +
                `</span>`;
            });
            const safeAvatarUrl = escapeHtml(u.avatarUrl);
            const safeUserName = escapeHtml(u.userName);
            const avatarImg = safeAvatarUrl ? `<img src="${safeAvatarUrl}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:4px;border:1px solid #b8d2e9;" />` : "";
            tr.innerHTML = `<td style="padding:.25rem .4rem;">${avatarImg}${safeUserName}</td>` +
              `<td style="text-align:right;padding:.25rem .4rem;">${u.correctCount}/${u.totalWords}</td>` +
              `<td style="text-align:right;padding:.25rem .4rem;"><span style="display:inline-block;width:40px;height:8px;background:#e2e8f0;border-radius:4px;vertical-align:middle;margin-right:4px;"><span style="display:block;height:100%;width:${Math.min(100, pct)}%;background:${barColor};border-radius:4px;"></span></span>${pct}%</td>` +
              `<td style="text-align:center;padding:.25rem .4rem;">${trophyHtml}</td>`;
            tbody.append(tr);
          });
          table.append(tbody);
          section.append(table);
        }
        elements.weekStatsContainer.append(section);
      });
    } catch {
      elements.weekStatsContainer.innerHTML = "<p>Kunde inte ladda veckostatistik.</p>";
    }
  }

  async function sendHeartbeat() {
    if (appState.auth.isAuthenticated) {
      await fetch("/api/presence/heartbeat", { method: "POST" });
      return;
    }
    const guestName = (elements.guestNameInput.value || appState.selectedUserId || "GÄST").trim();
    await fetch("/api/presence/guest-heartbeat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getGuestSessionId(),
        displayName: guestName,
      }),
    });
  }

  async function loadOnlineUsers() {
    if (!elements.onlineUsersList) {
      return;
    }
    const response = await fetch("/api/presence/public");
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    const users = Array.isArray(data.users) ? data.users : [];
    appState.onlineUsers = users;
    elements.onlineUsersList.innerHTML = "";
    if (!users.length) {
      elements.onlineUsersList.innerHTML = "<li>Ingen online.</li>";
      renderGroupFightPopup();
      return;
    }
    users.forEach((user) => {
      const li = document.createElement("li");
      const rank = document.createElement("strong");
      rank.textContent = "•";
      const text = document.createElement("span");
      const ownGuestSession = getGuestSessionId();
      const ownGuestName = (elements.guestNameInput.value || "").trim().toUpperCase();
      const isSelf = (user.isAuthenticated && user.profileId && user.profileId === appState.auth.linkedProfileId)
        || (!user.isAuthenticated && user.sessionId && user.sessionId === ownGuestSession)
        || (!user.isAuthenticated && ownGuestName && String(user.name || "").trim().toUpperCase() === ownGuestName);
      text.textContent = user.name + (isSelf ? " (DU)" : "");
      const action = document.createElement("button");
      action.type = "button";
      const targetId = user.profileId || (user.sessionId ? `guest:${user.sessionId}` : "");
      const canChallenge = !isSelf && !!appState.selectedWeekId && !!targetId;
      action.textContent = isSelf ? "-" : (canChallenge ? "Utmana" : "N/A");
      action.disabled = !canChallenge;
      action.addEventListener("click", () => {
        if (!canChallenge) {
          return;
        }
        openGroupFightPopup();
        removeFromTeams(user);
        appState.groupFight.teamB.push(user);
        renderGroupFightPopup();
      });
      li.append(rank, text, action);
      elements.onlineUsersList.append(li);
    });
    renderGroupFightPopup();
  }

  function presenceKey(user) {
    if (!user) {
      return "";
    }
    if (user.id) {
      return `id:${user.id}`;
    }
    if (user.profileId) {
      return `profile:${user.profileId}`;
    }
    if (user.sessionId) {
      return `guest:${user.sessionId}`;
    }
    return `name:${normalize(user.name)}`;
  }

  function isSamePresence(a, b) {
    return presenceKey(a) !== "" && presenceKey(a) === presenceKey(b);
  }

  function inTeam(user) {
    return appState.groupFight.teamA.some((x) => isSamePresence(x, user)) || appState.groupFight.teamB.some((x) => isSamePresence(x, user));
  }

  function removeFromTeams(user) {
    appState.groupFight.teamA = appState.groupFight.teamA.filter((x) => !isSamePresence(x, user));
    appState.groupFight.teamB = appState.groupFight.teamB.filter((x) => !isSamePresence(x, user));
  }

  function renderPresenceRow(container, user, buttons) {
    if (!container) {
      return;
    }
    const li = document.createElement("li");
    const marker = document.createElement("strong");
    marker.textContent = "•";
    const text = document.createElement("span");
    text.textContent = user.name || "Okänd";
    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "0.35rem";
    actions.style.flexWrap = "nowrap";
    li.append(marker, text, actions);
    (buttons || []).forEach((buttonConfig) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = buttonConfig.text;
      if (buttonConfig.background) {
        btn.style.background = buttonConfig.background;
      }
      btn.addEventListener("click", buttonConfig.onClick);
      actions.append(btn);
    });
    container.append(li);
  }

  function addBotToTeam(teamId) {
    const selected = botRoster.find((b) => b.id === appState.groupFight.selectedBotId) || botRoster[0];
    appState.groupFight.botSeq += 1;
    const botEntry = {
      id: `bot-instance-${appState.groupFight.botSeq}`,
      isBot: true,
      botId: selected.id,
      bossId: selected.bossId,
      name: selected.name,
      avatarUrl: selected.imageUrl || "",
    };
    if (teamId === "A") {
      appState.groupFight.teamA.push(botEntry);
    } else {
      appState.groupFight.teamB.push(botEntry);
    }
    renderGroupFightPopup();
  }

  function renderGroupFightPopup() {
    if (!elements.groupPoolList || !elements.groupTeamAList || !elements.groupTeamBList) {
      return;
    }

    if (elements.groupFightLanguageSelect) {
      buildGroupFightLanguageOptions();
      elements.groupFightLanguageSelect.disabled = !!appState.groupFight.readOnly;
    }
    if (elements.groupFightWeekSelect) {
      buildGroupFightWeekOptions();
      elements.groupFightWeekSelect.disabled = !!appState.groupFight.readOnly;
    }

    elements.groupPoolList.innerHTML = "";
    elements.groupTeamAList.innerHTML = "";
    elements.groupTeamBList.innerHTML = "";
    if (elements.groupFightCreateButton) {
      elements.groupFightCreateButton.textContent = appState.groupFight.readOnly ? "Acceptera" : "Skapa";
      elements.groupFightCreateButton.style.background = appState.groupFight.readOnly ? "#16a34a" : "#16a34a";
    }

    if (appState.groupFight.readOnly) {
      elements.groupPoolList.innerHTML = "<li>Inbjudan är låst. Endast skaparen kan ändra lag.</li>";
      if (!appState.groupFight.teamA.length) {
        elements.groupTeamAList.innerHTML = "<li>Tomt lag.</li>";
      } else {
        appState.groupFight.teamA.forEach((user) => renderPresenceRow(elements.groupTeamAList, user, []));
      }
      if (!appState.groupFight.teamB.length) {
        elements.groupTeamBList.innerHTML = "<li>Tomt lag.</li>";
      } else {
        appState.groupFight.teamB.forEach((user) => renderPresenceRow(elements.groupTeamBList, user, []));
      }
      return;
    }

    const searchRow = document.createElement("li");
    searchRow.style.display = "block";
    searchRow.style.gridTemplateColumns = "none";
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Sok spelare...";
    searchInput.value = appState.groupFight.filterText || "";
    searchInput.style.width = "100%";
    searchInput.addEventListener("input", () => {
      appState.groupFight.filterText = searchInput.value || "";
      renderGroupFightPopup();
    });
    searchRow.append(searchInput);
    elements.groupPoolList.append(searchRow);

    const botControls = document.createElement("li");
    botControls.style.display = "flex";
    botControls.style.gap = "0.45rem";
    botControls.style.alignItems = "center";
    botControls.style.gridTemplateColumns = "none";
    botControls.style.flexWrap = "nowrap";

    const botLabel = document.createElement("strong");
    botLabel.textContent = "Bot";
    const botSelect = document.createElement("select");
    botRoster.forEach((bot) => {
      const option = document.createElement("option");
      option.value = bot.id;
      option.textContent = bot.name;
      botSelect.append(option);
    });
    botSelect.value = appState.groupFight.selectedBotId;
    botSelect.addEventListener("change", () => {
      appState.groupFight.selectedBotId = botSelect.value;
    });

    const botToA = document.createElement("button");
    botToA.type = "button";
    botToA.textContent = "Lag A";
    botToA.style.background = "#2563eb";
    botToA.addEventListener("click", () => addBotToTeam("A"));

    const botToB = document.createElement("button");
    botToB.type = "button";
    botToB.textContent = "Lag B";
    botToB.style.background = "#7c3aed";
    botToB.addEventListener("click", () => addBotToTeam("B"));

    botControls.append(botLabel, botSelect, botToA, botToB);
    elements.groupPoolList.append(botControls);

    const search = normalize(appState.groupFight.filterText || "");
    const poolUsers = (appState.onlineUsers || [])
      .filter((user) => !inTeam(user))
      .filter((user) => !search || normalize(user.name || "").includes(search));
    if (!poolUsers.length) {
      const noUsers = document.createElement("li");
      noUsers.textContent = "Inga fler spelare att välja.";
      elements.groupPoolList.append(noUsers);
    } else {
      poolUsers.forEach((user) => {
        renderPresenceRow(elements.groupPoolList, user, [
          {
            text: "Lag A",
            background: "#2563eb",
            onClick: () => {
              removeFromTeams(user);
              appState.groupFight.teamA.push(user);
              renderGroupFightPopup();
            },
          },
          {
            text: "Lag B",
            background: "#7c3aed",
            onClick: () => {
              removeFromTeams(user);
              appState.groupFight.teamB.push(user);
              renderGroupFightPopup();
            },
          },
        ]);
      });
    }

    if (!appState.groupFight.teamA.length) {
      elements.groupTeamAList.innerHTML = "<li>Tomt lag.</li>";
    } else {
      appState.groupFight.teamA.forEach((user) => {
        renderPresenceRow(elements.groupTeamAList, user, [
          {
            text: "Flytta till B",
            onClick: () => {
              removeFromTeams(user);
              appState.groupFight.teamB.push(user);
              renderGroupFightPopup();
            },
          },
          {
            text: "Ta bort",
            background: "#475569",
            onClick: () => {
              removeFromTeams(user);
              renderGroupFightPopup();
            },
          },
        ]);
      });
    }

    if (!appState.groupFight.teamB.length) {
      elements.groupTeamBList.innerHTML = "<li>Tomt lag.</li>";
    } else {
      appState.groupFight.teamB.forEach((user) => {
        renderPresenceRow(elements.groupTeamBList, user, [
          {
            text: "Flytta till A",
            onClick: () => {
              removeFromTeams(user);
              appState.groupFight.teamA.push(user);
              renderGroupFightPopup();
            },
          },
          {
            text: "Ta bort",
            background: "#475569",
            onClick: () => {
              removeFromTeams(user);
              renderGroupFightPopup();
            },
          },
        ]);
      });
    }
  }

  function openGroupFightPopup() {
    if (!elements.groupFightPopup) {
      return;
    }
    appState.groupFight.open = true;
    appState.groupFight.teamA = [];
    appState.groupFight.teamB = [];
    appState.groupFight.answerLanguage = normalizeLanguage(appState.selectedLanguage || appState.groupFight.answerLanguage || "english");
    appState.groupFight.selectedBotId = appState.groupFight.selectedBotId || "bot-oiia";
    appState.groupFight.readOnly = false;
    appState.groupFight.filterText = "";

    const ownSession = getGuestSessionId();
    const ownName = (elements.guestNameInput.value || "").trim();
    const selfUser = (appState.onlineUsers || []).find((u) =>
      (appState.auth.linkedProfileId && u.profileId === appState.auth.linkedProfileId)
      || (u.sessionId && u.sessionId === ownSession)
      || (!!ownName && normalize(u.name) === normalize(ownName)));
    if (selfUser) {
      appState.groupFight.teamA.push(selfUser);
    }

    buildGroupFightLanguageOptions();
    buildGroupFightWeekOptions();
    renderGroupFightPopup();
    elements.groupFightPopup.style.display = "flex";
  }

  function closeGroupFightPopup() {
    if (!elements.groupFightPopup) {
      return;
    }
    appState.groupFight.open = false;
    appState.groupFight.readOnly = false;
    appState.groupFight.filterText = "";
    elements.groupFightPopup.style.display = "none";
  }

  function getActorKey() {
    return appState.auth.linkedProfileId || `guest:${getGuestSessionId()}`;
  }

  function getActorName() {
    return (appState.auth.displayName || elements.guestNameInput.value || appState.selectedUserId || "GÄST").trim();
  }

  function isCurrentActorPlayer(player) {
    if (!player || player.isBot) {
      return false;
    }
    const myActorKey = String(getActorKey() || "").trim().toLowerCase();
    const playerActorKey = String(player.actorId || player.profileId || (player.sessionId ? `guest:${player.sessionId}` : "") || "").trim().toLowerCase();
    if (myActorKey && playerActorKey && playerActorKey === myActorKey) {
      return true;
    }
    if (appState.auth.linkedProfileId && player.profileId && String(player.profileId).trim().toLowerCase() === String(appState.auth.linkedProfileId).trim().toLowerCase()) {
      return true;
    }
    const ownSession = getGuestSessionId();
    if (ownSession && player.sessionId && String(player.sessionId).trim().toLowerCase() === String(ownSession).trim().toLowerCase()) {
      return true;
    }
    return normalize(player.name) === normalize(getActorName());
  }

  function getCurrentGroupBattlePlayer() {
    const everyone = [...appState.groupBattle.teamA, ...appState.groupBattle.teamB];
    const strict = everyone.find((p) => isCurrentActorPlayer(p));
    if (strict) {
      return strict;
    }
    const myName = normalize(getActorName());
    const nameMatches = everyone.filter((p) => !p.isBot && normalize(p.name) === myName);
    if (nameMatches.length === 1) {
      return nameMatches[0];
    }
    return null;
  }

  function getLocalGroupTeam() {
    return appState.groupBattle.localTeam === "B" ? "B" : "A";
  }

  function toVisualGroupTeam(canonicalTeam) {
    const canon = canonicalTeam === "B" ? "B" : "A";
    return canon === getLocalGroupTeam() ? "A" : "B";
  }

  function getProjectedGroupState() {
    if (getLocalGroupTeam() === "B") {
      return {
        teamA: appState.groupBattle.teamB,
        teamB: appState.groupBattle.teamA,
        prepEndsAtMs: appState.groupBattle.prepEndsAtMs,
      };
    }
    return {
      teamA: appState.groupBattle.teamA,
      teamB: appState.groupBattle.teamB,
      prepEndsAtMs: appState.groupBattle.prepEndsAtMs,
    };
  }

  function resolveLocalTeamFromTeams(teamA = [], teamB = []) {
    const myActorKey = String(getActorKey() || "").trim().toLowerCase();
    const myProfile = String(appState.auth.linkedProfileId || "").trim().toLowerCase();
    const mySession = String(getGuestSessionId() || "").trim().toLowerCase();
    const pickTeam = (members, team) => {
      const found = (members || []).some((p) => {
        const actor = String(p.actorId || p.id || "").trim().toLowerCase();
        const profile = String(p.profileId || "").trim().toLowerCase();
        const session = String(p.sessionId || "").trim().toLowerCase();
        if (myActorKey && actor && actor === myActorKey) {
          return true;
        }
        if (myProfile && profile && profile === myProfile) {
          return true;
        }
        if (mySession && session && session === mySession) {
          return true;
        }
        return false;
      });
      return found ? team : null;
    };
    return pickTeam(teamA, "A") || pickTeam(teamB, "B") || null;
  }

  function botAccuracy(botId) {
    if (botId.includes("reaper") || botId.includes("t90")) {
      return 0.78;
    }
    if (botId.includes("oiia") || botId.includes("kirby")) {
      return 0.67;
    }
    if (botId.includes("dino")) {
      return 0.62;
    }
    return 0.7;
  }

  function pushGroupBattleFeed(text) {
    if (!text) {
      return;
    }
    appState.groupBattle.feed.unshift(text);
    if (appState.groupBattle.feed.length > 4) {
      appState.groupBattle.feed.length = 4;
    }
    if (elements.groupBattleFeed) {
      elements.groupBattleFeed.style.display = "block";
      elements.groupBattleFeed.textContent = appState.groupBattle.feed[0];
    }
  }

  function getPerWordGroupDamage() {
    const minHp = Math.max(1, Math.min(appState.groupBattle.maxHpA || 100, appState.groupBattle.maxHpB || 100));
    return minHp / Math.max(1, appState.groupBattle.totalWords || 1);
  }

  function currentWordKey() {
    if (!state.currentWord) {
      return "";
    }
    return `${normalize(state.currentWord.sv || "")}__${normalize(state.currentWord.en || "")}`;
  }

  function randomUnsolvedWordKeyForPlayer(player) {
    const solved = Array.isArray(player?.solvedKeys) ? player.solvedKeys : [];
    const solvedSet = new Set(solved);
    const words = appState.bossFight.roundWords || [];
    const unresolved = words
      .map((w) => `${normalize(w.sv || "")}__${normalize(w.en || "")}`)
      .filter((k) => !!k && !solvedSet.has(k));
    if (!unresolved.length) {
      return "";
    }
    return unresolved[Math.floor(Math.random() * unresolved.length)] || "";
  }

  function pickGroupBattleWordForPlayer(player) {
    const words = appState.bossFight.roundWords || [];
    if (!words.length) {
      return null;
    }
    const solved = new Set(Array.isArray(player?.solvedKeys) ? player.solvedKeys : []);
    const unresolved = words.filter((w) => {
      const key = `${normalize(w.sv || "")}__${normalize(w.en || "")}`;
      return key && !solved.has(key);
    });
    const pool = unresolved.length ? unresolved : words;
    return pool[Math.floor(Math.random() * pool.length)] || null;
  }

  function allGroupPlayersDone() {
    const need = Math.max(1, appState.groupBattle.totalWords || 1);
    const everyone = [...appState.groupBattle.teamA, ...appState.groupBattle.teamB];
    if (!everyone.length) {
      return false;
    }
    return everyone.every((p) => Number(p.correct || 0) >= need);
  }

  function isGroupTeamDone(team) {
    const target = team === "B" ? appState.groupBattle.teamB : appState.groupBattle.teamA;
    const need = Math.max(1, appState.groupBattle.totalWords || 1);
    if (!target.length) {
      return false;
    }
    return target.every((p) => Number(p.correct || 0) >= need);
  }

  function showGroupBattleResultOverlay(isWinner, winnerName) {
    if (!elements.groupResultOverlay) {
      return;
    }
    elements.groupResultOverlay.style.display = "flex";
    if (isWinner) {
      elements.groupResultOverlay.style.background = "rgba(11, 124, 59, 0.82)";
      elements.groupResultOverlay.textContent = "DU VANN!";
    } else {
      elements.groupResultOverlay.style.background = "rgba(185, 28, 28, 0.86)";
      elements.groupResultOverlay.textContent = winnerName ? `DU FORLORADE - ${winnerName} VANN` : "DU FORLORADE";
    }
  }

  function hideGroupBattleResultOverlay() {
    if (!elements.groupResultOverlay) {
      return;
    }
    elements.groupResultOverlay.style.display = "none";
  }

  function isWinnerPayload(text) {
    return typeof text === "string" && text.startsWith("__WINNER__:");
  }

  function parseWinnerPayload(text) {
    const payload = String(text || "");
    if (!isWinnerPayload(payload)) {
      return null;
    }
    const rest = payload.slice("__WINNER__:".length);
    const parts = rest.split("|");
    const team = parts[0] === "B" ? "B" : "A";
    const name = parts.slice(1).join("|") || "Lag";
    return { team, name };
  }

  function parseHitPayload(text) {
    const payload = String(text || "");
    if (!payload.startsWith("__HIT__:")) {
      return null;
    }
    const parts = payload.slice("__HIT__:".length).split("|");
    if (parts.length < 8) {
      return null;
    }
    return {
      team: parts[0] === "B" ? "B" : "A",
      shooterId: parts[1] || "",
      targetId: parts[2] || "",
      targetHp: Number(parts[3] || 0),
      hpA: Number(parts[4] || 0),
      hpB: Number(parts[5] || 0),
      shooterCorrect: Number(parts[6] || 0),
      resolvedWords: Number(parts[7] || 0),
    };
  }

  function parseMissPayload(text) {
    const payload = String(text || "");
    if (!payload.startsWith("__MISS__:")) {
      return null;
    }
    const parts = payload.slice("__MISS__:".length).split("|");
    if (parts.length < 3) {
      return null;
    }
    return {
      team: parts[0] === "B" ? "B" : "A",
      shooterId: parts[1] || "",
      wrong: Number(parts[2] || 0),
    };
  }

  function updateGroupBattleBoard() {
    if (!elements.groupBattleBoard || !elements.groupBattlePlayers || !elements.groupBattleStatusText) {
      return;
    }
    if (!appState.groupBattle.active) {
      elements.groupBattleBoard.style.display = "none";
      if (elements.groupBattleProgressWrap) {
        elements.groupBattleProgressWrap.style.display = "none";
      }
      return;
    }
    elements.groupBattleBoard.style.display = "";
    const myTeam = getLocalGroupTeam();
    const myHp = myTeam === "A" ? appState.groupBattle.hpA : appState.groupBattle.hpB;
    const myMax = myTeam === "A" ? appState.groupBattle.maxHpA : appState.groupBattle.maxHpB;
    const enemyHp = myTeam === "A" ? appState.groupBattle.hpB : appState.groupBattle.hpA;
    const enemyMax = myTeam === "A" ? appState.groupBattle.maxHpB : appState.groupBattle.maxHpA;
    elements.groupBattleStatusText.textContent = `Ditt lag HP ${Math.round(myHp)}/${Math.round(myMax)} | Motståndare HP ${Math.round(enemyHp)}/${Math.round(enemyMax)}`;
    if (elements.groupBattleProgressWrap && elements.groupBattleProgressFill && elements.groupBattleProgressText) {
      const myPlayers = myTeam === "A" ? appState.groupBattle.teamA : appState.groupBattle.teamB;
      const ownCorrect = myPlayers.reduce((s, p) => s + Math.max(0, Number(p.correct || 0)), 0);
      const ownTotal = Math.max(1, myPlayers.length * Math.max(1, appState.groupBattle.totalWords || 1));
      const pct = Math.max(0, Math.min(100, (ownCorrect / ownTotal) * 100));
      elements.groupBattleProgressWrap.style.display = "";
      elements.groupBattleProgressFill.style.width = `${pct}%`;
      elements.groupBattleProgressText.textContent = `Lagets glosor: ${ownCorrect}/${ownTotal} (${Math.round(pct)}%)`;
    }
    elements.groupBattlePlayers.innerHTML = "";
    [...appState.groupBattle.teamA, ...appState.groupBattle.teamB].forEach((p) => {
      const li = document.createElement("li");
      const side = p.team === myTeam ? "Ditt lag" : "Motståndare";
      li.innerHTML = `<strong>${side}</strong><span>${escapeHtml(p.name)}</span><strong>${p.correct}/${appState.groupBattle.totalWords}</strong>`;
      elements.groupBattlePlayers.append(li);
    });
  }

  function stopGroupBattle(reason) {
    if (!appState.groupBattle.active) {
      return;
    }
    appState.groupBattle.active = false;
    appState.groupBattle.finishing = false;
    appState.groupBattle.winnerTeam = null;
    appState.groupBattle.prepEndsAtMs = 0;
    if (appState.groupBattle.botTimerId) {
      window.clearInterval(appState.groupBattle.botTimerId);
      appState.groupBattle.botTimerId = 0;
    }
    if (elements.groupBattleFeed) {
      elements.groupBattleFeed.style.display = "none";
      elements.groupBattleFeed.textContent = "";
    }
    hideGroupBattleResultOverlay();
    if (reason) {
      elements.feedbackText.className = "feedback good";
      elements.feedbackText.textContent = reason;
      pushLog(reason);
    }
    if (bossFightEngine && !appState.duel.active && !state.bossMode && !state.fortressMode) {
      bossFightEngine.setMode("idle");
    }
    updateGroupBattleBoard();
  }

  function triggerGroupBattleVictoryFx(canonicalWinnerTeam, winnerName) {
    if (!bossFightEngine) {
      return;
    }
    const winnerVisualTeam = toVisualGroupTeam(canonicalWinnerTeam);
    const winnerSlots = winnerVisualTeam === "A" ? appState.groupBattle.teamA : appState.groupBattle.teamB;
    bossFightEngine.startGroupBattleVictoryFx({
      winnerTeam: winnerVisualTeam,
      winnerName: winnerName || "Lag",
      playerIcons: winnerSlots.map((p) => ({
        name: p.name || "Spelare",
        avatarUrl: p.avatarUrl || "",
      })),
      iconCopiesPerPlayer: 15,
    });
  }

  async function announceGroupBattleWinner(canonicalWinnerTeam, winnerName) {
    if (appState.groupBattle.finishing) {
      return;
    }
    appState.groupBattle.finishing = true;
    appState.groupBattle.winnerTeam = canonicalWinnerTeam === "B" ? "B" : "A";
    triggerGroupBattleVictoryFx(appState.groupBattle.winnerTeam, winnerName);
    const winnerText = appState.groupBattle.winnerTeam === getLocalGroupTeam() ? "Du vann gruppfighten!" : `Motståndaren vann (${winnerName}).`;
    elements.feedbackText.className = appState.groupBattle.winnerTeam === getLocalGroupTeam() ? "feedback good" : "feedback bad";
    elements.feedbackText.textContent = winnerText;
    showGroupBattleResultOverlay(appState.groupBattle.winnerTeam === getLocalGroupTeam(), winnerName || "Lag");
    pushLog(winnerText);
    await sendGroupFightBroadcast(appState.groupBattle.winnerTeam, `__WINNER__:${appState.groupBattle.winnerTeam}|${winnerName || "Lag"}`, true);
    window.setTimeout(() => {
      stopGroupBattle(winnerText);
    }, 3000);
  }

  function applyGroupBattleAnswer(player, isCorrect) {
    if (!appState.groupBattle.active || appState.groupBattle.finishing || !player) {
      return;
    }
    if (appState.groupBattle.prepEndsAtMs > Date.now()) {
      return;
    }
    if (isCorrect) {
      const key = player.isBot ? randomUnsolvedWordKeyForPlayer(player) : currentWordKey();
      if (!key) {
        return;
      }
      if (!Array.isArray(player.solvedKeys)) {
        player.solvedKeys = [];
      }
      if (player.solvedKeys.includes(key)) {
        if (bossFightEngine) {
          bossFightEngine.setGroupBattleBroadcast(toVisualGroupTeam(player.team), `${player.name} repeterade en redan klarad glosa`, false);
        }
        pushGroupBattleFeed(`${player.name} repeterade en redan klarad glosa - ingen skada.`);
        return;
      }
      player.solvedKeys.push(key);
      player.correct += 1;
      appState.groupBattle.resolvedWords += 1;
      const dmg = getPerWordGroupDamage();
      const targetTeam = player.team === "A" ? appState.groupBattle.teamB : appState.groupBattle.teamA;
      const target = targetTeam.filter((x) => x.hp > 0).sort((a, b) => b.hp - a.hp)[0] || targetTeam[0];
      if (target) {
        const canLethal = isGroupTeamDone(player.team);
        target.hp = canLethal ? Math.max(0, target.hp - dmg) : Math.max(1, target.hp - dmg);
      }
      appState.groupBattle.hpA = appState.groupBattle.teamA.reduce((s, x) => s + Math.max(0, x.hp || 0), 0);
      appState.groupBattle.hpB = appState.groupBattle.teamB.reduce((s, x) => s + Math.max(0, x.hp || 0), 0);
      const ratio = Math.max(0.06, Math.min(0.95, dmg / Math.max(1, target?.maxHp || (player.team === "A" ? appState.groupBattle.maxHpB : appState.groupBattle.maxHpA))));
      if (bossFightEngine) {
        if (target?.id) {
          bossFightEngine.groupBattleShot(toVisualGroupTeam(player.team), target.id, ratio);
        }
        bossFightEngine.syncGroupBattleState(getProjectedGroupState());
        bossFightEngine.setGroupBattleBroadcast(toVisualGroupTeam(player.team), `${player.name} klarade glosan`, true);
      }
      const hitPayload = `__HIT__:${player.team}|${player.id || ""}|${target?.id || ""}|${Number(target?.hp || 0).toFixed(2)}|${Number(appState.groupBattle.hpA || 0).toFixed(2)}|${Number(appState.groupBattle.hpB || 0).toFixed(2)}|${Math.max(0, Number(player.correct || 0))}|${Math.max(0, Number(appState.groupBattle.resolvedWords || 0))}`;
      sendGroupFightBroadcast(player.team, hitPayload, true);
      pushGroupBattleFeed(`${player.name} skrev RÄTT glosa${target ? ` och träffade ${target.name}` : ""}!`);
      if (isGroupTeamDone(player.team)) {
        announceGroupBattleWinner(player.team, player.name || (player.team === "A" ? "Lag A" : "Lag B"));
        return;
      }
    } else {
      player.wrong += 1;
      if (bossFightEngine) {
        bossFightEngine.setGroupBattleBroadcast(toVisualGroupTeam(player.team), `${player.name} missade glosan`, false);
      }
      const missPayload = `__MISS__:${player.team}|${player.id || ""}|${Math.max(0, Number(player.wrong || 0))}`;
      sendGroupFightBroadcast(player.team, missPayload, false);
      pushGroupBattleFeed(`${player.name} skrev FEL glosa!`);
    }
    updateGroupBattleBoard();
    const winnerA = appState.groupBattle.hpB <= 0;
    const winnerB = appState.groupBattle.hpA <= 0;
    if (winnerA || winnerB) {
      announceGroupBattleWinner(winnerA ? "A" : "B", player.name || (winnerA ? "Lag A" : "Lag B"));
      return;
    }
  }

  function startGroupBattle(preset = null) {
    const allA = (preset?.teamA || appState.groupFight.teamA).map((x) => ({ ...x, team: "A", correct: 0, wrong: 0 }));
    const allB = (preset?.teamB || appState.groupFight.teamB).map((x) => ({ ...x, team: "B", correct: 0, wrong: 0 }));
    if (!allA.length || !allB.length) {
      alert("Bada lag maste ha minst en spelare eller bot.");
      return false;
    }
    const words = shuffleWords(currentWords());
    if (!words.length) {
      alert("Ingen glosa finns i vald vecka.");
      return false;
    }
    const weekId = preset?.weekId || appState.selectedWeekId || "";
    appState.selectedWeekId = weekId;
    appState.practiceAnswerLanguage = normalizeLanguage(preset?.answerLanguage || currentWeek()?.language || appState.selectedLanguage || "english");
    const actorLevel = resolveWeekLevelAndProgress(weekId).level;
    const selfAvatar = appState.playerAvatars.find((x) => x.id === appState.selectedPlayerImage)?.url || "";
    const calcMax = (p) => {
      if (p.isBot) {
        if ((p.bossId || "").includes("t90") || (p.bossId || "").includes("reaper")) {
          return 130;
        }
        if ((p.bossId || "").includes("dino")) {
          return 110;
        }
        return 120;
      }
      if (isCurrentActorPlayer(p)) {
        return 100 + (actorLevel - 1) * 10;
      }
      return 110;
    };
    const enrich = (p) => {
      const maxHp = calcMax(p);
      const avatar = p.isBot ? (botRoster.find((b) => b.id === p.botId)?.imageUrl || "") : (isCurrentActorPlayer(p) ? selfAvatar : "");
      const castleLevel = p.isBot
        ? Math.max(1, Math.min(20, Math.round((maxHp - 100) / 10) + 1))
        : (isCurrentActorPlayer(p) ? actorLevel : 1);
      return { ...p, maxHp, hp: maxHp, avatarUrl: avatar, castleLevel, solvedKeys: [] };
    };
    const teamA = allA.map(enrich);
    const teamB = allB.map(enrich);
    appState.groupBattle.maxHpA = teamA.reduce((s, p) => s + p.maxHp, 0);
    appState.groupBattle.maxHpB = teamB.reduce((s, p) => s + p.maxHp, 0);
    appState.groupBattle.hpA = appState.groupBattle.maxHpA;
    appState.groupBattle.hpB = appState.groupBattle.maxHpB;
    appState.groupBattle.teamA = teamA;
    appState.groupBattle.teamB = teamB;
    appState.groupBattle.prepEndsAtMs = Number(preset?.prepEndsAtMs || (Date.now() + 10000));
    appState.groupBattle.lastPrepBroadcastSecond = -1;
    appState.groupBattle.totalWords = words.length;
    appState.groupBattle.resolvedWords = 0;
    appState.groupBattle.feed = [];
    appState.groupBattle.finishing = false;
    appState.groupBattle.winnerTeam = null;
    appState.groupBattle.active = true;
    hideGroupBattleResultOverlay();
    const presetTeam = preset?.localTeam === "B" ? "B" : (preset?.localTeam === "A" ? "A" : null);
    const detectedTeam = resolveLocalTeamFromTeams(teamA, teamB);
    const me = [...teamA, ...teamB].find((p) => isCurrentActorPlayer(p));
    appState.groupBattle.localTeam = presetTeam || detectedTeam || (me?.team === "B" ? "B" : "A");
    state.bossMode = false;
    state.fortressMode = false;
    appState.duel.active = false;
    appState.bossFight.roundWords = words;
    appState.bossFight.wordIndex = 0;
    setQuestion(null, { focus: false, emptyText: "GÖR DIG REDO - gruppfight startar om 10..." });
    if (bossFightEngine) {
      bossFightEngine.startGroupBattleMode(getProjectedGroupState());
    }
    updateGroupBattleBoard();
    if (appState.groupBattle.botTimerId) {
      window.clearInterval(appState.groupBattle.botTimerId);
    }
    appState.groupBattle.botTimerId = window.setInterval(() => {
      if (!appState.groupBattle.active) {
        return;
      }
      if (appState.groupBattle.prepEndsAtMs > Date.now()) {
        return;
      }
      const bots = [...appState.groupBattle.teamA, ...appState.groupBattle.teamB].filter((x) => x.isBot);
      if (!bots.length) {
        return;
      }
      const bot = bots[Math.floor(Math.random() * bots.length)];
      const ok = Math.random() < botAccuracy(bot.botId);
      applyGroupBattleAnswer(bot, ok);
    }, 2300);
    return true;
  }

  async function createGroupFightInvite() {
    const toPayloadMember = (x) => ({
      actorId: x.profileId || (x.sessionId ? `guest:${x.sessionId}` : x.id || x.actorId || ""),
      displayName: x.name || x.displayName || "Spelare",
      isBot: !!x.isBot,
    });
    const payload = {
      weekId: appState.selectedWeekId,
      answerLanguage: normalizeLanguage(appState.groupFight.answerLanguage || appState.selectedLanguage || "english"),
      teamA: appState.groupFight.teamA.map(toPayloadMember),
      teamB: appState.groupFight.teamB.map(toPayloadMember),
    };
    const res = await fetch("/api/groupfight/invites", {
      method: "POST",
      headers: challengeHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Kunde inte skapa gruppfight-inbjudan.");
    }
    return data.inviteId;
  }

  function inviteToTeams(invite) {
    const mapMember = (m) => ({
      id: m.actorId,
      actorId: m.actorId,
      name: m.displayName,
      profileId: m.actorId && !String(m.actorId).startsWith("guest:") && !String(m.actorId).startsWith("bot:") ? m.actorId : null,
      sessionId: m.actorId && String(m.actorId).startsWith("guest:") ? String(m.actorId).slice("guest:".length) : null,
      isBot: !!m.isBot || String(m.actorId || "").startsWith("bot:"),
      botId: String(m.actorId || "").startsWith("bot:") ? String(m.actorId) : "",
      bossId: String(m.actorId || "").startsWith("bot:bot-") ? String(m.actorId || "").replace("bot:bot-", "") : "",
    });
    return {
      teamA: (invite.teamA || []).map(mapMember),
      teamB: (invite.teamB || []).map(mapMember),
    };
  }

  async function pollGroupFightCurrent() {
    const response = await fetch("/api/groupfight/current", { headers: challengeHeaders() });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    const invite = data && data.invite ? data.invite : null;
    const previousInviteId = appState.groupInvite.current?.id || null;
    appState.groupInvite.current = invite;
    if (!invite) {
      appState.groupInvite.lastEventId = 0;
      return;
    }
    if (previousInviteId !== invite.id) {
      appState.groupInvite.lastEventId = 0;
    }

    if (invite.status === "Active" && appState.groupInvite.lastInviteId !== invite.id && appState.groupInvite.initialPollDone) {
      appState.groupInvite.lastInviteId = invite.id;
      const mapped = inviteToTeams(invite);
      appState.selectedLanguage = normalizeLanguage(invite.answerLanguage || "english");
      appState.selectedWeekId = invite.weekId || appState.selectedWeekId;
      buildAppLanguageOptions();
      buildSelectOptions();
      closeGroupFightPopup();
      const ok = startGroupBattle({
        teamA: mapped.teamA,
        teamB: mapped.teamB,
        localTeam: resolveLocalTeamFromTeams(mapped.teamA, mapped.teamB) || "A",
        weekId: invite.weekId || appState.selectedWeekId,
        answerLanguage: invite.answerLanguage || "english",
        prepEndsAtMs: Number(invite.prepEndsUnixMs || (invite.prepEndsUtc ? new Date(invite.prepEndsUtc).getTime() : (Date.now() + 10000))),
      });
      if (ok) {
        elements.feedbackText.className = "feedback good";
        elements.feedbackText.textContent = "Gruppfight startad - gör dig redo!";
      }
    }
    appState.groupInvite.initialPollDone = true;
    await pollGroupFightEvents();
  }

  async function sendGroupFightBroadcast(team, text, isGood) {
    const inviteId = appState.groupInvite.current?.id;
    if (!inviteId || !text) {
      return;
    }
    await fetch(`/api/groupfight/invites/${encodeURIComponent(inviteId)}/broadcast`, {
      method: "POST",
      headers: challengeHeaders(),
      body: JSON.stringify({
        team: team === "B" ? "B" : "A",
        text,
        isGood: !!isGood,
      }),
    });
  }

  async function pollGroupFightEvents() {
    const invite = appState.groupInvite.current;
    if (!invite || invite.status !== "Active" || !invite.id) {
      return;
    }
    const res = await fetch(`/api/groupfight/invites/${encodeURIComponent(invite.id)}/events?sinceId=${encodeURIComponent(String(appState.groupInvite.lastEventId || 0))}`, {
      headers: challengeHeaders(),
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    const me = getActorKey();
    items.forEach((evt) => {
      const id = Number(evt.id || 0);
      if (Number.isFinite(id) && id > appState.groupInvite.lastEventId) {
        appState.groupInvite.lastEventId = id;
      }
      if (!bossFightEngine) {
        return;
      }
      if (String(evt.actorId || "") === String(me)) {
        return;
      }
      const parsedWinner = parseWinnerPayload(evt.text || "");
      if (parsedWinner) {
        if (!appState.groupBattle.finishing) {
          appState.groupBattle.finishing = true;
          appState.groupBattle.winnerTeam = parsedWinner.team;
          triggerGroupBattleVictoryFx(parsedWinner.team, parsedWinner.name);
          const winnerText = parsedWinner.team === getLocalGroupTeam() ? "Du vann gruppfighten!" : `Motståndaren vann (${parsedWinner.name}).`;
          elements.feedbackText.className = parsedWinner.team === getLocalGroupTeam() ? "feedback good" : "feedback bad";
          elements.feedbackText.textContent = winnerText;
          showGroupBattleResultOverlay(parsedWinner.team === getLocalGroupTeam(), parsedWinner.name || "Lag");
          pushLog(winnerText);
          window.setTimeout(() => {
            stopGroupBattle(winnerText);
          }, 3000);
        }
        return;
      }
      const parsedHit = parseHitPayload(evt.text || "");
      if (parsedHit) {
        const canonicalTeam = parsedHit.team;
        const shooterTeam = canonicalTeam === "A" ? appState.groupBattle.teamA : appState.groupBattle.teamB;
        const shooter = shooterTeam.find((p) => String(p.id || "") === String(parsedHit.shooterId || ""));
        const targetTeam = canonicalTeam === "A" ? appState.groupBattle.teamB : appState.groupBattle.teamA;
        const target = targetTeam.find((p) => String(p.id || "") === String(parsedHit.targetId || ""));
        const beforeHp = Number(target?.hp || 0);
        if (shooter) {
          shooter.correct = Math.max(Number(shooter.correct || 0), Math.max(0, Math.floor(parsedHit.shooterCorrect || 0)));
        }
        if (target) {
          target.hp = Math.max(0, Number(parsedHit.targetHp || 0));
        }
        if (Number.isFinite(parsedHit.hpA)) {
          appState.groupBattle.hpA = Math.max(0, parsedHit.hpA);
        }
        if (Number.isFinite(parsedHit.hpB)) {
          appState.groupBattle.hpB = Math.max(0, parsedHit.hpB);
        }
        if (Number.isFinite(parsedHit.resolvedWords)) {
          appState.groupBattle.resolvedWords = Math.max(appState.groupBattle.resolvedWords || 0, parsedHit.resolvedWords);
        }

        const estimatedDamage = Math.max(0.1, beforeHp - Number(parsedHit.targetHp || 0));
        const ratio = Math.max(0.06, Math.min(0.95, estimatedDamage / Math.max(1, Number(target?.maxHp || 100))));
        if (target?.id) {
          bossFightEngine.groupBattleShot(toVisualGroupTeam(canonicalTeam), target.id, ratio);
        }
        bossFightEngine.syncGroupBattleState(getProjectedGroupState());
        bossFightEngine.setGroupBattleBroadcast(toVisualGroupTeam(canonicalTeam), `${shooter?.name || "Spelare"} klarade glosan`, true);
        pushGroupBattleFeed(`${shooter?.name || "Spelare"} skrev RÄTT glosa${target ? ` och träffade ${target.name}` : ""}!`);
        updateGroupBattleBoard();
        renderStats();
        return;
      }

      const parsedMiss = parseMissPayload(evt.text || "");
      if (parsedMiss) {
        const canonicalTeam = parsedMiss.team;
        const shooterTeam = canonicalTeam === "A" ? appState.groupBattle.teamA : appState.groupBattle.teamB;
        const shooter = shooterTeam.find((p) => String(p.id || "") === String(parsedMiss.shooterId || ""));
        if (shooter) {
          shooter.wrong = Math.max(Number(shooter.wrong || 0), Math.max(0, Math.floor(parsedMiss.wrong || 0)));
        }
        bossFightEngine.setGroupBattleBroadcast(toVisualGroupTeam(canonicalTeam), `${shooter?.name || "Spelare"} missade glosan`, false);
        pushGroupBattleFeed(`${shooter?.name || "Spelare"} skrev FEL glosa!`);
        updateGroupBattleBoard();
        renderStats();
        return;
      }

      const canonicalTeam = evt.team === "B" ? "B" : "A";
      bossFightEngine.setGroupBattleBroadcast(toVisualGroupTeam(canonicalTeam), evt.text || "", !!evt.isGood);
    });
  }

  async function respondGroupFightInvite(inviteId, accept) {
    const res = await fetch(`/api/groupfight/invites/${encodeURIComponent(inviteId)}/respond`, {
      method: "POST",
      headers: challengeHeaders(),
      body: JSON.stringify({ accept: !!accept }),
    });
    if (!res.ok) {
      return false;
    }
    await pollGroupFightCurrent();
    await pollChallengeInbox();
    return true;
  }

  async function pollChallengeInbox() {
    if (!elements.challengeInboxList) {
      return;
    }
    let groupItems = [];
    const groupResponse = await fetch("/api/groupfight/inbox", { headers: challengeHeaders() });
    if (!groupResponse.ok) {
      if (groupResponse.status === 401) {
        elements.challengeInboxList.innerHTML = "<li>Vänta... ansluter utmaningar.</li>";
      } else {
        elements.challengeInboxList.innerHTML = "<li>Kunde inte läsa utmaningar.</li>";
      }
      return;
    }
    if (groupResponse.ok) {
      const groupData = await groupResponse.json();
      groupItems = Array.isArray(groupData.items) ? groupData.items : [];
    }
    const seenSet = new Set(appState.challengeInboxSeenIds || []);
    const newIncoming = groupItems.filter((x) => x && x.id && !seenSet.has(x.id));
    if (newIncoming.length > 0) {
      const first = newIncoming[0];
      showToast(`Ny gruppfight fran ${languageDisplayName(first.answerLanguage || "english")} / ${first.weekName}.`, "warn");
      pulseChallengeBox();
    }
    appState.challengeInboxSeenIds = groupItems.map((x) => x.id).filter((id) => !!id);

    const currentInvite = appState.groupInvite.current;
    const renderKey = JSON.stringify({
      group: groupItems.map((x) => `${x.id}|${x.status}|${x.weekId}|${x.answerLanguage || ""}`),
      current: currentInvite ? `${currentInvite.id}|${currentInvite.status}` : "",
    });
    if (renderKey === appState.challengeInboxRenderKey) {
      return;
    }
    appState.challengeInboxRenderKey = renderKey;

    elements.challengeInboxList.innerHTML = "";
    const actorId = getActorKey();
    if (groupItems.length > 0) {
      groupItems.forEach((item) => {
        const isCreator = String(item.creatorActorId || "") === String(actorId || "");
        if (isCreator) {
          return;
        }
        const li = document.createElement("li");
        const marker = document.createElement("strong");
        marker.textContent = "G";
        const text = document.createElement("span");
        const teamA = (item.teamA || []).map((x) => `${x.displayName}${x.status === "Accepted" ? " ✅" : " ⏳"}`).join(", ");
        const teamB = (item.teamB || []).map((x) => `${x.displayName}${x.status === "Accepted" ? " ✅" : " ⏳"}`).join(", ");
        text.textContent = `GRUPPFIGHT ${item.weekName} / ${languageDisplayName(item.answerLanguage || "english")}: A[${teamA}] vs B[${teamB}]`;
        const actions = document.createElement("div");
        actions.style.display = "flex";
        actions.style.gap = "0.35rem";

        const quickAccept = document.createElement("button");
        quickAccept.type = "button";
        quickAccept.textContent = "Snabb Acceptera";
        quickAccept.style.background = "#16a34a";
        quickAccept.addEventListener("click", async () => {
          await respondGroupFightInvite(item.id, true);
        });

        const openBtn = document.createElement("button");
        openBtn.type = "button";
        openBtn.textContent = "Se gruppfight";
        openBtn.style.background = "#2563eb";
        openBtn.addEventListener("click", () => {
          const mapped = inviteToTeams(item);
          appState.groupInvite.current = item;
          appState.groupFight.open = true;
          appState.groupFight.answerLanguage = normalizeLanguage(item.answerLanguage || "english");
          appState.selectedLanguage = appState.groupFight.answerLanguage;
          appState.selectedWeekId = item.weekId || appState.selectedWeekId;
          appState.groupFight.teamA = mapped.teamA;
          appState.groupFight.teamB = mapped.teamB;
          appState.groupFight.readOnly = true;
          appState.groupFight.filterText = "";
          buildAppLanguageOptions();
          buildGroupFightLanguageOptions();
          buildGroupFightWeekOptions();
          renderGroupFightPopup();
          if (elements.groupFightPopup) {
            elements.groupFightPopup.style.display = "flex";
          }
        });

        const decline = document.createElement("button");
        decline.type = "button";
        decline.textContent = "Neka";
        decline.style.background = "#dc2626";
        decline.addEventListener("click", async () => {
          await respondGroupFightInvite(item.id, false);
        });

        actions.append(quickAccept, openBtn, decline);
        li.append(marker, text, actions);
        elements.challengeInboxList.append(li);
      });
    }

    if (currentInvite && currentInvite.status === "Pending") {
      const isCreator = String(currentInvite.creatorActorId || "") === String(actorId || "");
      if (!isCreator) {
        if (!elements.challengeInboxList.children.length) {
          elements.challengeInboxList.innerHTML = "<li>Inga nya utmaningar.</li>";
        }
        return;
      }
      const li = document.createElement("li");
      const marker = document.createElement("strong");
      marker.textContent = "⏳";
      const text = document.createElement("span");
      const teamA = (currentInvite.teamA || []).map((x) => `${x.displayName}${x.status === "Accepted" ? " ✅" : " ⏳"}`).join(", ");
      const teamB = (currentInvite.teamB || []).map((x) => `${x.displayName}${x.status === "Accepted" ? " ✅" : " ⏳"}`).join(", ");
      text.textContent = `VANTANDE GRUPPFIGHT ${currentInvite.weekName} / ${languageDisplayName(currentInvite.answerLanguage || "english")}: A[${teamA}] vs B[${teamB}]`;
      li.append(marker, text, document.createElement("span"));
      elements.challengeInboxList.append(li);
    }

    if (!elements.challengeInboxList.children.length) {
      elements.challengeInboxList.innerHTML = "<li>Inga nya utmaningar.</li>";
    }
  }

  async function openDuelMatch(matchId) {
    stopGroupBattle("");
    appState.duel.active = true;
    appState.duel.matchId = matchId;
    state.bossMode = false;
    state.fortressMode = false;
    await refreshDuelState();
  }

  async function refreshDuelState() {
    const response = await fetch("/api/duel/current", {
      headers: appState.auth.isAuthenticated ? {} : {
        "X-Guest-Session": getGuestSessionId(),
        "X-Guest-Name": (elements.guestNameInput.value || appState.selectedUserId || "GÄST").trim(),
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        appState.duel.active = false;
        appState.duel.matchId = null;
      }
      return;
    }
    const data = await response.json();
    const match = data.match;
    if (!match) {
      appState.duel.active = false;
      appState.duel.matchId = null;
      appState.duel.prepEndsAtMs = 0;
      appState.duel.prepMatchId = null;
      appState.duel.visualMatchId = null;
      appState.duel.lastSyncPlayerHp = null;
      appState.duel.lastSyncEnemyHp = null;
      if (bossFightEngine && !state.bossMode && !state.fortressMode && !appState.groupBattle.active) {
        bossFightEngine.setMode("idle");
        bossFightEngine.setDuelPrepEndsAt(0);
      }
      return;
    }

    if (!appState.duel.initialPollDone) {
      appState.duel.initialPollDone = true;
      return;
    }
    appState.duel.active = match.status === "Active";
    appState.duel.matchId = match.id;
    appState.duel.weekId = match.weekId;
    appState.duel.totalWords = match.totalWords;
    const prepEndRaw = match.prepEndsUtc || (match.createdUtc ? new Date(new Date(match.createdUtc).getTime() + 10000).toISOString() : null);
    if (prepEndRaw) {
      const prepEndMs = new Date(prepEndRaw).getTime();
      appState.duel.prepEndsAtMs = Number.isFinite(prepEndMs) ? prepEndMs : 0;
      appState.duel.prepMatchId = match.id;
    } else if (appState.duel.prepMatchId !== match.id) {
      appState.duel.prepEndsAtMs = 0;
      appState.duel.prepMatchId = match.id;
    }
    if (bossFightEngine) {
      bossFightEngine.setDuelPrepEndsAt(appState.duel.prepEndsAtMs);
    }
    if (appState.duel.visualMatchId !== match.id) {
      appState.selectedWeekId = match.weekId;
      buildSelectOptions();
      loadState();
    }
    const myId = appState.auth.linkedProfileId || `guest:${getGuestSessionId()}`;
    const isChallenger = myId === match.challengerProfileId;
    const myHp = isChallenger ? match.challengerHp : match.opponentHp;
    const enemyHp = isChallenger ? match.opponentHp : match.challengerHp;
    const myCorrect = isChallenger ? match.challengerCorrect : match.opponentCorrect;
    const myMult = isChallenger ? match.challengerDamageMultiplier : match.opponentDamageMultiplier;
    appState.duel.myCorrect = myCorrect;
    appState.duel.myMultiplier = myMult;

    const weekLevel = resolveWeekLevelAndProgress(match.weekId).level;
    state.playerMaxHp = 100 + Math.max(0, weekLevel - 1) * 10;
    state.bossMaxHp = 100;
    state.playerHp = Math.round((myHp / 100) * state.playerMaxHp);
    state.bossHp = Math.round(enemyHp);

    if (bossFightEngine) {
      if (appState.duel.visualMatchId !== match.id) {
        bossFightEngine.startDuelMode({
          playerLevel: weekLevel,
          enemyLevel: 1,
          playerMaxHp: state.playerMaxHp,
          enemyMaxHp: state.bossMaxHp,
          playerHp: state.playerHp,
          enemyHp: state.bossHp,
        });
        appState.duel.visualMatchId = match.id;
      } else {
        const prevMy = appState.duel.lastSyncPlayerHp;
        const prevEnemy = appState.duel.lastSyncEnemyHp;
        if (prevEnemy != null && state.bossHp < prevEnemy) {
          if (appState.duel.pendingEnemyVisualShots > 0) {
            appState.duel.pendingEnemyVisualShots -= 1;
          } else {
            const ratio = Math.max(0.06, Math.min(0.95, (prevEnemy - state.bossHp) / Math.max(1, state.bossMaxHp)));
            bossFightEngine.duelShotToEnemy(ratio);
          }
        }
        if (prevMy != null && state.playerHp < prevMy) {
          const ratio = Math.max(0.06, Math.min(0.95, (prevMy - state.playerHp) / Math.max(1, state.playerMaxHp)));
          bossFightEngine.duelShotToPlayer(ratio);
        }
        bossFightEngine.setDuelHp(state.playerHp, state.bossHp, state.playerMaxHp, state.bossMaxHp);
      }
    }
    appState.duel.lastSyncPlayerHp = state.playerHp;
    appState.duel.lastSyncEnemyHp = state.bossHp;
    elements.bossName.textContent = isChallenger ? match.opponentName : match.challengerName;
    elements.bossTimerText.textContent = `Duel - glosor ${myCorrect}/${match.totalWords} | x${myMult}`;
    elements.bossWordsLeftText.textContent = `Glosor kvar: ${Math.max(0, match.totalWords - myCorrect)}`;
    if (appState.duel.prepEndsAtMs > Date.now()) {
      if (state.currentWord) {
        setQuestion(null, { focus: false, emptyText: "Gor dig redo - fighten startar snart..." });
      }
    } else if (!state.currentWord) {
      setQuestion(pickWord());
    }
    renderStats();

    if (match.status !== "Active") {
      appState.duel.active = false;
      appState.duel.prepEndsAtMs = 0;
      appState.duel.prepMatchId = null;
      appState.duel.visualMatchId = null;
      appState.duel.lastSyncPlayerHp = null;
      appState.duel.lastSyncEnemyHp = null;
      const won = match.winnerProfileId && match.winnerProfileId === myId;
      elements.feedbackText.className = won ? "feedback good" : "feedback bad";
      elements.feedbackText.textContent = won ? "Du vann duellen!" : "Du forlorade duellen.";
      pushLog(won ? "Duel vunnen." : "Duel forlorad.");
    }
  }

  function buildSelectOptions() {
    const previousWeek = appState.selectedWeekId;
    const visibleWeeks = filteredWeeks();

    elements.userSelect.innerHTML = "";
    elements.weekSelect.innerHTML = "";

    if (appState.auth.isAuthenticated) {
      appState.users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        elements.userSelect.append(option);
      });
    }

    visibleWeeks.forEach((week) => {
      const option = document.createElement("option");
      option.value = week.id;
      option.textContent = `${week.weekName} (${(week.words || []).length})`;
      elements.weekSelect.append(option);
    });

    if (appState.auth.isAuthenticated) {
      elements.userSelect.value = appState.selectedUserId;
    }

    const stillExists = visibleWeeks.some((w) => w.id === appState.selectedWeekId);
    if (!stillExists) {
      appState.selectedWeekId = (visibleWeeks[0] && visibleWeeks[0].id) || "";
      saveSelectedWeek();
    }
    elements.weekSelect.value = appState.selectedWeekId;
    syncAnswerLanguageFromCurrentWeek();
  }

  function buildBossOptions() {
    elements.bossSelect.innerHTML = "";
    bossRoster.forEach((boss) => {
      const option = document.createElement("option");
      option.value = boss.id;
      option.textContent = `${boss.name} (${boss.difficultyLabel})`;
      elements.bossSelect.append(option);
    });
    elements.bossSelect.value = appState.bossFight.selectedBossId;
  }

  async function reloadWeeksAndUi() {
    await loadData();
    buildAppLanguageOptions();
    buildSelectOptions();
    buildLeaderboardWeekOptions();
    renderWeeksOverview();
    await loadLeaderboard();
    setQuestion(pickWord());
  }

  async function saveSelection() {
    if (!appState.auth.isAuthenticated) {
      return;
    }

    const response = await fetch("/api/vocab/selection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekId: appState.selectedWeekId }),
    });

    if (!response.ok) {
      pushLog("Kunde inte spara valt vecka-lage.");
    }
  }


  async function parseWithAi() {
    const text = elements.aiInput.value.trim();
    const files = elements.aiFilesInput.files;
    const pastedFiles = appState.pastedFiles || [];
    if (!text && (!files || files.length === 0) && pastedFiles.length === 0) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = "Skriv text eller valj en bild/fil.";
      return;
    }

    elements.aiStatus.className = "feedback";
    elements.aiStatus.textContent = "AI laser underlag...";

    const formData = new FormData();
    formData.append("text", text);
    formData.append("targetLanguage", normalizeLanguage(elements.targetLanguageSelect?.value || appState.selectedLanguage || "english"));

    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        formData.append("files", files[i]);
      }
    }
    pastedFiles.forEach((file) => formData.append("files", file));

    const response = await fetch("/api/vocab/ai-parse-upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = data.error || "AI-lasning misslyckades.";
      return;
    }

    appState.parsedWords = Array.isArray(data.words) ? data.words : [];
    appState.detectedLanguage = data.detectedLanguage || "unknown";
    appState.suggestedWeekName = data.suggestedWeekName || "";

    elements.aiStatus.className = "feedback good";
    elements.aiStatus.textContent = `${appState.parsedWords.length} glosor tolkades. Sprak: ${appState.detectedLanguage}. Veckonamn: ${appState.suggestedWeekName || "-"}.`;
    appState.pastedFiles = [];
  }

  async function saveParsedToWeek() {
    if (!appState.auth.isAuthenticated) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = "Logga in for att spara glosor permanent.";
      return;
    }

    if (!appState.selectedWeekId) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = "Valj en vecka forst.";
      return;
    }

    if (!appState.parsedWords.length) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = "Inga AI-tolkade glosor att spara.";
      return;
    }

    const response = await fetch(`/api/vocab/weeks/${encodeURIComponent(appState.selectedWeekId)}/words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: currentWeek()?.language || appState.selectedLanguage || "english", words: appState.parsedWords }),
    });

    const data = await response.json();
    if (!response.ok) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = data.error || "Kunde inte spara veckan.";
      return;
    }

    await reloadWeeksAndUi();
    elements.aiStatus.className = "feedback good";
    elements.aiStatus.textContent = `Sparat ${appState.parsedWords.length} glosor i vald vecka.`;
    pushLog("AI-import sparad till vecka.");
  }

  async function createWeekFromAi() {
    if (!appState.auth.isAuthenticated) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = "Logga in for att skapa vecka.";
      return;
    }

    if (!appState.parsedWords.length) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = "Las glosor med AI forst.";
      return;
    }

    const weekName = (appState.suggestedWeekName || "").trim() || `Week ${new Date().getFullYear()}`;
    const response = await fetch("/api/vocab/weeks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekName, language: normalizeLanguage(elements.targetLanguageSelect?.value || appState.selectedLanguage || "english"), words: appState.parsedWords }),
    });

    const data = await response.json();
    if (!response.ok) {
      elements.aiStatus.className = "feedback bad";
      elements.aiStatus.textContent = data.error || "Kunde inte skapa vecka.";
      return;
    }

    appState.selectedWeekId = data.weekId;
    await reloadWeeksAndUi();

    elements.aiStatus.className = "feedback good";
    elements.aiStatus.textContent = `Ny vecka skapad: ${weekName}`;
  }

  function renderWeeksOverview() {
    elements.weeksOverview.innerHTML = "";

    filteredWeeks().forEach((week) => {
      const wrapper = document.createElement("div");
      wrapper.style.border = "1px solid #d7e5f8";
      wrapper.style.borderRadius = "12px";
      wrapper.style.padding = "0.8rem";
      wrapper.style.marginBottom = "0.8rem";

      const title = document.createElement("input");
      title.value = week.weekName || "";
      title.style.width = "100%";
      title.style.marginBottom = "0.5rem";

      const textarea = document.createElement("textarea");
      textarea.rows = 5;
      textarea.style.width = "100%";
      textarea.value = (week.words || []).map((w) => `${w.sv} - ${w.en}`).join("\n");

      const actions = document.createElement("div");
      actions.style.display = "flex";
      actions.style.gap = "0.5rem";
      actions.style.flexWrap = "wrap";
      actions.style.marginTop = "0.5rem";

      const selectBtn = document.createElement("button");
      selectBtn.type = "button";
      selectBtn.textContent = "Valj";
      selectBtn.addEventListener("click", async () => {
        appState.selectedWeekId = week.id;
        buildSelectOptions();
        await saveSelection();
        setQuestion(pickWord());
      });

      const saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.textContent = "Spara";
      saveBtn.disabled = !appState.auth.isAuthenticated;
      saveBtn.addEventListener("click", async () => {
        const words = parseWordLines(textarea.value);
        const response = await fetch(`/api/vocab/weeks/${encodeURIComponent(week.id)}/words`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weekName: title.value, language: week.language || appState.selectedLanguage || "english", words }),
        });

        if (!response.ok) {
          const data = await response.json();
          alert(data.error || "Kunde inte spara veckan.");
          return;
        }

        await reloadWeeksAndUi();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "ghost";
      deleteBtn.textContent = "Ta bort vecka";
      deleteBtn.disabled = !appState.auth.isAuthenticated;
      deleteBtn.addEventListener("click", async () => {
        if (!confirm(`Ta bort ${title.value}?`)) {
          return;
        }

        const response = await fetch(`/api/vocab/weeks/${encodeURIComponent(week.id)}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const data = await response.json();
          alert(data.error || "Kunde inte ta bort veckan.");
          return;
        }

        await reloadWeeksAndUi();
      });

      const flipBtn = document.createElement("button");
      flipBtn.type = "button";
      flipBtn.className = "ghost";
      flipBtn.textContent = "Vänd ordning";
      flipBtn.disabled = !appState.auth.isAuthenticated;
      flipBtn.addEventListener("click", async () => {
        const flipped = (week.words || []).map((w) => ({ sv: w.en, en: w.sv }));
        const response = await fetch(`/api/vocab/weeks/${encodeURIComponent(week.id)}/words`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weekName: title.value, language: week.language || appState.selectedLanguage || "english", words: flipped }),
        });
        if (!response.ok) {
          alert("Kunde inte vända ordningen.");
          return;
        }
        await reloadWeeksAndUi();
      });

      actions.append(selectBtn, saveBtn, flipBtn, deleteBtn);
      wrapper.append(title, textarea, actions);
      elements.weeksOverview.append(wrapper);
    });
  }

  function addTempWords() {
    if (!appState.selectedWeekId) {
      elements.tempWordsStatus.className = "feedback bad";
      elements.tempWordsStatus.textContent = "Valj en vecka forst.";
      return;
    }

    const parsed = parseWordLines(elements.tempWordsInput.value);
    if (!parsed.length) {
      elements.tempWordsStatus.className = "feedback bad";
      elements.tempWordsStatus.textContent = "Kunde inte hitta glospar i texten.";
      return;
    }

    if (!appState.tempWordsByWeek[appState.selectedWeekId]) {
      appState.tempWordsByWeek[appState.selectedWeekId] = [];
    }

    appState.tempWordsByWeek[appState.selectedWeekId].push(...parsed);
    elements.tempWordsStatus.className = "feedback good";
    elements.tempWordsStatus.textContent = `${parsed.length} temporara glosor tillagda (endast denna session).`;
    elements.tempWordsInput.value = "";
    setQuestion(pickWord());
  }

  function hookEvents() {
    if (elements.appLanguageSelect) {
      elements.appLanguageSelect.addEventListener("change", async () => {
        appState.selectedLanguage = normalizeLanguage(elements.appLanguageSelect.value || "english");
        saveSelectedLanguage();
        buildSelectOptions();
        saveSelectedWeek();
        buildLeaderboardWeekOptions();
        renderCastleTree();
        renderWeeksOverview();
        initTrainQueue();
        await saveSelection();
        await loadLeaderboard();
        setQuestion(pickWord());
      });
    }
    if (elements.groupFightLanguageSelect) {
      elements.groupFightLanguageSelect.addEventListener("change", () => {
        appState.groupFight.answerLanguage = normalizeLanguage(elements.groupFightLanguageSelect.value || "english");
        appState.selectedLanguage = appState.groupFight.answerLanguage;
        saveSelectedLanguage();
        buildAppLanguageOptions();
        buildSelectOptions();
        buildLeaderboardWeekOptions();
        buildGroupFightWeekOptions();
        renderGroupFightPopup();
      });
    }
    if (elements.groupFightWeekSelect) {
      elements.groupFightWeekSelect.addEventListener("change", () => {
        appState.selectedWeekId = elements.groupFightWeekSelect.value || "";
        syncAnswerLanguageFromCurrentWeek();
        renderGroupFightPopup();
      });
    }
    if (elements.createGroupFightButton) {
      elements.createGroupFightButton.addEventListener("click", () => {
        openGroupFightPopup();
      });
    }
    if (elements.groupFightCancelButton) {
      elements.groupFightCancelButton.addEventListener("click", () => {
        closeGroupFightPopup();
      });
    }
    if (elements.groupFightPopup) {
      elements.groupFightPopup.addEventListener("click", (event) => {
        if (event.target === elements.groupFightPopup) {
          closeGroupFightPopup();
        }
      });
    }
    if (elements.groupFightCreateButton) {
      elements.groupFightCreateButton.addEventListener("click", async () => {
        if (appState.groupFight.readOnly && appState.groupInvite.current?.id) {
          const accepted = await respondGroupFightInvite(appState.groupInvite.current.id, true);
          if (accepted) {
            elements.feedbackText.className = "feedback good";
            elements.feedbackText.textContent = "Du har accepterat gruppfighten.";
            closeGroupFightPopup();
          }
          return;
        }

        try {
          const summaryTeam = (list, team) => (list || []).map((u) => ({
            actorId: u.profileId || (u.sessionId ? `guest:${u.sessionId}` : u.id || u.actorId || ""),
            displayName: u.name || u.displayName || "Spelare",
            status: team === "A" && normalize(u.name || "") === normalize(getActorName()) ? "Accepted" : "Pending",
            isBot: !!u.isBot,
          }));
          const inviteId = await createGroupFightInvite();
          appState.groupInvite.current = {
            id: inviteId,
            weekId: appState.selectedWeekId,
            weekName: (currentWeek() && currentWeek().weekName) || "Okänd vecka",
            answerLanguage: normalizeLanguage(appState.groupFight.answerLanguage || appState.selectedLanguage || "english"),
            status: "Pending",
            teamA: summaryTeam(appState.groupFight.teamA, "A"),
            teamB: summaryTeam(appState.groupFight.teamB, "B"),
          };
          elements.feedbackText.className = "feedback good";
          elements.feedbackText.textContent = "Gruppfight skapad. Väntar på svar...";
          pushLog(`Gruppfight-inbjudan skapad (${inviteId}).`);
          closeGroupFightPopup();
          await pollGroupFightCurrent();
          await pollChallengeInbox();
        } catch (error) {
          elements.feedbackText.className = "feedback bad";
          elements.feedbackText.textContent = error instanceof Error ? error.message : "Kunde inte skapa gruppfight.";
        }
      });
    }

    elements.userSelect.addEventListener("change", () => {
      appState.selectedUserId = elements.userSelect.value;
      loadState();
      renderStats();
      updateGroupBattleBoard();
      setQuestion(pickWord());
      pushLog("Anvandare bytt.");
    });

    elements.guestNameInput.addEventListener("input", () => {
      if (appState.auth.isAuthenticated) {
        return;
      }

      const guestName = (elements.guestNameInput.value || "").trim();
      appState.selectedUserId = guestName || "guest";
      localStorage.setItem(guestNameKey(), guestName);
      loadState();
      renderStats();
      setQuestion(pickWord(), { focus: false });
      sendHeartbeat();
      loadOnlineUsers();
    });

    elements.weekSelect.addEventListener("change", async () => {
      appState.selectedWeekId = elements.weekSelect.value;
      saveSelectedWeek();
      syncAnswerLanguageFromCurrentWeek();
      await saveSelection();
      loadState();
      initTrainQueue();
      renderStats();
      await loadLeaderboard();
      renderCastleTree();
      setQuestion(pickWord());
      const week = currentWeek();
      pushLog(`Vecka bytt till ${week ? week.weekName : "okand"}.`);
    });

    if (elements.leaderboardWeekSelect) {
      elements.leaderboardWeekSelect.addEventListener("change", async () => {
        await loadLeaderboard();
      });
    }

    if (elements.playerAvatarSelect) {
      elements.playerAvatarSelect.addEventListener("change", () => {
        appState.selectedPlayerImage = elements.playerAvatarSelect.value;
        localStorage.setItem(playerAvatarKey(), appState.selectedPlayerImage || "");
        renderPlayerAvatarPreview();
        saveAvatarToServer();
      });
    }

    elements.bossSelect.addEventListener("change", () => {
      appState.bossFight.selectedBossId = elements.bossSelect.value;
      if (bossFightEngine) {
        bossFightEngine.setPreviewBoss(appState.bossFight.selectedBossId);
      }
      if (state.bossMode && bossFightEngine) {
        bossFightEngine.startRound(appState.bossFight.selectedBossId, appState.bossFight.durationSec, () => {
          if (!state.bossMode) {
            return;
          }
          state.playerHp = 0;
          state.streak = 0;
          state.bossMode = false;
          bossFightEngine.bossShot();
          bossFightEngine.playerHit();
          elements.feedbackText.className = "feedback bad";
          elements.feedbackText.textContent = "Bossen hann fram till dig. Bossfighten avbryts.";
          pushLog("Bossen kraschade in i spelaren.");
          renderStats();
        });
      }
      renderStats();
    });

    elements.soundToggleButton.addEventListener("click", () => {
      appState.settings.soundEnabled = !appState.settings.soundEnabled;
      if (appState.settings.soundEnabled) {
        const ctx = getAudioContext();
        if (ctx && ctx.state === "suspended") {
          ctx.resume();
        }
      }
      saveSettings();
      renderSoundToggle();
    });

    if (elements.flipDirectionButton) {
      elements.flipDirectionButton.addEventListener("click", () => {
        appState.flippedDirection = !appState.flippedDirection;
        renderFlipButton();
        renderQuestionLabel();
        if (state.currentWord) {
          elements.questionWord.textContent = questionTextForWord(state.currentWord);
        }
      });
    }

    elements.nextWordButton.addEventListener("click", () => {
      if (!state.bossMode && !state.fortressMode && !appState.duel.active && !appState.groupBattle.active && state.trainQueue.length > 1) {
        const skipped = state.trainQueue.shift();
        state.trainQueue.push(skipped);
      }
      setQuestion(pickWord());
    });

    if (elements.resetSessionButton) {
      elements.resetSessionButton.addEventListener("click", () => {
        location.reload();
      });
    }

    if (elements.trainModeButton) {
      elements.trainModeButton.addEventListener("click", () => {
        stopGroupBattle("");
        state.bossMode = false;
        state.fortressMode = false;
        if (bossFightEngine) {
          bossFightEngine.setMode("idle");
        }
        initTrainQueue();
        elements.feedbackText.className = "feedback good";
        elements.feedbackText.textContent = "Träningsläge aktivt. Svara på glosorna för att öva.";
        setQuestion(pickWord());
        renderStats();
        pushLog("Träningsläge valt via huvudknappen.");
      });
    }

    if (elements.fortressModeButton) {
      elements.fortressModeButton.addEventListener("click", () => {
        stopGroupBattle("");
        state.fortressMode = !state.fortressMode;
        if (state.fortressMode) {
          state.bossMode = false;
          appState.fortress.roundIndex = 0;
          if (!startFortressMode()) {
            return;
          }
          pushLog("Byggförsvar startat. Rätt glosa släpper ner ett block.");
        } else {
          if (bossFightEngine) {
            bossFightEngine.setMode("idle");
          }
          pushLog("Byggförsvar avslutat.");
        }
        renderStats();
      });
    }

    elements.toggleModeButton.addEventListener("click", () => {
      stopGroupBattle("");
      state.bossMode = !state.bossMode;
      if (state.bossMode) {
        state.fortressMode = false;
        appState.bossFight.roundIndex = 0;
        if (bossFightEngine) {
          bossFightEngine.reset();
        }
        if (!startBossRound()) {
          return;
        }
        pushLog(`Bossfight startad mot ${elements.bossSelect.options[elements.bossSelect.selectedIndex].text}.`);
      } else {
        if (bossFightEngine) {
          bossFightEngine.setMode("idle");
        }
        pushLog("Bossfight avslutad.");
      }
      renderStats();
    });

    elements.answerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!state.currentWord) {
        return;
      }
      if (normalize(elements.answerInput.value) === normalize(expectedAnswerForCurrentWord())) {
        onCorrect();
      } else {
        onWrong();
      }
    });

    elements.hintButton.addEventListener("click", () => {
      if (!state.currentWord || !spendCoins(15)) {
        return;
      }

      const answer = expectedAnswerForCurrentWord();
      const hint = answer.length <= 2 ? `${answer[0]}_` : `${answer.slice(0, 2)}${"_".repeat(answer.length - 2)}`;
      elements.hintText.textContent = `Hint: ${hint}`;
      renderStats();
    });

    elements.healButton.addEventListener("click", () => {
      if (!spendCoins(20)) {
        return;
      }
      state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 35);
      pushLog("Du anvande Heal.");
      renderStats();
    });

    elements.doubleButton.addEventListener("click", () => {
      if (!spendCoins(25)) {
        return;
      }
      state.doubleHitReady = true;
      elements.feedbackText.className = "feedback good";
      elements.feedbackText.textContent = "Double Hit är laddad till nästa rätt svar.";
      renderStats();
    });


    elements.resetButton.addEventListener("click", () => {
      state = { ...defaultState };
      localStorage.removeItem(stateKey());
      if (bossFightEngine) {
        bossFightEngine.reset();
      }
      pushLog("All progression är nollställd för vald användare/vecka.");
      renderStats();
      setQuestion(pickWord());
    });

    elements.aiParseButton.addEventListener("click", async () => {
      await parseWithAi();
    });

    elements.aiSaveButton.addEventListener("click", async () => {
      await saveParsedToWeek();
    });

    elements.aiCreateWeekButton.addEventListener("click", async () => {
      await createWeekFromAi();
    });

    elements.tempWordsAddButton.addEventListener("click", () => {
      addTempWords();
    });

    elements.aiInput.addEventListener("drop", (event) => {
      event.preventDefault();
      const dt = event.dataTransfer;
      if (!dt) {
        return;
      }

      if (dt.files && dt.files.length > 0) {
        appState.pastedFiles = [...appState.pastedFiles, ...Array.from(dt.files)];
        elements.aiStatus.className = "feedback good";
        elements.aiStatus.textContent = `${appState.pastedFiles.length} inklistrade/slappta filer klara for AI-lasning.`;
        return;
      }

      const text = dt.getData("text");
      if (text) {
        elements.aiInput.value = text;
      }
    });

    elements.aiInput.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    document.addEventListener("paste", (event) => {
      if (!event.clipboardData) {
        return;
      }
      const files = Array.from(event.clipboardData.files || []).filter((f) => f.type.startsWith("image/"));
      if (!files.length) {
        return;
      }
      event.preventDefault();
      appState.pastedFiles = [...appState.pastedFiles, ...files];
      elements.aiStatus.className = "feedback good";
      elements.aiStatus.textContent = `${appState.pastedFiles.length} bild(er) inklistrade via Ctrl+V.`;
    });
  }

  async function start() {
    try {
      ensureDynamicControls();
      ensureWordsProgressElements();
      bossFightEngine = createBossFightEngine(elements.bossFightCanvas);
      await loadAuthStatus();
      loadSelectedLanguage();
      await loadData();
      await loadPlayers();
      await ensureGuestDisplayName();
      if (!appState.auth.isAuthenticated && !appState.selectedUserId) {
        appState.selectedUserId = "guest";
      }
      buildAppLanguageOptions();
      buildSelectOptions();
      buildLeaderboardWeekOptions();
      buildBossOptions();
      buildPlayerOptions();
      loadSettings();
      renderSoundToggle();
      renderFlipButton();
      renderSpecialChars();
      renderWeeksOverview();
      await loadLeaderboard();
      try { await loadWeekStats(); } catch {}
      renderCastleTree();
      applyAuthUi();
      loadState();
      hookEvents();
      try { await sendHeartbeat(); } catch {}
      try { await loadOnlineUsers(); } catch {}
      try { await pollChallengeInbox(); } catch {}
      try { await pollGroupFightCurrent(); } catch {}
      try { await refreshDuelState(); } catch {}
      window.setInterval(() => {
        if (state.bossMode || state.fortressMode || appState.groupBattle.active || appState.duel.active) {
          updateBars();
        }
      }, 100);
      window.setInterval(() => {
        updateDuelPrepOverlay();
        updateGroupBattlePrep();
      }, 200);
      window.setInterval(async () => {
        try { await sendHeartbeat(); } catch {}
        try { await loadOnlineUsers(); } catch {}
        try { await loadWeekStats(); } catch {}
      }, 15000);
      window.setInterval(async () => {
        try { await pollChallengeInbox(); } catch {}
        try { await pollGroupFightCurrent(); } catch {}
        if (!appState.duel.active) {
          try { await refreshDuelState(); } catch {}
        }
      }, 1000);
      window.setInterval(async () => {
        if (!appState.groupBattle.active) {
          return;
        }
        try { await pollGroupFightEvents(); } catch {}
      }, 350);
      window.setInterval(async () => {
        if (!appState.duel.active || !appState.duel.matchId) {
          return;
        }
        try { await refreshDuelState(); } catch {}
      }, 250);
      renderStats();
      setQuestion(null, { focus: false, emptyText: "Välj en vecka och börja svara på glosorna." });
      pushLog("GlosTrainer är redo.");
    } catch (error) {
      elements.questionWord.textContent = "Kunde inte ladda glosdatabasen.";
      elements.feedbackText.className = "feedback bad";
      elements.feedbackText.textContent = error instanceof Error ? error.message : "Okant fel.";
    }
  }

  start();
})();
