(function () {
  const GAME_VERSION = "1.9.1";

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
    siegeCanvasInput: document.getElementById("siegeCanvasInput"),
    siegeAnswerForm: document.getElementById("siegeAnswerForm"),
    siegeAnswerInput: document.getElementById("siegeAnswerInput"),
    siegeSpecialCharsRow: document.getElementById("siegeSpecialCharsRow"),
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
    startSiegeButton: document.getElementById("startSiegeButton"),
    startAdventureButton: document.getElementById("startAdventureButton"),
    combatPanel: document.getElementById("combatPanel"),
    heroPanel: document.getElementById("heroPanel"),
    controlsPanel: document.getElementById("controlsPanel"),
    questionPanel: document.getElementById("questionPanel"),
    mainCanvasShell: document.getElementById("mainCanvasShell"),
    teacherCodeInput: document.getElementById("teacherCodeInput"),
    teacherCodeForm: document.getElementById("teacherCodeForm"),
    teacherCodeField: document.getElementById("teacherCodeField"),
    teacherCodeError: document.getElementById("teacherCodeError"),
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
    // Start with black screen immediately
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const arena = {
      mode: "boot",
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
      siege: {
        active: false,
        playerCastleHp: 200,
        playerCastleMaxHp: 200,
        enemyCastleHp: 200,
        enemyCastleMaxHp: 200,
        playerSoldiers: [],
        enemySoldiers: [],
        lastPlayerSpawnMs: 0,
        lastEnemySpawnMs: 0,
        spawnIntervalMs: 5000,
        glosaText: null,
        glosaFeedback: null,
        enemyFeed: [],
        gameOver: false,
        winner: null,
        onGameOver: null,
        frameCount: 0,
        gameOverButtons: null,
        answerText: "",
        answerActive: false,
        countdownEndsAt: 0,
        defeatAnim: null,
        victoryAnim: null,
        stuckArrows: [],
        arrows: [],
        isGroupFight: false,
        bossArmy: ["soldier"],
        selectedBossId: "oiia",
        totalWords: 0,
        answeredWords: 0,
        correctWords: 0,
      },
      adventure: {
        active: false,
        phase: "idle",        // idle, vocab, actionSelect, playerTurn, enemyTurn, victory, defeat
        heroes: [],           // [{name, hp, maxHp, defending, specialCharge, actionChoice}]
        boss: null,           // {name, hp, maxHp, sprite, size}
        turnTimer: 0,         // countdown ms
        turnTimerStart: 0,
        turnDuration: 8000,
        currentGlosa: null,
        answerText: "",
        answerResults: [],    // [{heroIndex, correct}]
        actionMenuHero: -1,   // which hero is choosing action
        actionBtnBounds: [],  // clickable action button rects
        menuBtnBounds: null,
        particles: [],
        damageNumbers: [],
        flashEffect: null,
        roundNumber: 0,
        bossAttackTarget: -1,
        bossAttackAnim: 0,
        playerAttackAnim: 0,
        playerAttackHero: -1,
        animCallback: null,
        wordQueue: [],
        wrongQueue: [],
      },
      bootStartMs: performance.now(),
      bootDone: false,
      menu: {
        weeks: [],
        languages: [],
        selectedLanguage: "english",
        selectedWeekId: null,
        selectedTab: "play",
        stats: { level: 1, xp: 0, xpNext: 100, coins: 0, streak: 0 },
        scrollOffset: 0,
        hoveredItem: null,
        guestName: "",
        buttons: [],
        leaderboard: [],
        weekStats: [],
        teacherCode: "",
        teacherMsg: "",
        teacherMsgColor: "#00aa00",
        teacherTyping: false,
        nameEditing: false,
        nameBuffer: "",
        selectedBossId: "oiia",
        pendingChallenges: [],
      },
    };

    const SIEGE_PS = 3;
    const SIEGE_GROUND_Y = 96;
    const SIEGE_CASTLE_W = 28;
    const SIEGE_CASTLE_H = 22;
    const SIEGE_LEFT_CASTLE_X = 4;
    const SIEGE_RIGHT_CASTLE_X = 300 - 4 - SIEGE_CASTLE_W;
    const SIEGE_SOLDIER_SPAWN_LEFT = SIEGE_LEFT_CASTLE_X + SIEGE_CASTLE_W + 2;
    const SIEGE_SOLDIER_SPAWN_RIGHT = SIEGE_RIGHT_CASTLE_X - 2;
    const SIEGE_SOLDIER_SPEED = 0.35;
    const SIEGE_SOLDIER_MAX_HP = 20;
    const SIEGE_SOLDIER_DMG = 4;
    const SIEGE_CASTLE_DMG = 15;
    const SIEGE_ATTACK_COOLDOWN = 36;

    // Bosses ordered easy→hard. Each has unique army theme + colors.
    const SIEGE_BOSSES = [
      { id: "oiia", name: "OIIA Cat", icon: "🐱", skulls: 1, accuracy: 0.40, spawnMs: 5000,
        theme: "cat", army: ["grunt", "grunt", "grunt", "grunt", "grunt", "grunt", "grunt", "grunt", "grunt", "boss"],
        colors: { armor: "#c08040", armorLight: "#d0a060", helmet: "#a07030", helmetLight: "#c09050", shield: "#906020", shieldLight: "#b08040", boots: "#5a3a1a", crest: "#e0a040" } },
      { id: "keyboard", name: "Keyboard Cat", icon: "🎹", skulls: 2, accuracy: 0.50, spawnMs: 4500,
        theme: "wolf", army: ["grunt", "grunt", "grunt", "archer", "grunt", "grunt", "grunt", "archer", "grunt", "boss"],
        colors: { armor: "#505060", armorLight: "#707080", helmet: "#404050", helmetLight: "#606070", shield: "#383848", shieldLight: "#505060", boots: "#2a2a30", crest: "#8080a0" } },
      { id: "grumpy", name: "Grumpy Cat", icon: "😾", skulls: 3, accuracy: 0.60, spawnMs: 3500,
        theme: "zombie", army: ["grunt", "grunt", "knight", "grunt", "grunt", "archer", "grunt", "grunt", "knight", "boss"],
        colors: { armor: "#406030", armorLight: "#508040", helmet: "#305020", helmetLight: "#407030", shield: "#2a4018", shieldLight: "#386028", boots: "#1a2a0e", crest: "#60a040" } },
      { id: "klara", name: "Klara G", icon: "🏥", skulls: 6, accuracy: 0.58, spawnMs: 3800,
        theme: "nurse", army: ["grunt", "grunt", "ambulance", "grunt", "archer", "grunt", "ambulance", "grunt", "grunt", "boss"],
        colors: { armor: "#ffffff", armorLight: "#e8f0ff", helmet: "#ff4060", helmetLight: "#ff6080", shield: "#f0f0f0", shieldLight: "#ffffff", boots: "#ffffff", crest: "#ff4060" } },
      { id: "nyan", name: "Nyan Cat", icon: "🌈", skulls: 4, accuracy: 0.70, spawnMs: 3000,
        theme: "skeleton", army: ["grunt", "knight", "grunt", "archer", "grunt", "knight", "archer", "grunt", "knight", "boss"],
        colors: { armor: "#606068", armorLight: "#808088", helmet: "#505058", helmetLight: "#707078", shield: "#404048", shieldLight: "#606068", boots: "#303038", crest: "#a0a0b0" } },
      { id: "dino", name: "Chrome Dino", icon: "🦕", skulls: 5, accuracy: 0.85, spawnMs: 2500,
        theme: "dino", army: ["grunt", "knight", "archer", "knight", "grunt", "knight", "archer", "knight", "knight", "boss"],
        colors: { armor: "#3a3a3a", armorLight: "#5a5a5a", helmet: "#2a2a2a", helmetLight: "#4a4a4a", shield: "#1a1a1a", shieldLight: "#3a3a3a", boots: "#1a1a1a", crest: "#808080" } },
    ];

    bossRoster.forEach((boss) => {
      if (!boss.imageUrl) {
        return;
      }
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = boss.imageUrl;
      arena.images[boss.id] = image;
    });

    // Adventure mode FFRK boss sprites
    const ADV_BOSS_SPRITES = {
      oiia:     "/images/bosses/adventure/shadow.png",
      keyboard: "/images/bosses/adventure/kadaj.png",
      grumpy:   "/images/bosses/adventure/yazoo.png",
      klara:    "/images/bosses/adventure/adel.png",
      nyan:     "/images/bosses/adventure/sephiroth.png",
      dino:     "/images/bosses/adventure/bahamut.png",
    };
    // Preload adventure boss images
    Object.entries(ADV_BOSS_SPRITES).forEach(([id, url]) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      arena.images["adv_" + id] = img;
    });

    // Adventure hero sprites (Cloud FFRK)
    const ADV_HERO_SPRITES = {
      idle:  "/images/players/adventure/cloud-idle.png",
      body:  "/images/players/adventure/cloud-body.png",
      sword: "/images/players/adventure/cloud-sword.png",
    };
    Object.entries(ADV_HERO_SPRITES).forEach(([key, url]) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      arena.images["hero_" + key] = img;
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

    // ─── BOOT SEQUENCE ────────────────────────────────────────────────
    const bootCatOiia = new Image();
    bootCatOiia.src = "/images/bosses/spinning-oiia.gif";

    const bootLines = [
      { text: "GLOSTRAINER BIOS v4.2.0", delay: 0 },
      { text: "Copyright (C) 2024-2026 8bitcat Systems", delay: 200 },
      { text: "", delay: 300 },
      { text: "Detecting vocabulary modules...", delay: 500 },
      { text: "RAM: 640K OK", delay: 700 },
      { text: "Loading siege engine.......... OK", delay: 900 },
      { text: "Loading pixel renderer........ OK", delay: 1100 },
      { text: "Loading castle sprites........ OK", delay: 1300 },
      { text: "Loading soldier AI............ OK", delay: 1500 },
      { text: "Connecting to GlosTrainer network...", delay: 1800 },
      { text: "", delay: 2000 },
      { text: "ALL SYSTEMS OPERATIONAL", delay: 2200 },
      { text: "", delay: 2400 },
      { text: "Starting GLOSTRAINER...", delay: 2600 },
    ];
    const BOOT_DURATION = 3200;

    function drawBootMode() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);

      const elapsed = performance.now() - arena.bootStartMs;
      const lineH = 16;
      const startY = 30;

      ctx.save();
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "left";

      let visibleLines = 0;
      bootLines.forEach((line, i) => {
        if (elapsed >= line.delay) {
          visibleLines++;
          const flicker = elapsed - line.delay < 80 ? 0.5 + Math.random() * 0.5 : 1;
          ctx.globalAlpha = flicker;
          if (line.text === "ALL SYSTEMS OPERATIONAL") {
            ctx.fillStyle = "#00ff00";
          } else if (line.text.includes("OK")) {
            ctx.fillStyle = "#00cc00";
          } else if (line.text === "") {
            return;
          } else {
            ctx.fillStyle = "#00aa00";
          }
          ctx.fillText(line.text, 24, startY + i * lineH);
        }
      });

      // Progress bar
      if (elapsed > 400) {
        const barX = 24;
        const barY = startY + bootLines.length * lineH + 16;
        const barW = w - 48;
        const barH = 14;
        const progress = Math.min(1, (elapsed - 400) / (BOOT_DURATION - 600));

        ctx.globalAlpha = 1;
        ctx.fillStyle = "#003300";
        ctx.fillRect(barX, barY, barW, barH);
        ctx.strokeStyle = "#00aa00";
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barW, barH);
        ctx.fillStyle = "#00cc00";
        ctx.fillRect(barX + 2, barY + 2, (barW - 4) * progress, barH - 4);

        ctx.fillStyle = "#00aa00";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`[${Math.floor(progress * 100)}%]`, w / 2, barY + barH + 16);
      }

      // Blinking cursor
      if (Math.floor(elapsed / 500) % 2 === 0) {
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(24, startY + visibleLines * lineH + 2, 8, 12);
      }


      ctx.restore();
    }

    // ─── CANVAS MENU MODE ─────────────────────────────────────────────
    const MENU_TABS = [
      { id: "play", label: "SPELA" },
      { id: "fight", label: "FIGHT" },
      { id: "challenges", label: "UTMANINGAR" },
      { id: "leaderboard", label: "TOPP" },
      { id: "stats", label: "STATS" },
      { id: "levels", label: "NIVÅ" },
      { id: "teacher", label: "LÄRARE" },
    ];

    function drawMenuBackground() {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#0a0e18";
      ctx.fillRect(0, 0, w, h);
      // Pixel grid overlay
      ctx.strokeStyle = "rgba(30,60,100,0.12)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      // Stars
      for (let i = 0; i < 40; i++) {
        const sx = (i * 137 + 23) % w, sy = (i * 89 + 11) % (h * 0.7);
        const bright = 0.2 + Math.abs(Math.sin(arena.phase * 2 + i)) * 0.6;
        ctx.fillStyle = `rgba(100,160,255,${bright})`;
        ctx.fillRect(sx, sy, 2, 2);
      }
    }

    function drawMenuHeader(m) {
      const w = canvas.width;
      // Title bar
      ctx.fillStyle = "#0f1428";
      ctx.fillRect(0, 0, w, 68);
      ctx.strokeStyle = "#1a3060";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 68); ctx.lineTo(w, 68); ctx.stroke();
      // Title
      ctx.fillStyle = "#f0e040";
      ctx.font = "bold 26px monospace";
      ctx.textAlign = "left";
      ctx.fillText("GLOSTRAINER", 20, 32);
      ctx.fillStyle = "#4080c0";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`SIEGE EDITION  Ver. ${GAME_VERSION}`, 20, 46);
      // Stats
      ctx.textAlign = "right";
      ctx.fillStyle = "#80c0e0";
      ctx.font = "bold 11px monospace";
      ctx.fillText(`LVL ${m.stats.level}  |  XP ${m.stats.xp}/${m.stats.xpNext}  |  COINS ${m.stats.coins}  |  STREAK ${m.stats.streak}`, w - 20, 28);
      if (m.guestName) {
        ctx.fillStyle = "#6090b0";
        ctx.font = "bold 9px monospace";
        ctx.fillText(`SPELARE: ${m.guestName}`, w - 20, 44);
      }
      // Tabs
      const tabW = Math.floor((w - 40) / MENU_TABS.length);
      MENU_TABS.forEach((tab, i) => {
        const tx = 20 + i * tabW;
        const sel = tab.id === m.selectedTab;
        ctx.fillStyle = sel ? "#1a3060" : "#0a0e18";
        ctx.fillRect(tx, 50, tabW - 4, 18);
        ctx.strokeStyle = sel ? "#4080f0" : "#1a2a40";
        ctx.lineWidth = 1;
        ctx.strokeRect(tx, 50, tabW - 4, 18);
        ctx.fillStyle = sel ? "#f0f0f0" : "#506070";
        ctx.font = sel ? "bold 10px monospace" : "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(tab.label, tx + (tabW - 4) / 2, 63);
        // Notification badge for challenges
        if (tab.id === "challenges") {
          const challengeCount = (m.pendingChallenges || []).length;
          if (challengeCount > 0) {
            const badgeX = tx + tabW - 10, badgeY = 48;
            ctx.fillStyle = "#e02020";
            ctx.beginPath(); ctx.arc(badgeX, badgeY, 7, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "#ffffff"; ctx.font = "bold 8px monospace"; ctx.textAlign = "center";
            ctx.fillText(String(challengeCount), badgeX, badgeY + 3);
          }
        }
        m.buttons.push({ type: "tab", tabId: tab.id, x: tx, y: 50, w: tabW - 4, h: 18 });
      });
    }

    function drawPlayTab(m) {
      const w = canvas.width, contentY = 90;
      const half = Math.floor(w / 2);

      // Language selector
      const langs = m.languages.length ? m.languages : ["english"];
      const langTabW = 70, langTabH = 18;
      const langStartX = 20;
      langs.forEach((lang, i) => {
        const tx = langStartX + i * (langTabW + 3);
        const sel = lang === m.selectedLanguage;
        ctx.fillStyle = sel ? "#2050c0" : "#0f1a2a";
        ctx.fillRect(tx, contentY, langTabW, langTabH);
        ctx.strokeStyle = sel ? "#4080f0" : "#1a2a40";
        ctx.lineWidth = 1; ctx.strokeRect(tx, contentY, langTabW, langTabH);
        ctx.fillStyle = sel ? "#f0f0f0" : "#607080";
        ctx.font = "bold 8px monospace"; ctx.textAlign = "center";
        const dn = lang === "english" ? "ENGELSKA" : lang === "spanish" ? "SPANSKA" : lang === "french" ? "FRANSKA" : lang === "german" ? "TYSKA" : lang.toUpperCase();
        ctx.fillText(dn, tx + langTabW / 2, contentY + 13);
        m.buttons.push({ type: "lang", lang, x: tx, y: contentY, w: langTabW, h: langTabH });
      });

      // Left column: Week list
      const listX = 20, listY = contentY + 38, listW = half - 30, itemH = 20;
      const maxVis = Math.min(12, Math.floor((canvas.height - listY - 60) / itemH));
      const filtered = m.weeks.filter(wk => (wk.language || "english").toLowerCase() === m.selectedLanguage);

      ctx.fillStyle = "#506880"; ctx.font = "bold 9px monospace"; ctx.textAlign = "left";
      ctx.fillText("VÄLJ VECKA:", listX, listY - 4);

      ctx.fillStyle = "rgba(10,16,32,0.8)";
      ctx.fillRect(listX, listY, listW, maxVis * itemH + 4);
      ctx.strokeStyle = "#1a3050"; ctx.lineWidth = 1;
      ctx.strokeRect(listX, listY, listW, maxVis * itemH + 4);

      if (!filtered.length) {
        ctx.fillStyle = "#405060"; ctx.font = "11px monospace"; ctx.textAlign = "center";
        ctx.fillText("Inga veckor", listX + listW / 2, listY + 40);
      } else {
        const si = Math.max(0, Math.min(m.scrollOffset, filtered.length - maxVis));
        const ei = Math.min(filtered.length, si + maxVis);
        for (let i = si; i < ei; i++) {
          const wk = filtered[i], iy = listY + 2 + (i - si) * itemH;
          const sel = wk.id === m.selectedWeekId;
          ctx.fillStyle = sel ? "#1a3870" : "transparent";
          if (sel) ctx.fillRect(listX + 2, iy, listW - 4, itemH - 2);
          if (sel) { ctx.strokeStyle = "#4080f0"; ctx.lineWidth = 1; ctx.strokeRect(listX + 2, iy, listW - 4, itemH - 2); }
          ctx.fillStyle = sel ? "#f0f0f0" : "#b0c0d0";
          ctx.font = sel ? "bold 10px monospace" : "10px monospace"; ctx.textAlign = "left";
          const wc = Array.isArray(wk.words) ? wk.words.length : "?";
          ctx.fillText(`${wk.weekName || wk.name || "Vecka"} (${wc})`, listX + 6, iy + 13);
          m.buttons.push({ type: "week", weekId: wk.id, x: listX, y: iy, w: listW, h: itemH - 2 });
        }
        // Scroll arrows
        if (si > 0) {
          ctx.fillStyle = "#8090a0"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
          ctx.fillText("▲", listX + listW / 2, listY - 2);
          m.buttons.push({ type: "scrollUp", x: listX, y: listY - 14, w: listW, h: 14 });
        }
        if (ei < filtered.length) {
          ctx.fillStyle = "#8090a0"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
          ctx.fillText("▼", listX + listW / 2, listY + maxVis * itemH + 14);
          m.buttons.push({ type: "scrollDown", x: listX, y: listY + maxVis * itemH + 4, w: listW, h: 14 });
        }
      }

      // Right column: Boss selection
      const bossX = half + 10, bossW = half - 30;
      ctx.fillStyle = "#506880"; ctx.font = "bold 9px monospace"; ctx.textAlign = "left";
      ctx.fillText("VÄLJ BOSS:", bossX, listY - 4);

      SIEGE_BOSSES.forEach((boss, i) => {
        const by = listY + i * 34;
        const sel = boss.id === m.selectedBossId;
        ctx.fillStyle = sel ? "#3a1a40" : "rgba(20,15,25,0.6)";
        ctx.fillRect(bossX, by, bossW, 30);
        if (sel) { ctx.strokeStyle = "#a040c0"; ctx.lineWidth = 2; ctx.strokeRect(bossX, by, bossW, 30); }
        // Icon
        if (boss.id === "klara") {
          // Pixel art nurse face — light skin, dark long hair, nurse cap with red cross
          const ix = bossX + 6, iy = by + 4, ps = 2;
          const px = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(ix + x * ps, iy + y * ps, w * ps, h * ps); };
          // Hair background (long dark hair behind face)
          px(0, 1, 1, 8, "#1a0a05"); px(10, 1, 1, 8, "#1a0a05");
          px(1, 0, 9, 1, "#1a0a05"); // Top hair
          px(1, 1, 2, 2, "#1a0a05"); px(8, 1, 2, 2, "#1a0a05"); // Side hair
          // Long hair strands
          px(0, 9, 2, 2, "#2a1208"); px(9, 9, 2, 2, "#2a1208");
          // Face (light skin)
          px(2, 2, 7, 6, "#f5d0b0");
          px(3, 1, 5, 1, "#f5d0b0"); // Forehead
          // Bangs (dark hair over forehead)
          px(2, 1, 2, 1, "#1a0a05"); px(7, 1, 2, 1, "#1a0a05");
          // Eyes
          px(3, 4, 1, 1, "#1a1a1a"); px(7, 4, 1, 1, "#1a1a1a");
          px(3, 3, 1, 1, "#4060a0"); px(7, 3, 1, 1, "#4060a0"); // Eyelids hint
          // Eyebrows
          px(3, 3, 2, 1, "#3a2010"); px(6, 3, 2, 1, "#3a2010");
          // Nose
          px(5, 5, 1, 1, "#e0b898");
          // Mouth (gentle smile)
          px(4, 6, 3, 1, "#d08888");
          // Cheeks (blush)
          px(2, 5, 1, 1, "#f0a0a0"); px(8, 5, 1, 1, "#f0a0a0");
          // Nurse cap (white with red cross)
          px(2, 0, 7, 1, "#ffffff");
          px(1, -1, 9, 1, "#ffffff"); // Cap brim
          px(5, -1, 1, 1, "#ff4060"); // Red cross vertical
          px(4, 0, 3, 1, "#ff4060"); // Red cross horizontal (on cap)
          px(5, -1, 1, 1, "#ff4060"); // Cross top
        } else {
          ctx.font = "20px sans-serif"; ctx.textAlign = "left";
          ctx.fillText(boss.icon, bossX + 6, by + 22);
        }
        // Name
        ctx.fillStyle = sel ? "#e0c0f0" : "#a0a0b0";
        ctx.font = sel ? "bold 12px monospace" : "11px monospace";
        ctx.fillText(boss.name, bossX + 32, by + 14);
        // Difficulty skulls
        ctx.fillStyle = "#c04040"; ctx.font = "10px sans-serif";
        ctx.fillText("💀".repeat(boss.skulls || 1), bossX + 32, by + 26);
        m.buttons.push({ type: "selectBoss", bossId: boss.id, x: bossX, y: by, w: bossW, h: 30 });
      });

      // Player name
      const nameY = canvas.height - 54;
      const nameDisplay = m.guestName || "GÄST";
      ctx.fillStyle = "#90b0d0"; ctx.font = "bold 10px monospace"; ctx.textAlign = "left";
      ctx.fillText(`SPELARE: ${nameDisplay}`, 20, nameY);
      const nameBtnW = 66, nameBtnH = 14, nameBtnX = 20, nameBtnY = nameY + 4;
      ctx.fillStyle = "#1a2a40"; ctx.fillRect(nameBtnX, nameBtnY, nameBtnW, nameBtnH);
      ctx.strokeStyle = "#4070a0"; ctx.lineWidth = 1; ctx.strokeRect(nameBtnX, nameBtnY, nameBtnW, nameBtnH);
      ctx.fillStyle = "#90c0f0"; ctx.font = "bold 7px monospace"; ctx.textAlign = "center";
      ctx.fillText("BYT NAMN", nameBtnX + nameBtnW / 2, nameBtnY + 10);
      m.buttons.push({ type: "changeName", x: nameBtnX, y: nameBtnY, w: nameBtnW, h: nameBtnH });

      // Music toggle button
      const musBtnW = 30, musBtnH = 14, musBtnX = nameBtnX + nameBtnW + 8, musBtnY = nameBtnY;
      const musOn = siegeAudio.musicEnabled && appState.settings.soundEnabled;
      ctx.fillStyle = musOn ? "#1a3a1a" : "#3a1a1a";
      ctx.fillRect(musBtnX, musBtnY, musBtnW, musBtnH);
      ctx.strokeStyle = musOn ? "#40a040" : "#a04040"; ctx.lineWidth = 1;
      ctx.strokeRect(musBtnX, musBtnY, musBtnW, musBtnH);
      ctx.fillStyle = musOn ? "#80f080" : "#f08080";
      ctx.font = "12px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(musOn ? "🎵" : "🔇", musBtnX + musBtnW / 2, musBtnY + 11);
      m.buttons.push({ type: "toggleMusic", x: musBtnX, y: musBtnY, w: musBtnW, h: musBtnH });

      // Sound FX toggle button
      const sfxBtnX = musBtnX + musBtnW + 4;
      const sfxOn = appState.settings.soundEnabled;
      ctx.fillStyle = sfxOn ? "#1a2a3a" : "#3a1a1a";
      ctx.fillRect(sfxBtnX, musBtnY, musBtnW, musBtnH);
      ctx.strokeStyle = sfxOn ? "#4080c0" : "#a04040"; ctx.lineWidth = 1;
      ctx.strokeRect(sfxBtnX, musBtnY, musBtnW, musBtnH);
      ctx.fillStyle = sfxOn ? "#80c0f0" : "#f08080";
      ctx.font = "12px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(sfxOn ? "🔊" : "🔈", sfxBtnX + musBtnW / 2, musBtnY + 11);
      m.buttons.push({ type: "toggleSound", x: sfxBtnX, y: musBtnY, w: musBtnW, h: musBtnH });

      // Start buttons (Siege + Adventure side by side)
      const btnW = 136, btnH = 32, gap = 8;
      const totalW = btnW * 2 + gap;
      const btnX1 = w / 2 - totalW / 2, btnX2 = btnX1 + btnW + gap, btnY = canvas.height - 38;
      const canStart = !!m.selectedWeekId;

      // Siege button
      ctx.fillStyle = "#0f0f1a"; ctx.fillRect(btnX1 - 2, btnY - 2, btnW + 4, btnH + 4);
      ctx.fillStyle = canStart ? "#1a1a5a" : "#1a1a2a";
      ctx.fillRect(btnX1, btnY, btnW, btnH);
      if (canStart) { ctx.strokeStyle = "#6060e0"; ctx.lineWidth = 2; ctx.strokeRect(btnX1, btnY, btnW, btnH); }
      ctx.fillStyle = canStart ? "#f0f0f0" : "#404050";
      ctx.font = "bold 13px monospace"; ctx.textAlign = "center";
      ctx.fillText("⚔ SIEGE", btnX1 + btnW / 2, btnY + 24);
      m.buttons.push({ type: "start", x: btnX1, y: btnY, w: btnW, h: btnH });

      // Adventure button
      ctx.fillStyle = "#0f0f1a"; ctx.fillRect(btnX2 - 2, btnY - 2, btnW + 4, btnH + 4);
      ctx.fillStyle = canStart ? "#0a3a2a" : "#1a1a2a";
      ctx.fillRect(btnX2, btnY, btnW, btnH);
      if (canStart) { ctx.strokeStyle = "#30c060"; ctx.lineWidth = 2; ctx.strokeRect(btnX2, btnY, btnW, btnH); }
      ctx.fillStyle = canStart ? "#f0f0f0" : "#404050";
      ctx.font = "bold 13px monospace"; ctx.textAlign = "center";
      ctx.fillText("🗡 ADVENTURE", btnX2 + btnW / 2, btnY + 24);
      m.buttons.push({ type: "startAdventure", x: btnX2, y: btnY, w: btnW, h: btnH });
    }

    function drawLeaderboardTab(m) {
      const w = canvas.width, contentY = 90;
      ctx.fillStyle = "#80c0e0"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
      ctx.fillText("TOPPLISTA", w / 2, contentY);
      const lb = m.leaderboard || [];
      const itemH = 20, listY = contentY + 14;
      const maxVis = Math.floor((canvas.height - listY - 20) / itemH);
      const trophies = ["🥇", "🥈", "🥉"];
      lb.slice(0, maxVis).forEach((entry, i) => {
        const iy = listY + i * itemH;
        ctx.fillStyle = i < 3 ? "#1a2a40" : "transparent";
        if (i < 3) ctx.fillRect(30, iy, w - 60, itemH - 2);
        ctx.fillStyle = i === 0 ? "#f0d040" : i === 1 ? "#c0c0d0" : i === 2 ? "#c08040" : "#8090a0";
        ctx.font = "bold 11px monospace"; ctx.textAlign = "left";
        const trophy = i < 3 ? trophies[i] + " " : `${i + 1}. `;
        ctx.fillText(`${trophy}${entry.name || "???"}`, 40, iy + 14);
        ctx.textAlign = "right";
        ctx.fillStyle = "#60a0d0";
        ctx.fillText(`${entry.score || 0} XP`, w - 40, iy + 14);
      });
      if (!lb.length) {
        ctx.fillStyle = "#405060"; ctx.font = "12px monospace"; ctx.textAlign = "center";
        ctx.fillText("Ingen data tillgänglig", w / 2, listY + 40);
      }
    }

    function drawStatsTab(m) {
      const w = canvas.width, contentY = 90;
      ctx.fillStyle = "#80c0e0"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
      ctx.fillText("VECKOSTATISTIK", w / 2, contentY);
      const ws = m.weekStats || [];
      const itemH = 28, listY = contentY + 14;
      const maxVis = Math.floor((canvas.height - listY - 20) / itemH);
      const trophyColors = { gold: "#f0d040", silver: "#c0c0d0", bronze: "#c08040" };
      ws.slice(0, maxVis).forEach((stat, i) => {
        const iy = listY + i * itemH;
        ctx.fillStyle = i % 2 === 0 ? "rgba(20,30,50,0.5)" : "transparent";
        if (i % 2 === 0) ctx.fillRect(30, iy, w - 60, itemH - 2);
        ctx.fillStyle = "#b0c0d0"; ctx.font = "bold 11px monospace"; ctx.textAlign = "left";
        ctx.fillText(stat.weekName || `Vecka ${i + 1}`, 40, iy + 12);
        // Trophy
        if (stat.trophy) {
          ctx.fillStyle = trophyColors[stat.trophy] || "#808080";
          ctx.font = "bold 11px monospace";
          ctx.fillText(stat.trophy === "gold" ? "🏆" : stat.trophy === "silver" ? "🥈" : "🥉", 40, iy + 24);
        }
        ctx.textAlign = "right"; ctx.fillStyle = "#60a0d0"; ctx.font = "10px monospace";
        ctx.fillText(`${stat.correct || 0}/${stat.total || 0} rätt  |  ${stat.xp || 0} XP`, w - 40, iy + 14);
        // Progress bar
        const pct = stat.total > 0 ? stat.correct / stat.total : 0;
        ctx.fillStyle = "#0a1020"; ctx.fillRect(w - 200, iy + 18, 100, 6);
        ctx.fillStyle = pct >= 1 ? "#f0d040" : pct > 0.7 ? "#30c030" : pct > 0.4 ? "#e0a020" : "#c03030";
        ctx.fillRect(w - 200, iy + 18, 100 * pct, 6);
      });
      if (!ws.length) {
        ctx.fillStyle = "#405060"; ctx.font = "12px monospace"; ctx.textAlign = "center";
        ctx.fillText("Ingen statistik ännu", w / 2, listY + 40);
      }
    }

    function drawLevelsTab(m) {
      const w = canvas.width, contentY = 90;
      ctx.fillStyle = "#80c0e0"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
      ctx.fillText("NIVÅER & FRAMSTEG", w / 2, contentY);
      const s = m.stats;
      const centerX = w / 2, ly = contentY + 30;
      // Big level display
      ctx.fillStyle = "#0f1428"; ctx.fillRect(centerX - 60, ly, 120, 60);
      ctx.strokeStyle = "#4080f0"; ctx.lineWidth = 2; ctx.strokeRect(centerX - 60, ly, 120, 60);
      ctx.fillStyle = "#f0e040"; ctx.font = "bold 36px monospace"; ctx.textAlign = "center";
      ctx.fillText(String(s.level), centerX, ly + 44);
      ctx.fillStyle = "#80a0c0"; ctx.font = "bold 10px monospace";
      ctx.fillText("LEVEL", centerX, ly + 56);
      // XP bar
      const barX = centerX - 140, barY = ly + 76, barW = 280, barH = 16;
      const xpPct = Math.min(1, s.xp / Math.max(1, s.xpNext));
      ctx.fillStyle = "#0a1020"; ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = "#2060c0"; ctx.fillRect(barX, barY, barW * xpPct, barH);
      ctx.strokeStyle = "#3060a0"; ctx.lineWidth = 1; ctx.strokeRect(barX, barY, barW, barH);
      ctx.fillStyle = "#f0f0f0"; ctx.font = "bold 10px monospace";
      ctx.fillText(`${s.xp} / ${s.xpNext} XP`, centerX, barY + 12);
      // Coins & streak
      ctx.fillStyle = "#e0c020"; ctx.font = "bold 14px monospace";
      ctx.fillText(`COINS: ${s.coins}`, centerX - 80, barY + 40);
      ctx.fillStyle = "#e06020";
      ctx.fillText(`STREAK: ${s.streak}`, centerX + 80, barY + 40);
    }

    function drawTeacherTab(m) {
      const w = canvas.width, contentY = 90;
      m.teacherTyping = true;

      // Terminal-style frame
      const frameX = w / 2 - 220, frameY = contentY, frameW = 440, frameH = 300;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(frameX, frameY, frameW, frameH);
      ctx.strokeStyle = "#00aa00"; ctx.lineWidth = 2;
      ctx.strokeRect(frameX, frameY, frameW, frameH);
      // Scanlines
      for (let sy = frameY; sy < frameY + frameH; sy += 3) {
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(frameX, sy, frameW, 1);
      }

      ctx.fillStyle = "#00cc00"; ctx.font = "bold 13px monospace"; ctx.textAlign = "left";
      ctx.fillText("root@glostrainer:~$ teacher-login", frameX + 14, frameY + 26);
      ctx.fillStyle = "#00aa00"; ctx.font = "12px monospace";
      ctx.fillText("Ange lärarkod för åtkomst till", frameX + 14, frameY + 52);
      ctx.fillText("veckohantering och elevresultat.", frameX + 14, frameY + 70);

      // Code input line - DOS style with typed characters
      ctx.fillStyle = "#00cc00"; ctx.font = "bold 13px monospace";
      ctx.fillText("KOD: ", frameX + 14, frameY + 100);
      // Show masked code as asterisks
      const masked = "*".repeat(m.teacherCode.length);
      ctx.fillStyle = "#00ff00";
      ctx.fillText(masked, frameX + 70, frameY + 100);
      // Blinking cursor after typed text
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        const cursorX = frameX + 70 + ctx.measureText(masked).width;
        ctx.fillRect(cursorX + 2, frameY + 89, 9, 14);
      }

      // Status message
      if (m.teacherMsg) {
        ctx.fillStyle = m.teacherMsgColor;
        ctx.font = "bold 12px monospace";
        ctx.fillText("> " + m.teacherMsg, frameX + 14, frameY + 130);
      }

      // Instructions
      ctx.fillStyle = "#006600"; ctx.font = "10px monospace";
      ctx.fillText("Skriv koden och tryck ENTER", frameX + 14, frameY + 158);

      // Separator
      ctx.fillStyle = "#004400";
      ctx.fillText("─".repeat(46), frameX + 14, frameY + 180);

      // Elev login section
      ctx.fillStyle = "#4080c0"; ctx.font = "bold 12px monospace";
      ctx.fillText("Elev? Logga in eller registrera:", frameX + 14, frameY + 206);

      const authBtnW = 240, authBtnH = 30;
      const authBtnX = frameX + frameW / 2 - authBtnW / 2, authBtnY = frameY + 218;
      ctx.fillStyle = "#0a1428"; ctx.fillRect(authBtnX, authBtnY, authBtnW, authBtnH);
      ctx.strokeStyle = "#3060a0"; ctx.lineWidth = 1; ctx.strokeRect(authBtnX, authBtnY, authBtnW, authBtnH);
      ctx.fillStyle = "#80c0f0"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
      ctx.fillText("LOGGA IN / REGISTRERA", frameX + frameW / 2, authBtnY + 20);
      m.buttons.push({ type: "authLogin", x: authBtnX, y: authBtnY, w: authBtnW, h: authBtnH });
      ctx.textAlign = "left";
    }

    function drawChallengesTab(m) {
      const w = canvas.width, contentY = 90;
      ctx.fillStyle = "#e0a040"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
      ctx.fillText("UTMANINGAR", w / 2, contentY);

      const challenges = m.pendingChallenges || [];
      if (!challenges.length) {
        ctx.fillStyle = "#506070"; ctx.font = "12px monospace"; ctx.textAlign = "center";
        ctx.fillText("Inga utmaningar just nu", w / 2, contentY + 50);
        ctx.fillStyle = "#404050"; ctx.font = "10px monospace";
        ctx.fillText("Utmana spelare från FIGHT-fliken", w / 2, contentY + 72);
        return;
      }

      challenges.forEach((ch, i) => {
        const iy = contentY + 20 + i * 60;
        const cardW = w - 60;

        if (ch.isCreator) {
          // OUTGOING - you sent this challenge
          ctx.fillStyle = "rgba(20,40,60,0.6)";
          ctx.fillRect(30, iy, cardW, 52);
          ctx.strokeStyle = "#4080c0"; ctx.lineWidth = 1;
          ctx.strokeRect(30, iy, cardW, 52);
          ctx.fillStyle = "#80c0f0"; ctx.font = "bold 12px monospace"; ctx.textAlign = "left";
          ctx.fillText("SKICKAD UTMANING", 40, iy + 16);
          ctx.fillStyle = "#a0b0c0"; ctx.font = "11px monospace";
          ctx.fillText(`Vecka: ${ch.weekName}  |  Accepterat: ${ch.accepted}/${ch.total}`, 40, iy + 34);
          // Status indicator
          ctx.fillStyle = "#506880"; ctx.font = "bold 10px monospace"; ctx.textAlign = "right";
          ctx.fillText("VÄNTAR...", w - 40, iy + 16);
          // Waiting animation dots
          const dots = ".".repeat(1 + Math.floor(Date.now() / 500) % 3);
          ctx.fillText(dots, w - 40, iy + 32);
        } else {
          // INCOMING - someone challenges you
          ctx.fillStyle = "rgba(50,30,10,0.6)";
          ctx.fillRect(30, iy, cardW, 52);
          ctx.strokeStyle = "#e0a040"; ctx.lineWidth = 1;
          ctx.strokeRect(30, iy, cardW, 52);
          ctx.fillStyle = "#e0c080"; ctx.font = "bold 12px monospace"; ctx.textAlign = "left";
          ctx.fillText(`⚔ ${ch.challengerName} utmanar dig!`, 40, iy + 16);
          ctx.fillStyle = "#a09070"; ctx.font = "11px monospace";
          ctx.fillText(`Vecka: ${ch.weekName}`, 40, iy + 34);

          // ACCEPTERA button
          const abW = 100, abH = 24;
          const accX = w - 60 - abW * 2 - 10, accY = iy + 14;
          ctx.fillStyle = "#1a5a1a"; ctx.fillRect(accX, accY, abW, abH);
          ctx.strokeStyle = "#30c030"; ctx.lineWidth = 2; ctx.strokeRect(accX, accY, abW, abH);
          ctx.fillStyle = "#40ff40"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
          ctx.fillText("ACCEPTERA", accX + abW / 2, accY + 17);
          m.buttons.push({ type: "acceptChallenge", challengeId: ch.id, x: accX, y: accY, w: abW, h: abH });

          // NEKA button
          const decX = w - 60 - abW, decY = iy + 14;
          ctx.fillStyle = "#5a1a1a"; ctx.fillRect(decX, decY, abW, abH);
          ctx.strokeStyle = "#e04040"; ctx.lineWidth = 2; ctx.strokeRect(decX, decY, abW, abH);
          ctx.fillStyle = "#ff6060"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
          ctx.fillText("NEKA", decX + abW / 2, decY + 17);
          m.buttons.push({ type: "declineChallenge", challengeId: ch.id, x: decX, y: decY, w: abW, h: abH });
        }
      });
    }

    function ensureFightState() {
      if (!appState.groupFight) appState.groupFight = { teamA: [], teamB: [], open: false };
      if (!appState.groupFight.teamA) appState.groupFight.teamA = [];
      if (!appState.groupFight.teamB) appState.groupFight.teamB = [];
      // Auto-add self to Lag A if not in any team
      const selfInA = appState.groupFight.teamA.some(p => isCurrentActorPlayer(p));
      const selfInB = appState.groupFight.teamB.some(p => isCurrentActorPlayer(p));
      if (!selfInA && !selfInB) {
        const selfUser = (appState.onlineUsers || []).find(u => isCurrentActorPlayer(u));
        if (selfUser) appState.groupFight.teamA.unshift({ ...selfUser });
      }
    }

    function isInAnyTeam(player) {
      const id = player.profileId || player.sessionId || player.id;
      const inA = (appState.groupFight?.teamA || []).some(p => (p.profileId || p.sessionId || p.id) === id);
      const inB = (appState.groupFight?.teamB || []).some(p => (p.profileId || p.sessionId || p.id) === id);
      return inA || inB;
    }

    function drawTeamMember(p, i, colX, colW, listTop, team, m) {
      const iy = listTop + 22 + i * 22;
      const isSelf = !p.isBot && isCurrentActorPlayer(p);
      ctx.fillStyle = team === "A" ? "rgba(20,40,60,0.5)" : "rgba(60,20,20,0.5)";
      ctx.fillRect(colX, iy, colW, 20);
      ctx.fillStyle = isSelf ? "#60c0f0" : (team === "A" ? "#b0d0e0" : "#e0b0b0");
      ctx.font = "10px monospace"; ctx.textAlign = "left";
      const label = (p.name || p.displayName || "???") + (p.isBot ? " 🤖" : "") + (isSelf ? " (DU)" : "");
      ctx.fillText(label, colX + 4, iy + 14);
      // BYT LAG button
      const bw = 54, bh = 16;
      const swX = colX + colW - bw * 2 - 6, swY = iy + 2;
      ctx.fillStyle = "#1a2a3a"; ctx.fillRect(swX, swY, bw, bh);
      ctx.strokeStyle = "#4080b0"; ctx.lineWidth = 1; ctx.strokeRect(swX, swY, bw, bh);
      ctx.fillStyle = "#90c0f0"; ctx.font = "bold 9px monospace"; ctx.textAlign = "center";
      ctx.fillText("BYT LAG", swX + bw / 2, swY + 12);
      m.buttons.push({ type: "swapTeam", team, index: i, x: swX, y: swY, w: bw, h: bh });
      // TA BORT button (not for self)
      if (!isSelf) {
        const rmX = colX + colW - bw - 2, rmY = iy + 2;
        ctx.fillStyle = "#3a1a1a"; ctx.fillRect(rmX, rmY, bw, bh);
        ctx.strokeStyle = "#c04040"; ctx.lineWidth = 1; ctx.strokeRect(rmX, rmY, bw, bh);
        ctx.fillStyle = "#ff8080"; ctx.font = "bold 9px monospace"; ctx.textAlign = "center";
        ctx.fillText("TA BORT", rmX + bw / 2, rmY + 12);
        m.buttons.push({ type: "removeFromTeam", team, index: i, x: rmX, y: rmY, w: bw, h: bh });
      }
    }

    function drawFightTab(m) {
      ensureFightState();
      const w = canvas.width, contentY = 90;
      const half = Math.floor(w / 2);
      const teamA = appState.groupFight.teamA;
      const teamB = appState.groupFight.teamB;

      ctx.fillStyle = "#80c0e0"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
      ctx.fillText("SKAPA FIGHT", w / 2, contentY);

      // Team columns
      const colX = 20, colW = half - 30, listTop = contentY + 16;
      const colX2 = half + 10, colW2 = half - 30;

      // Lag A header
      ctx.fillStyle = "#1a2a40"; ctx.fillRect(colX, listTop, colW, 18);
      ctx.fillStyle = "#60a0e0"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center";
      ctx.fillText(`DITT LAG (${teamA.length})`, colX + colW / 2, listTop + 13);

      teamA.forEach((p, i) => drawTeamMember(p, i, colX, colW, listTop, "A", m));

      // Lag B header
      ctx.fillStyle = "#401a1a"; ctx.fillRect(colX2, listTop, colW2, 18);
      ctx.fillStyle = "#e06060"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center";
      ctx.fillText(`MOTSTÅNDARLAG (${teamB.length})`, colX2 + colW2 / 2, listTop + 13);

      teamB.forEach((p, i) => drawTeamMember(p, i, colX2, colW2, listTop, "B", m));

      // Bot buttons
      const maxTeam = Math.max(teamA.length, teamB.length);
      const botY = listTop + 22 + Math.max(2, maxTeam) * 22 + 8;
      const abW = 100, abH = 18;

      ctx.fillStyle = "#1a3050"; ctx.fillRect(colX, botY, abW, abH);
      ctx.strokeStyle = "#3060a0"; ctx.lineWidth = 1; ctx.strokeRect(colX, botY, abW, abH);
      ctx.fillStyle = "#80c0f0"; ctx.font = "bold 8px monospace"; ctx.textAlign = "center";
      ctx.fillText("+ BOT → LAG A", colX + abW / 2, botY + 13);
      m.buttons.push({ type: "addBotA", x: colX, y: botY, w: abW, h: abH });

      ctx.fillStyle = "#3a1a1a"; ctx.fillRect(colX2, botY, abW, abH);
      ctx.strokeStyle = "#a03030"; ctx.lineWidth = 1; ctx.strokeRect(colX2, botY, abW, abH);
      ctx.fillStyle = "#f08080"; ctx.font = "bold 8px monospace"; ctx.textAlign = "center";
      ctx.fillText("+ BOT → LAG B", colX2 + abW / 2, botY + 13);
      m.buttons.push({ type: "addBotB", x: colX2, y: botY, w: abW, h: abH });

      // Available players (only those NOT in any team)
      const playersY = botY + 28;
      ctx.fillStyle = "#506880"; ctx.font = "bold 9px monospace"; ctx.textAlign = "left";
      ctx.fillText("TILLGÄNGLIGA SPELARE:", colX, playersY);

      const availPlayers = (appState.onlineUsers || []).filter(p => !isInAnyTeam(p));
      const maxShow = Math.min(4, Math.floor((canvas.height - playersY - 60) / 18));
      availPlayers.slice(0, maxShow).forEach((player, i) => {
        const iy = playersY + 12 + i * 18;
        ctx.fillStyle = i % 2 === 0 ? "rgba(20,30,50,0.4)" : "transparent";
        if (i % 2 === 0) ctx.fillRect(colX, iy - 2, w - 40, 16);
        const name = player.name || player.displayName || "???";
        ctx.fillStyle = "#b0c0d0"; ctx.font = "10px monospace"; ctx.textAlign = "left";
        ctx.fillText(name, colX + 4, iy + 10);
        // Add to team buttons
        const bw = 44, bh = 12;
        const b1x = w - 40 - bw * 2 - 6, b1y = iy;
        ctx.fillStyle = "#1a3050"; ctx.fillRect(b1x, b1y, bw, bh);
        ctx.fillStyle = "#80c0f0"; ctx.font = "bold 7px monospace"; ctx.textAlign = "center";
        ctx.fillText("LAG A", b1x + bw / 2, b1y + 9);
        m.buttons.push({ type: "playerToA", player, x: b1x, y: b1y, w: bw, h: bh });
        const b2x = w - 40 - bw, b2y = iy;
        ctx.fillStyle = "#3a1a1a"; ctx.fillRect(b2x, b2y, bw, bh);
        ctx.fillStyle = "#f08080"; ctx.font = "bold 7px monospace"; ctx.textAlign = "center";
        ctx.fillText("LAG B", b2x + bw / 2, b2y + 9);
        m.buttons.push({ type: "playerToB", player, x: b2x, y: b2y, w: bw, h: bh });
      });
      if (!availPlayers.length) {
        ctx.fillStyle = "#405060"; ctx.font = "9px monospace"; ctx.textAlign = "left";
        ctx.fillText("Alla spelare är i lag", colX + 4, playersY + 22);
      }

      // STARTA FIGHT button
      const sfW = 240, sfH = 28, sfX = w / 2 - sfW / 2, sfY = canvas.height - 46;
      const canFight = teamA.length > 0 && teamB.length > 0;
      ctx.fillStyle = "#0f0f1a"; ctx.fillRect(sfX - 2, sfY - 2, sfW + 4, sfH + 4);
      ctx.fillStyle = canFight ? "#1a5a1a" : "#1a1a2a";
      ctx.fillRect(sfX, sfY, sfW, sfH);
      if (canFight) { ctx.strokeStyle = "#30c030"; ctx.lineWidth = 2; ctx.strokeRect(sfX, sfY, sfW, sfH); }
      ctx.fillStyle = canFight ? "#f0f0f0" : "#404050";
      ctx.font = "bold 13px monospace"; ctx.textAlign = "center";
      ctx.fillText("STARTA FIGHT", w / 2, sfY + 19);
      m.buttons.push({ type: "startFight", x: sfX, y: sfY, w: sfW, h: sfH });
    }

    function drawNameEditOverlay(m) {
      if (!m.nameEditing) return;
      const w = canvas.width, h = canvas.height;
      ctx.save();
      ctx.fillStyle = "rgba(10,16,32,0.85)";
      ctx.fillRect(0, 0, w, h);
      // Terminal frame
      const fx = w / 2 - 180, fy = h / 2 - 60, fw = 360, fh = 120;
      ctx.fillStyle = "#0a0a0a"; ctx.fillRect(fx, fy, fw, fh);
      ctx.strokeStyle = "#00aa00"; ctx.lineWidth = 2; ctx.strokeRect(fx, fy, fw, fh);
      ctx.fillStyle = "#00cc00"; ctx.font = "bold 12px monospace"; ctx.textAlign = "left";
      ctx.fillText("root@glostrainer:~$ set-name", fx + 12, fy + 22);
      ctx.fillStyle = "#00aa00"; ctx.font = "11px monospace";
      ctx.fillText("Ange ditt namn:", fx + 12, fy + 46);
      ctx.fillStyle = "#00ff00"; ctx.font = "bold 14px monospace";
      ctx.fillText(m.nameBuffer, fx + 12, fy + 70);
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        const cx = fx + 12 + ctx.measureText(m.nameBuffer).width + 2;
        ctx.fillRect(cx, fy + 58, 9, 14);
      }
      ctx.fillStyle = "#006600"; ctx.font = "9px monospace";
      ctx.fillText("ENTER för att spara, ESC för att avbryta", fx + 12, fy + 96);
      ctx.restore();
    }

    function drawMenuMode() {
      ctx.imageSmoothingEnabled = false;
      const m = arena.menu;
      m.buttons = [];
      drawMenuBackground();
      drawMenuHeader(m);
      if (m.selectedTab === "play") drawPlayTab(m);
      else if (m.selectedTab === "fight") drawFightTab(m);
      else if (m.selectedTab === "challenges") drawChallengesTab(m);
      else if (m.selectedTab === "leaderboard") drawLeaderboardTab(m);
      else if (m.selectedTab === "stats") drawStatsTab(m);
      else if (m.selectedTab === "levels") drawLevelsTab(m);
      else if (m.selectedTab === "teacher") {
        drawTeacherTab(m);
      } else {
        m.teacherTyping = false;
      }
      // Name edit overlay on top
      drawNameEditOverlay(m);
    }

    function handleMenuClick(cx, cy) {
      const m = arena.menu;
      for (const btn of m.buttons) {
        if (cx >= btn.x && cx <= btn.x + btn.w && cy >= btn.y && cy <= btn.y + btn.h) {
          if (btn.type === "tab") {
            m.selectedTab = btn.tabId; m.scrollOffset = 0;
            if (arena.menu.teacherInputVisible) { arena.menu.teacherInputVisible = false; }
            return { action: "hideTeacherInput" };
          }
          if (btn.type === "week") return { action: "selectWeek", weekId: btn.weekId };
          if (btn.type === "start" && m.selectedWeekId) return { action: "startSiege" };
          if (btn.type === "startAdventure" && m.selectedWeekId) return { action: "startAdventure" };
          if (btn.type === "lang") return { action: "changeLanguage", lang: btn.lang };
          if (btn.type === "scrollUp") { m.scrollOffset = Math.max(0, m.scrollOffset - 1); return null; }
          if (btn.type === "scrollDown") { m.scrollOffset += 1; return null; }
          if (btn.type === "selectBoss") { m.selectedBossId = btn.bossId; return null; }
          if (btn.type === "changeName") return { action: "startNameEdit" };
          if (btn.type === "toggleMusic") { siegeAudio.toggleMusic(); return null; }
          if (btn.type === "toggleSound") {
            appState.settings.soundEnabled = !appState.settings.soundEnabled;
            if (!appState.settings.soundEnabled) siegeAudio.stopMusic();
            saveSettings(); renderSoundToggle(); return null;
          }
          if (btn.type === "addBotA") return { action: "addBotA" };
          if (btn.type === "addBotB") return { action: "addBotB" };
          if (btn.type === "playerToA") return { action: "playerToA", player: btn.player };
          if (btn.type === "playerToB") return { action: "playerToB", player: btn.player };
          if (btn.type === "swapTeam") return { action: "swapTeam", team: btn.team, index: btn.index };
          if (btn.type === "removeFromTeam") return { action: "removeFromTeam", team: btn.team, index: btn.index };
          if (btn.type === "startFight") return { action: "startFight" };
          if (btn.type === "acceptChallenge") return { action: "acceptChallenge", challengeId: btn.challengeId };
          if (btn.type === "declineChallenge") return { action: "declineChallenge", challengeId: btn.challengeId };
          if (btn.type === "authLogin") return { action: "navigate", url: "/Auth/Login" };
        }
      }
      return null;
    }

    function handleMenuHover(cx, cy) {
      const m = arena.menu;
      m.hoveredItem = null;
      for (const btn of m.buttons) {
        if (cx >= btn.x && cx <= btn.x + btn.w && cy >= btn.y && cy <= btn.y + btn.h) {
          m.hoveredItem = btn;
          return true;
        }
      }
      return false;
    }

    // ─── END CANVAS MENU MODE ───────────────────────────────────────────

    // ─── SNES PIXEL SIEGE MODE ─────────────────────────────────────────
    function siegePx(gx, gy, w, h, color) {
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(gx * SIEGE_PS, gy * SIEGE_PS, w * SIEGE_PS, h * SIEGE_PS);
    }

    function drawSiegeBackground() {
      const w = Math.floor(canvas.width / SIEGE_PS), h = Math.floor(canvas.height / SIEGE_PS);
      const skyH = SIEGE_GROUND_Y - 30;
      // Sky
      siegePx(0, 0, w, skyH, "#5080c0");
      // Clouds (pixel style)
      siegePx(40, 8, 12, 3, "#8ab0e0");
      siegePx(42, 7, 8, 1, "#8ab0e0");
      siegePx(130, 12, 10, 3, "#8ab0e0");
      siegePx(132, 11, 6, 1, "#8ab0e0");
      siegePx(220, 6, 14, 3, "#8ab0e0");
      siegePx(222, 5, 10, 1, "#8ab0e0");
      // Sun
      siegePx(260, 5, 6, 6, "#f0e040");
      siegePx(261, 4, 4, 1, "#f0e040");
      siegePx(261, 11, 4, 1, "#f0e040");
      siegePx(259, 6, 1, 4, "#f0e040");
      siegePx(266, 6, 1, 4, "#f0e040");
      // Distant mountains
      for (let i = 0; i < 6; i++) {
        const mx = i * 55 - 10;
        const mh = 10 + (i % 3) * 5;
        for (let row = 0; row < mh; row++) {
          const spread = Math.floor((mh - row) * 1.4);
          siegePx(mx + mh - spread, skyH - row, spread * 2, 1, row < mh / 2 ? "#607848" : "#708858");
        }
      }
      // Ground
      siegePx(0, skyH, w, h - skyH, "#80a050");
      siegePx(0, skyH, w, 2, "#90b060");
      // Grass details
      for (let i = 0; i < 40; i++) {
        const gx = (i * 23 + 7) % w;
        siegePx(gx, skyH + 2 + (i % 5), 1, 2, "#70903e");
      }
      // Path/road in the middle
      siegePx(SIEGE_SOLDIER_SPAWN_LEFT - 2, SIEGE_GROUND_Y - 2, SIEGE_SOLDIER_SPAWN_RIGHT - SIEGE_SOLDIER_SPAWN_LEFT + 6, 5, "#a09060");
      siegePx(SIEGE_SOLDIER_SPAWN_LEFT - 1, SIEGE_GROUND_Y - 1, SIEGE_SOLDIER_SPAWN_RIGHT - SIEGE_SOLDIER_SPAWN_LEFT + 4, 3, "#b0a070");
    }

    function drawSiegeCastle(gx, gy, side, hpRatio) {
      const stone = "#a0a0b0";
      const stoneDark = "#707880";
      const stoneLight = "#c0c8d0";
      const gate = "#302820";
      const flag = side === "left" ? "#2060d0" : "#d03030";
      const flagDark = side === "left" ? "#1040a0" : "#a02020";

      // Main wall
      siegePx(gx + 4, gy + 8, 20, 14, stone);
      siegePx(gx + 4, gy + 8, 20, 1, stoneLight);
      siegePx(gx + 4, gy + 21, 20, 1, stoneDark);

      // Left tower
      siegePx(gx, gy + 4, 6, 18, stone);
      siegePx(gx, gy + 4, 6, 1, stoneLight);
      siegePx(gx, gy + 3, 2, 1, stone); siegePx(gx + 4, gy + 3, 2, 1, stone); // battlements
      siegePx(gx, gy + 2, 1, 1, stone); siegePx(gx + 5, gy + 2, 1, 1, stone);

      // Right tower
      siegePx(gx + 22, gy + 4, 6, 18, stone);
      siegePx(gx + 22, gy + 4, 6, 1, stoneLight);
      siegePx(gx + 22, gy + 3, 2, 1, stone); siegePx(gx + 26, gy + 3, 2, 1, stone);
      siegePx(gx + 22, gy + 2, 1, 1, stone); siegePx(gx + 27, gy + 2, 1, 1, stone);

      // Center tower (tallest)
      siegePx(gx + 10, gy + 2, 8, 6, stone);
      siegePx(gx + 10, gy + 2, 8, 1, stoneLight);
      siegePx(gx + 10, gy + 1, 2, 1, stone); siegePx(gx + 16, gy + 1, 2, 1, stone);
      siegePx(gx + 10, gy, 1, 1, stone); siegePx(gx + 17, gy, 1, 1, stone);

      // Flag pole on center tower
      const flagSide = side === "left" ? gx + 14 : gx + 13;
      siegePx(flagSide, gy - 5, 1, 5, "#3a2a0e");
      siegePx(flagSide + (side === "left" ? 1 : -3), gy - 5, 3, 2, flag);
      siegePx(flagSide + (side === "left" ? 1 : -3), gy - 5, 3, 1, flagDark);

      // Gate
      siegePx(gx + 11, gy + 16, 6, 6, gate);
      siegePx(gx + 12, gy + 16, 4, 1, "#4a3830");
      // Gate arch
      siegePx(gx + 11, gy + 15, 1, 1, stone);
      siegePx(gx + 16, gy + 15, 1, 1, stone);
      siegePx(gx + 12, gy + 15, 4, 1, "#4a3830");

      // Windows
      siegePx(gx + 6, gy + 10, 2, 2, "#1a1a2a");
      siegePx(gx + 20, gy + 10, 2, 2, "#1a1a2a");
      siegePx(gx + 13, gy + 4, 2, 2, "#1a1a2a");

      // Stone brick lines (removed — cleaner look)
      if (false) {
      }

      // Damage cracks (based on HP)
      const cracks = Math.floor((1 - hpRatio) * 12);
      ctx.strokeStyle = "#2a2a2a";
      ctx.lineWidth = 1;
      for (let i = 0; i < cracks; i++) {
        const cx = (gx + 4 + ((i * 7) % 20)) * SIEGE_PS;
        const cy = (gy + 6 + ((i * 11) % 14)) * SIEGE_PS;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + ((i % 3) - 1) * 8, cy + 10);
        ctx.stroke();
      }
      // Rubble for heavy damage
      if (hpRatio < 0.5) {
        const rubbleCount = Math.floor((1 - hpRatio) * 8);
        for (let i = 0; i < rubbleCount; i++) {
          siegePx(gx + 2 + ((i * 5) % 24), gy + 20 + (i % 3), 2, 1, stoneDark);
        }
      }
    }

    function drawPixelSoldier(gx, gy, direction, walkFrame, attackFrame, teamColors, hp, maxHp) {
      const isAttacking = attackFrame > 0;

      // Shadow
      siegePx(gx, gy + 10, 6, 1, "rgba(0,0,0,0.2)");

      // Legs (animated walk)
      const legPhase = Math.floor(walkFrame / 6) % 4;
      if (isAttacking) {
        siegePx(gx + 1, gy + 8, 2, 2, teamColors.boots);
        siegePx(gx + 3, gy + 8, 2, 2, teamColors.boots);
      } else if (legPhase === 0) {
        siegePx(gx + 1, gy + 8, 1, 2, teamColors.boots);
        siegePx(gx + 4, gy + 8, 1, 2, teamColors.boots);
      } else if (legPhase === 1) {
        siegePx(gx + 1, gy + 8, 1, 2, teamColors.boots);
        siegePx(gx + 3, gy + 8, 1, 2, teamColors.boots);
      } else if (legPhase === 2) {
        siegePx(gx + 2, gy + 8, 1, 2, teamColors.boots);
        siegePx(gx + 4, gy + 8, 1, 2, teamColors.boots);
      } else {
        siegePx(gx + 2, gy + 8, 1, 2, teamColors.boots);
        siegePx(gx + 3, gy + 8, 1, 2, teamColors.boots);
      }

      // Body / armor
      siegePx(gx + 1, gy + 4, 4, 4, teamColors.armor);
      siegePx(gx + 1, gy + 4, 4, 1, teamColors.armorLight);

      // Arms
      siegePx(gx, gy + 4, 1, 3, teamColors.armor);
      siegePx(gx + 5, gy + 4, 1, 3, teamColors.armor);

      // Shield (front side)
      const shieldX = direction > 0 ? gx + 5 : gx - 1;
      siegePx(shieldX, gy + 3, 2, 4, teamColors.shield);
      siegePx(shieldX, gy + 4, 2, 2, teamColors.shieldLight);

      // Sword
      const swordBaseX = direction > 0 ? gx + 6 : gx - 2;
      if (isAttacking && attackFrame > SIEGE_ATTACK_COOLDOWN / 2) {
        // Sword thrust forward
        const swordExtend = direction > 0 ? swordBaseX + 1 : swordBaseX - 1;
        siegePx(swordExtend, gy + 3, 1, 1, "#e0e0e0");
        siegePx(swordExtend + direction, gy + 3, 1, 1, "#f0f0f0");
        siegePx(swordExtend + direction * 2, gy + 3, 1, 1, "#f8f8f8");
      } else {
        // Sword at rest
        siegePx(swordBaseX, gy + 2, 1, 4, "#c0c0c0");
        siegePx(swordBaseX, gy + 2, 1, 1, "#e0e0e0");
      }

      // Belt
      siegePx(gx + 1, gy + 7, 4, 1, "#5b3a0e");
      siegePx(gx + 2, gy + 7, 1, 1, "#e0c020"); // buckle

      // Head / helmet
      siegePx(gx + 1, gy + 1, 4, 3, teamColors.helmet);
      siegePx(gx + 1, gy + 1, 4, 1, teamColors.helmetLight);
      // Visor slit
      siegePx(gx + 2, gy + 2, 2, 1, "#1a1a1a");
      // Face peek
      siegePx(direction > 0 ? gx + 4 : gx + 1, gy + 3, 1, 1, "#f0c0a0");

      // Helmet crest
      siegePx(gx + 2, gy, 2, 1, teamColors.crest);

      // HP bar above head
      const hpRatio = Math.max(0, hp / Math.max(1, maxHp));
      const barW = 6;
      siegePx(gx, gy - 2, barW, 1, "#1a1a1a");
      if (hpRatio > 0) {
        const fillW = Math.max(1, Math.round(barW * hpRatio));
        const barColor = hpRatio > 0.5 ? "#20c020" : hpRatio > 0.25 ? "#e0c020" : "#e02020";
        siegePx(gx, gy - 2, fillW, 1, barColor);
      }
    }

    // Nyan Cat — pop-tart body, cat face, rainbow trail
    function drawNyanCat(gx, gy, direction, walkFrame, hp, maxHp) {
      const ps = SIEGE_PS;
      const sx = gx * ps, sy = gy * ps;
      const bob = Math.sin(walkFrame / 3) * ps;

      // Rainbow trail (behind the cat)
      const rainbowColors = ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0088ff", "#8800ff"];
      const trailLen = 12;
      const trailX = direction > 0 ? sx - trailLen * ps : sx + 8 * ps;
      rainbowColors.forEach((c, i) => {
        const ry = sy + (1 + i) * ps + bob;
        ctx.fillStyle = c;
        ctx.fillRect(trailX, ry, trailLen * ps, ps);
      });

      // Pop-tart body (pink rectangle with sprinkles)
      ctx.fillStyle = "#e8a0b0";
      ctx.fillRect(sx, sy + ps + bob, 7 * ps, 5 * ps);
      ctx.fillStyle = "#d08898";
      ctx.fillRect(sx + ps, sy + 2 * ps + bob, 5 * ps, 3 * ps);
      // Sprinkles
      ctx.fillStyle = "#ff4060"; ctx.fillRect(sx + 2 * ps, sy + 2 * ps + bob, ps * 0.5, ps * 0.5);
      ctx.fillStyle = "#40ff60"; ctx.fillRect(sx + 4 * ps, sy + 3 * ps + bob, ps * 0.5, ps * 0.5);
      ctx.fillStyle = "#4060ff"; ctx.fillRect(sx + 3 * ps, sy + 4 * ps + bob, ps * 0.5, ps * 0.5);
      ctx.fillStyle = "#ffff40"; ctx.fillRect(sx + 5 * ps, sy + 2 * ps + bob, ps * 0.5, ps * 0.5);

      // Cat face (gray, peeking from right/left)
      const faceX = direction > 0 ? sx + 5 * ps : sx - 2 * ps;
      ctx.fillStyle = "#808080";
      ctx.fillRect(faceX, sy + ps + bob, 4 * ps, 4 * ps);
      // Ears
      ctx.fillRect(faceX, sy + bob, ps, ps);
      ctx.fillRect(faceX + 3 * ps, sy + bob, ps, ps);
      ctx.fillStyle = "#d0a0a0";
      ctx.fillRect(faceX + ps * 0.3, sy + bob + ps * 0.3, ps * 0.5, ps * 0.5);
      ctx.fillRect(faceX + 3 * ps + ps * 0.3, sy + bob + ps * 0.3, ps * 0.5, ps * 0.5);
      // Eyes
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(faceX + ps, sy + 2 * ps + bob, ps, ps);
      ctx.fillRect(faceX + 2 * ps, sy + 2 * ps + bob, ps, ps);
      // Mouth
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(faceX + ps, sy + 3.5 * ps + bob, 2 * ps, ps * 0.4);

      // Legs (stubby, animated)
      ctx.fillStyle = "#808080";
      const legOff = Math.floor(walkFrame / 4) % 2;
      ctx.fillRect(sx + (1 + legOff) * ps, sy + 6 * ps + bob, ps, ps);
      ctx.fillRect(sx + (4 - legOff) * ps, sy + 6 * ps + bob, ps, ps);

      // Tail
      ctx.fillStyle = "#808080";
      const tw = Math.sin(walkFrame / 2) * ps;
      const tailBaseX = direction > 0 ? sx - ps : sx + 7 * ps;
      ctx.fillRect(tailBaseX, sy + 2 * ps + bob + tw, ps, 2 * ps);

      // HP bar
      const hpRatio = Math.max(0, hp / Math.max(1, maxHp));
      siegePx(gx, gy - 2, 8, 1, "#1a1a1a");
      if (hpRatio > 0) siegePx(gx, gy - 2, Math.max(1, Math.round(8 * hpRatio)), 1, hpRatio > 0.5 ? "#e0c020" : "#e02020");
    }

    // Knight on horse — lance, more HP
    function drawPixelKnight(gx, gy, direction, walkFrame, attackFrame, teamColors, hp, maxHp) {
      const ps = SIEGE_PS;
      const isAttacking = attackFrame > 0;
      const gallop = Math.sin(walkFrame / 3) * ps;

      // Shadow
      siegePx(gx - 1, gy + 10, 10, 1, "rgba(0,0,0,0.2)");

      // Horse body
      ctx.fillStyle = "#6a4a2a";
      ctx.fillRect((gx + 1) * ps, (gy + 5) * ps + gallop, 6 * ps, 4 * ps);
      ctx.fillStyle = "#7a5a3a";
      ctx.fillRect((gx + 2) * ps, (gy + 5) * ps + gallop, 4 * ps, 3 * ps);
      // Horse head
      const headX = direction > 0 ? gx + 6 : gx - 1;
      ctx.fillStyle = "#6a4a2a";
      ctx.fillRect(headX * ps, (gy + 3) * ps + gallop, 2 * ps, 3 * ps);
      ctx.fillRect((headX + (direction > 0 ? 1 : -1)) * ps, (gy + 3) * ps + gallop, ps, 2 * ps);
      // Horse eye
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect((headX + (direction > 0 ? 1 : 0)) * ps, (gy + 4) * ps + gallop, ps * 0.5, ps * 0.5);
      // Horse legs (animated gallop)
      ctx.fillStyle = "#5a3a1a";
      const legP = Math.floor(walkFrame / 4) % 4;
      const legs = [[1,0], [2,1], [5,1], [6,0]];
      legs.forEach(([lx, phase], i) => {
        const extend = (legP + phase + i) % 2 === 0 ? 0 : ps;
        ctx.fillRect((gx + lx) * ps, (gy + 9) * ps + gallop - extend, ps, 2 * ps + extend);
      });
      // Tail
      ctx.fillStyle = "#4a3020";
      const tw = Math.sin(walkFrame / 2) * ps;
      const tailX = direction > 0 ? gx : gx + 7;
      ctx.fillRect(tailX * ps, (gy + 5) * ps + gallop + tw, ps, 3 * ps);

      // Rider body (on top of horse)
      ctx.fillStyle = teamColors.armor;
      ctx.fillRect((gx + 2) * ps, (gy + 1) * ps + gallop, 4 * ps, 4 * ps);
      ctx.fillStyle = teamColors.armorLight;
      ctx.fillRect((gx + 2) * ps, (gy + 1) * ps + gallop, 4 * ps, ps);
      // Helmet
      ctx.fillStyle = teamColors.helmet;
      ctx.fillRect((gx + 3) * ps, (gy - 1) * ps + gallop, 2 * ps, 2 * ps);
      ctx.fillStyle = teamColors.helmetLight;
      ctx.fillRect((gx + 3) * ps, (gy - 1) * ps + gallop, 2 * ps, ps);
      // Visor
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect((gx + 3) * ps, gy * ps + gallop, 2 * ps, ps * 0.5);
      // Plume
      ctx.fillStyle = teamColors.crest;
      ctx.fillRect((gx + 3) * ps, (gy - 2) * ps + gallop, 2 * ps, ps);

      // Lance
      const lanceDir = direction;
      const lanceBaseX = direction > 0 ? gx + 6 : gx - 3;
      const lanceLen = isAttacking ? 6 : 4;
      ctx.fillStyle = "#b0a080";
      ctx.fillRect((lanceBaseX) * ps, (gy + 1) * ps + gallop, lanceLen * ps * (direction > 0 ? 1 : -1) || ps, ps);
      // Lance tip
      ctx.fillStyle = "#e0e0e0";
      const tipX = direction > 0 ? lanceBaseX + lanceLen : lanceBaseX - lanceLen;
      ctx.fillRect(tipX * ps, (gy + 1) * ps + gallop - ps * 0.3, ps, ps * 1.6);

      // Shield
      ctx.fillStyle = teamColors.shield;
      const shX = direction > 0 ? gx + 1 : gx + 5;
      ctx.fillRect(shX * ps, (gy + 2) * ps + gallop, ps, 3 * ps);

      // HP bar
      const hpRatio = Math.max(0, hp / Math.max(1, maxHp));
      siegePx(gx, gy - 3, 8, 1, "#1a1a1a");
      if (hpRatio > 0) siegePx(gx, gy - 3, Math.max(1, Math.round(8 * hpRatio)), 1, hpRatio > 0.5 ? "#20c020" : hpRatio > 0.25 ? "#e0c020" : "#e02020");
    }

    let enemySpawnCount = 0;
    let playerSpawnCount = 0;

    // Themed grunt sprites per boss
    function drawThemedGrunt(gx, gy, direction, walkFrame, attackFrame, colors, hp, maxHp, theme) {
      if (theme === "zombie") {
        // Green-skinned zombie with torn clothes
        const ps = SIEGE_PS, isAtk = attackFrame > 0;
        siegePx(gx, gy + 10, 6, 1, "rgba(0,0,0,0.2)");
        const lp = Math.floor(walkFrame / 8) % 2; // Shambling walk
        siegePx(gx + 1 + lp, gy + 8, 1, 2, "#2a3a1a");
        siegePx(gx + 3 + (1 - lp), gy + 8, 1, 2, "#2a3a1a");
        siegePx(gx + 1, gy + 4, 4, 4, colors.armor); // Torn shirt
        siegePx(gx + 2, gy + 5, 2, 2, "#4a6030"); // Exposed skin
        siegePx(gx, gy + 4, 1, 3, "#4a6030"); // Arms (green skin)
        siegePx(gx + 5, gy + 4, 1, 3, "#4a6030");
        if (isAtk) { siegePx(direction > 0 ? gx + 6 : gx - 2, gy + 3, 2, 1, "#4a6030"); } // Reaching
        siegePx(gx + 1, gy + 1, 4, 3, "#5a7840"); // Green head
        siegePx(gx + 2, gy + 2, 1, 1, "#c02020"); // Red eyes
        siegePx(gx + 3, gy + 2, 1, 1, "#c02020");
        siegePx(gx + 2, gy + 3, 2, 1, "#1a1a1a"); // Open mouth
        const hr = Math.max(0, hp / Math.max(1, maxHp)); siegePx(gx, gy - 2, 6, 1, "#1a1a1a");
        if (hr > 0) siegePx(gx, gy - 2, Math.max(1, Math.round(6 * hr)), 1, hr > 0.5 ? "#20c020" : "#e02020");
      } else if (theme === "wolf") {
        // Gray wolf on all fours
        const ps = SIEGE_PS;
        siegePx(gx, gy + 10, 7, 1, "rgba(0,0,0,0.2)");
        const lp = Math.floor(walkFrame / 5) % 2;
        siegePx(gx + 1 + lp, gy + 7, 1, 3, "#606060"); // Front legs
        siegePx(gx + 4 + (1-lp), gy + 7, 1, 3, "#606060"); // Back legs
        siegePx(gx + 1, gy + 4, 5, 3, "#808080"); // Body
        siegePx(gx + 2, gy + 5, 3, 1, "#a0a0a0"); // Belly
        // Head
        const hx = direction > 0 ? gx + 5 : gx - 1;
        siegePx(hx, gy + 3, 3, 3, "#707070");
        siegePx(hx + (direction > 0 ? 2 : 0), gy + 4, 1, 1, "#1a1a1a"); // Eye
        siegePx(hx + (direction > 0 ? 2 : 0), gy + 5, 1, 1, "#2a2a2a"); // Snout
        // Ears
        siegePx(hx, gy + 2, 1, 1, "#606060");
        siegePx(hx + 2, gy + 2, 1, 1, "#606060");
        // Tail
        siegePx(direction > 0 ? gx - 1 : gx + 6, gy + 3 + Math.floor(Math.sin(walkFrame / 3)), 1, 2, "#707070");
        const hr = Math.max(0, hp / Math.max(1, maxHp)); siegePx(gx, gy, 7, 1, "#1a1a1a");
        if (hr > 0) siegePx(gx, gy, Math.max(1, Math.round(7 * hr)), 1, hr > 0.5 ? "#20c020" : "#e02020");
      } else if (theme === "skeleton") {
        // Bone-white skeleton with sword
        const ps = SIEGE_PS;
        siegePx(gx, gy + 10, 6, 1, "rgba(0,0,0,0.15)");
        const lp = Math.floor(walkFrame / 6) % 2;
        siegePx(gx + 1 + lp, gy + 8, 1, 2, "#d0d0c0"); // Leg bones
        siegePx(gx + 3 + (1-lp), gy + 8, 1, 2, "#d0d0c0");
        siegePx(gx + 2, gy + 4, 2, 4, "#e0e0d0"); // Ribcage
        siegePx(gx + 1, gy + 5, 1, 2, "#c0c0b0"); // Ribs
        siegePx(gx + 4, gy + 5, 1, 2, "#c0c0b0");
        siegePx(gx, gy + 4, 1, 3, "#d0d0c0"); // Arms
        siegePx(gx + 5, gy + 4, 1, 3, "#d0d0c0");
        // Sword
        siegePx(direction > 0 ? gx + 6 : gx - 2, gy + 2, 1, 4, "#a0a0a0");
        // Skull
        siegePx(gx + 1, gy + 1, 4, 3, "#f0f0e0");
        siegePx(gx + 2, gy + 1, 1, 1, "#1a1a1a"); // Eye sockets
        siegePx(gx + 3, gy + 1, 1, 1, "#1a1a1a");
        siegePx(gx + 2, gy + 3, 2, 1, "#2a2a2a"); // Teeth
        siegePx(gx + 2, gy, 2, 1, "#e0e0d0"); // Skull top
        const hr = Math.max(0, hp / Math.max(1, maxHp)); siegePx(gx, gy - 2, 6, 1, "#1a1a1a");
        if (hr > 0) siegePx(gx, gy - 2, Math.max(1, Math.round(6 * hr)), 1, hr > 0.5 ? "#20c020" : "#e02020");
      } else if (theme === "dino") {
        // Chrome Dino — pixel T-Rex like the Chrome game
        const ps = SIEGE_PS;
        siegePx(gx, gy + 10, 7, 1, "rgba(0,0,0,0.2)");
        const lp = Math.floor(walkFrame / 5) % 2;
        // Legs
        siegePx(gx + 2 + lp, gy + 7, 1, 3, "#535353");
        siegePx(gx + 4 + (1-lp), gy + 7, 1, 3, "#535353");
        // Body
        siegePx(gx + 1, gy + 4, 5, 3, "#535353");
        siegePx(gx + 2, gy + 5, 3, 1, "#636363");
        // Tiny arms (iconic!)
        siegePx(direction > 0 ? gx + 5 : gx, gy + 5, 1, 1, "#535353");
        // Tail
        siegePx(direction > 0 ? gx - 1 : gx + 6, gy + 4, 2, 1, "#535353");
        siegePx(direction > 0 ? gx - 2 : gx + 7, gy + 3, 1, 1, "#535353");
        // Head — square block head like Chrome dino
        const hx = direction > 0 ? gx + 4 : gx - 1;
        siegePx(hx, gy + 1, 4, 3, "#535353");
        siegePx(hx, gy, 3, 1, "#535353"); // Flat top
        // Eye
        siegePx(hx + (direction > 0 ? 2 : 1), gy + 1, 1, 1, "#ffffff");
        // Mouth
        siegePx(hx + (direction > 0 ? 1 : 0), gy + 3, 3, 1, "#434343");
        const hr = Math.max(0, hp / Math.max(1, maxHp)); siegePx(gx, gy - 2, 7, 1, "#1a1a1a");
        if (hr > 0) siegePx(gx, gy - 2, Math.max(1, Math.round(7 * hr)), 1, hr > 0.5 ? "#20c020" : "#e02020");
      } else if (theme === "nurse") {
        // Female nurse with white uniform and red cross cap
        const ps = SIEGE_PS, isAtk = attackFrame > 0;
        siegePx(gx, gy + 10, 6, 1, "rgba(0,0,0,0.2)"); // Shadow
        const lp = Math.floor(walkFrame / 6) % 2;
        // Legs (white stockings)
        siegePx(gx + 1 + lp, gy + 8, 1, 2, "#f0f0f0");
        siegePx(gx + 3 + (1 - lp), gy + 8, 1, 2, "#f0f0f0");
        // White shoes
        siegePx(gx + 1 + lp, gy + 9, 2, 1, "#e0e0e0");
        siegePx(gx + 3 + (1 - lp), gy + 9, 2, 1, "#e0e0e0");
        // White dress/uniform
        siegePx(gx + 1, gy + 4, 4, 4, "#ffffff");
        siegePx(gx + 2, gy + 5, 2, 1, "#e0e8f0"); // Apron fold
        // Red cross on chest
        siegePx(gx + 2, gy + 5, 2, 1, "#ff4060");
        siegePx(gx + 2.5 > gx + 2 ? gx + 2 : gx + 2, gy + 4, 1, 3, "#ff4060");
        // Arms
        siegePx(gx, gy + 4, 1, 3, "#f5d0b0"); // Skin tone arms
        siegePx(gx + 5, gy + 4, 1, 3, "#f5d0b0");
        if (isAtk) { siegePx(direction > 0 ? gx + 6 : gx - 2, gy + 4, 2, 1, "#f5d0b0"); } // Syringe jab
        // Head (skin)
        siegePx(gx + 1, gy + 1, 4, 3, "#f5d0b0");
        // Dark hair
        siegePx(gx + 1, gy, 4, 1, "#2a1a0a"); // Top hair
        siegePx(gx, gy + 1, 1, 2, "#2a1a0a"); // Side hair left
        siegePx(gx + 5, gy + 1, 1, 2, "#2a1a0a"); // Side hair right
        // Nurse cap (white with red cross)
        siegePx(gx + 1, gy - 1, 4, 1, "#ffffff");
        siegePx(gx + 2, gy - 1, 1, 1, "#ff4060"); // Red cross on cap
        // Eyes
        siegePx(gx + 2, gy + 2, 1, 1, "#1a1a1a");
        siegePx(gx + 3, gy + 2, 1, 1, "#1a1a1a");
        // Smile
        siegePx(gx + 2, gy + 3, 2, 1, "#c08080");
        // HP bar
        const hr = Math.max(0, hp / Math.max(1, maxHp)); siegePx(gx, gy - 3, 6, 1, "#1a1a1a");
        if (hr > 0) siegePx(gx, gy - 3, Math.max(1, Math.round(6 * hr)), 1, hr > 0.5 ? "#20c020" : "#e02020");
      } else {
        // Default cat theme — use soldier sprite with boss colors
        drawPixelSoldier(gx, gy, direction, walkFrame, attackFrame, colors, hp, maxHp);
      }
    }

    function drawAmbulance(gx, gy, direction, walkFrame, hp, maxHp) {
      // Pixel ambulance — white van with red cross, flashing light, spinning wheels
      const ps = SIEGE_PS;
      siegePx(gx, gy + 9, 10, 1, "rgba(0,0,0,0.25)"); // Shadow
      // Wheels (animated rotation)
      const wf = Math.floor(walkFrame / 3) % 2;
      siegePx(gx + 1, gy + 8, 2, 2, "#1a1a1a"); // Front wheel
      siegePx(gx + 7, gy + 8, 2, 2, "#1a1a1a"); // Back wheel
      siegePx(gx + 1 + wf, gy + 8 + wf, 1, 1, "#606060"); // Wheel spoke
      siegePx(gx + 7 + wf, gy + 8 + wf, 1, 1, "#606060");
      // Body — white van
      siegePx(gx, gy + 3, 10, 5, "#ffffff");
      siegePx(gx, gy + 3, 10, 1, "#e0e0e0"); // Roof
      // Red stripe
      siegePx(gx, gy + 7, 10, 1, "#ff4060");
      // Windshield
      const wx = direction > 0 ? gx + 8 : gx;
      siegePx(wx, gy + 4, 2, 2, "#a0d0f0");
      // Red cross on side
      siegePx(gx + 4, gy + 4, 3, 1, "#ff4060"); // Horizontal
      siegePx(gx + 5, gy + 3, 1, 3, "#ff4060"); // Vertical
      // Flashing siren light (alternates red/blue)
      const sirenColor = Math.floor(walkFrame / 4) % 2 === 0 ? "#ff2020" : "#2020ff";
      siegePx(gx + 4, gy + 2, 2, 1, sirenColor);
      // HP bar
      const hr = Math.max(0, hp / Math.max(1, maxHp));
      siegePx(gx, gy, 10, 1, "#1a1a1a");
      if (hr > 0) siegePx(gx, gy, Math.max(1, Math.round(10 * hr)), 1, hr > 0.5 ? "#20c020" : "#e02020");
    }

    function drawNursePianoBoss(gx, gy, direction, walkFrame, attackFrame, hp, maxHp) {
      // Girl with dark hair playing a black grand piano — larger boss sprite
      // Piano is ~14px wide, girl sits at it
      const ps = SIEGE_PS, isAtk = attackFrame > 0;
      siegePx(gx, gy + 12, 16, 1, "rgba(0,0,0,0.3)"); // Shadow

      // === Grand Piano (black) ===
      // Piano body
      siegePx(gx, gy + 6, 10, 5, "#1a1a1a"); // Main body
      siegePx(gx, gy + 5, 8, 1, "#2a2a2a"); // Lid
      siegePx(gx, gy + 4, 6, 1, "#1a1a1a"); // Raised lid
      siegePx(gx, gy + 3, 4, 1, "#2a2a2a"); // Lid prop
      // Piano legs
      siegePx(gx + 1, gy + 11, 1, 1, "#1a1a1a");
      siegePx(gx + 8, gy + 11, 1, 1, "#1a1a1a");
      // Keys (white and black)
      siegePx(gx + 1, gy + 6, 8, 1, "#f0f0f0"); // White keys
      siegePx(gx + 2, gy + 6, 1, 1, "#1a1a1a"); // Black keys
      siegePx(gx + 4, gy + 6, 1, 1, "#1a1a1a");
      siegePx(gx + 6, gy + 6, 1, 1, "#1a1a1a");

      // === Girl sitting at piano ===
      const px = gx + 10; // Girl position (right of piano)
      // Stool
      siegePx(px, gy + 10, 4, 1, "#3a2a1a");
      siegePx(px + 1, gy + 11, 2, 1, "#3a2a1a");
      // Legs
      siegePx(px + 1, gy + 10, 1, 2, "#f5d0b0");
      siegePx(px + 2, gy + 10, 1, 2, "#f5d0b0");
      // White dress
      siegePx(px, gy + 6, 4, 4, "#ffffff");
      siegePx(px + 1, gy + 7, 2, 1, "#e8e0f0"); // Dress detail
      // Arms reaching to piano keys
      siegePx(px - 1, gy + 7, 1, 1, "#f5d0b0"); // Left arm to keys
      if (isAtk) {
        // Playing animation — arms move on keys
        siegePx(px - 1, gy + 6, 1, 1, "#f5d0b0");
        siegePx(px - 2, gy + 6, 1, 1, "#f5d0b0");
      } else {
        siegePx(px - 1, gy + 7, 1, 1, "#f5d0b0");
        siegePx(px - 2, gy + 7, 1, 1, "#f5d0b0");
      }
      // Head
      siegePx(px, gy + 3, 4, 3, "#f5d0b0");
      // Dark hair — long flowing hair
      siegePx(px, gy + 1, 4, 2, "#1a0a05"); // Top
      siegePx(px - 1, gy + 2, 1, 4, "#1a0a05"); // Left cascade
      siegePx(px + 4, gy + 2, 1, 4, "#1a0a05"); // Right cascade
      siegePx(px, gy + 1, 1, 1, "#1a0a05"); // Bangs
      siegePx(px + 3, gy + 1, 1, 1, "#1a0a05");
      // Eyes
      siegePx(px + 1, gy + 4, 1, 1, "#1a1a1a");
      siegePx(px + 2, gy + 4, 1, 1, "#1a1a1a");
      // Mouth
      siegePx(px + 1, gy + 5, 2, 1, "#d09090");

      // === Floating musical notes (decorative, always visible) ===
      const noteTime = walkFrame * 0.15;
      for (let i = 0; i < 3; i++) {
        const nx = gx + 2 + Math.sin(noteTime + i * 2.1) * 4;
        const ny = gy - 1 - i * 2 - Math.sin(noteTime * 0.7 + i) * 1.5;
        ctx.fillStyle = i % 2 === 0 ? "#ff60a0" : "#a040ff";
        ctx.fillRect(nx * ps, ny * ps, 2 * ps, 1 * ps); // Note head
        ctx.fillRect((nx + 2) * ps, (ny - 2) * ps, 1 * ps, 2 * ps); // Note stem
      }

      // HP bar (wider for boss)
      const hr = Math.max(0, hp / Math.max(1, maxHp));
      siegePx(gx, gy - 1, 16, 1, "#1a1a1a");
      if (hr > 0) siegePx(gx, gy - 1, Math.max(1, Math.round(16 * hr)), 1, hr > 0.5 ? "#20c020" : "#e02020");
    }

    function spawnSiegeSoldier(team) {
      const s = arena.siege;
      const isEnemy = team !== "player";
      const count = isEnemy ? ++enemySpawnCount : ++playerSpawnCount;
      // Unit type: every 10th = knight, every 7th = archer, every 5th = nyan
      let unitType = "soldier";
      let unitHp = SIEGE_SOLDIER_MAX_HP;
      if (isEnemy) {
        // Enemy army — based on selected boss
        const bossArmy = arena.siege.bossArmy || ["soldier"];
        const armyIdx = count % bossArmy.length;
        unitType = bossArmy[armyIdx];
        if (unitType === "knight") unitHp = SIEGE_SOLDIER_MAX_HP * 3;
        else if (unitType === "nyan") unitHp = SIEGE_SOLDIER_MAX_HP * 2;
        else if (unitType === "archer") unitHp = Math.floor(SIEGE_SOLDIER_MAX_HP * 0.6);
        else if (unitType === "ambulance") unitHp = SIEGE_SOLDIER_MAX_HP * 2;
        else if (unitType === "boss") unitHp = SIEGE_SOLDIER_MAX_HP * 5;
      } else {
        // Player army — humans only
        if (count % 10 === 0) { unitType = "knight"; unitHp = SIEGE_SOLDIER_MAX_HP * 3; }
        else if (count % 7 === 0) { unitType = "archer"; unitHp = Math.floor(SIEGE_SOLDIER_MAX_HP * 0.6); }
      }
      const soldier = {
        x: team === "player" ? SIEGE_SOLDIER_SPAWN_LEFT : SIEGE_SOLDIER_SPAWN_RIGHT,
        hp: unitHp,
        maxHp: unitHp,
        state: "walk",
        walkFrame: Math.floor(Math.random() * 24),
        attackFrame: 0,
        attackCooldown: 0,
        target: null,
        direction: team === "player" ? 1 : -1,
        team,
        unitType,
        isOiia: unitType === "nyan" || unitType === "boss",
      };
      if (team === "player") {
        s.playerSoldiers.push(soldier);
      } else {
        s.enemySoldiers.push(soldier);
      }
    }

    function updateSiege() {
      if (arena.mode !== "siege" || arena.siege.gameOver) return;
      if (arena.siege.countdownEndsAt > Date.now()) return; // Freeze during countdown
      const s = arena.siege;
      const now = performance.now();
      s.frameCount++;
      const bossTheme = (SIEGE_BOSSES.find(b => b.id === s.selectedBossId) || SIEGE_BOSSES[0]).theme;

      // Periodic ambient sounds
      const allUnits = [...s.playerSoldiers, ...s.enemySoldiers];
      if (allUnits.length > 0 && s.frameCount % 20 === 0) siegeAudio.playSfx("walk");
      // Ambulance sirens
      if (allUnits.some(u => u.unitType === "ambulance" && u.state === "walk") && s.frameCount % 40 === 0) siegeAudio.playSfx("ambulanceSiren");
      // Knight galloping
      if (allUnits.some(u => u.unitType === "knight" && u.state === "walk") && s.frameCount % 15 === 0) siegeAudio.playSfx("gallop");
      // Dino roar handled in combat below (only on attack)

      // Auto-spawn for solo play only
      if (!s.isGroupFight) {
        if (now - s.lastPlayerSpawnMs >= s.spawnIntervalMs && s.playerSoldiers.length < 25) {
          spawnSiegeSoldier("player");
          s.lastPlayerSpawnMs = now;
        }
      }
      // Boss AI — answers glosas on timer (solo play)
      if (!s.isGroupFight && now - s.bossLastAnswerMs >= s.bossSpawnMs) {
        s.bossLastAnswerMs = now;
        const isCorrect = Math.random() < s.bossAccuracy;
        const bossName = (SIEGE_BOSSES.find(b => b.id === s.selectedBossId) || SIEGE_BOSSES[0]).name;
        if (isCorrect) {
          spawnSiegeSoldier("enemy");
          s.enemyFeed.unshift({ text: `${bossName} svarade RÄTT!`, good: true, time: Date.now(), duration: 3000 });
        } else {
          // Bot miss = no spawn, just a message
          s.enemyFeed.unshift({ text: `${bossName} svarade FEL!`, good: false, time: Date.now(), duration: 3000 });
        }
        if (s.enemyFeed.length > 5) s.enemyFeed.length = 5;
      }

      // Update all soldiers
      const allPlayer = s.playerSoldiers;
      const allEnemy = s.enemySoldiers;

      // Reset targets — if target died (killed by someone else), go back to walking
      allPlayer.forEach(p => {
        if (p.target && (p.target.hp <= 0 || p.target.state === "dead")) {
          p.target = null;
          p.state = "walk";
          p.attackFrame = 0;
          p.attackCooldown = 0;
        }
      });
      allEnemy.forEach(e => {
        if (e.target && (e.target.hp <= 0 || e.target.state === "dead")) {
          e.target = null;
          e.state = "walk";
          e.attackFrame = 0;
          e.attackCooldown = 0;
        }
      });

      // Ambulance charge — on hit: ambulance crashes & smokes, victim flies in arc
      if (!s.ragdolls) s.ragdolls = [];
      if (!s.crashedAmbulances) s.crashedAmbulances = [];
      if (!s.corpses) s.corpses = [];
      const handleAmbulanceCharge = (ambulance, targets, targetArr) => {
        if (ambulance.unitType !== "ambulance" || ambulance.state === "dead" || ambulance.state === "crashed") return;
        for (const t of targets) {
          if (t.state === "dead" || t.state === "ragdoll") continue;
          if (Math.abs(ambulance.x - t.x) < 6) {
            // === Victim: launch as ragdoll flying in arc ===
            t.hp -= SIEGE_SOLDIER_DMG * 3;
            // Free from fight
            if (t.target) {
              const partner = t.target;
              partner.target = null;
              partner.state = "walk";
              partner.attackFrame = 0;
            }
            // Random arc trajectory — different every hit
            const launchAngle = -(0.6 + Math.random() * 0.8); // -0.6 to -1.4 rad (upward)
            const launchSpeed = 1.8 + Math.random() * 1.2; // 1.8-3.0
            const flyDir = ambulance.direction; // victim flies in ambulance travel direction
            s.ragdolls.push({
              x: t.x * SIEGE_PS,
              y: SIEGE_GROUND_Y * SIEGE_PS - 5 * SIEGE_PS,
              vx: flyDir * launchSpeed * Math.cos(launchAngle) * SIEGE_PS,
              vy: launchSpeed * Math.sin(launchAngle) * SIEGE_PS,
              hp: t.hp,
              maxHp: t.maxHp,
              team: t.team,
              direction: t.direction,
              unitType: t.unitType,
              colors: t.team === "player" ? PLAYER_COLORS : (SIEGE_BOSSES.find(b => b.id === s.selectedBossId) || SIEGE_BOSSES[0]).colors,
              theme: t.team === "player" ? null : bossTheme,
              rotation: 0,
              rotSpeed: (0.05 + Math.random() * 0.1) * (Math.random() > 0.5 ? 1 : -1),
              landed: false,
            });
            // Impact particles at collision point
            addImpactParticles(t.x * SIEGE_PS + 9, (SIEGE_GROUND_Y - 4) * SIEGE_PS, 25, "#ff4060", "#fde68a");
            // Remove victim from active soldiers
            t.state = "dead";

            // === Ambulance: crash, smoke, and stop ===
            const crashTime = (8 + Math.random() * 4) * 60; // 8-12 sec at 60fps
            s.crashedAmbulances.push({
              x: ambulance.x,
              direction: ambulance.direction,
              walkFrame: ambulance.walkFrame,
              timer: crashTime,
              maxTimer: crashTime,
              smokeTimer: 0,
            });
            siegeAudio.playSfx("ambulanceCrash");
            ambulance.state = "dead"; // Remove from active
            break;
          }
        }
      };
      allEnemy.filter(e => e.unitType === "ambulance").forEach(a => handleAmbulanceCharge(a, allPlayer, s.playerSoldiers));
      allPlayer.filter(p => p.unitType === "ambulance").forEach(a => handleAmbulanceCharge(a, allEnemy, s.enemySoldiers));

      // Find encounters (ambulances charge through, nurse boss shoots from range)
      const isRangedOnly = (u) => u.unitType === "ambulance" || (u.unitType === "boss" && bossTheme === "nurse" && u.team !== "player");
      allPlayer.forEach(p => {
        if (p.state === "dead" || p.target || isRangedOnly(p)) return;
        const enemy = allEnemy.find(e => e.state !== "dead" && !e.target && !isRangedOnly(e) && Math.abs(p.x - e.x) < 8);
        if (enemy) {
          p.state = "fight";
          p.target = enemy;
          enemy.state = "fight";
          enemy.target = p;
        }
      });

      // Archers shoot from range
      const shootArrow = (archer, targets, team) => {
        if (archer.unitType !== "archer" || archer.state === "dead") return;
        archer.attackCooldown--;
        // Find nearest enemy
        const nearest = targets.filter(t => t.state !== "dead").sort((a, b) => Math.abs(a.x - archer.x) - Math.abs(b.x - archer.x))[0];
        if (!nearest) return;
        const dist = Math.abs(nearest.x - archer.x);
        if (dist < 40 && dist > 6 && archer.attackCooldown <= 0) {
          // Stop and shoot
          archer.state = "fight";
          archer.attackCooldown = 50;
          archer.attackFrame = 20;
          const ax = archer.x * SIEGE_PS + 3 * SIEGE_PS;
          const ay = (SIEGE_GROUND_Y - 7) * SIEGE_PS;
          const tx = nearest.x * SIEGE_PS + 3 * SIEGE_PS;
          const ty = (SIEGE_GROUND_Y - 5) * SIEGE_PS;
          const dx = tx - ax, dy = ty - ay;
          const speed = 5;
          const len = Math.sqrt(dx * dx + dy * dy);
          s.arrows.push({
            x: ax, y: ay,
            vx: (dx / len) * speed,
            vy: (dy / len) * speed - 2,
            team, life: 120,
          });
          siegeAudio.playSfx("arrowShoot");
        } else if (dist >= 40 || !nearest) {
          if (archer.state === "fight" && !archer.target) archer.state = "walk";
        }
      };
      allPlayer.filter(p => p.unitType === "archer").forEach(p => shootArrow(p, allEnemy, "player"));
      allEnemy.filter(e => e.unitType === "archer").forEach(e => shootArrow(e, allPlayer, "enemy"));

      // Nurse piano boss — shoots musical notes from range
      if (!s.notes) s.notes = [];
      const shootNote = (unit, targets, team) => {
        if (unit.unitType !== "boss" || unit.state === "dead" || bossTheme !== "nurse") return;
        unit.attackCooldown--;
        const nearest = targets.filter(t => t.state !== "dead").sort((a, b) => Math.abs(a.x - unit.x) - Math.abs(b.x - unit.x))[0];
        if (!nearest) return;
        const dist = Math.abs(nearest.x - unit.x);
        if (dist < 60 && dist > 4 && unit.attackCooldown <= 0) {
          unit.state = "fight";
          unit.attackCooldown = 40;
          unit.attackFrame = 20;
          const nx = unit.x * SIEGE_PS + 8 * SIEGE_PS;
          const ny = (SIEGE_GROUND_Y - 9) * SIEGE_PS;
          const tx = nearest.x * SIEGE_PS + 3 * SIEGE_PS;
          const ty = (SIEGE_GROUND_Y - 5) * SIEGE_PS;
          const dx = tx - nx, dy = ty - ny;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const speed = 3.5;
          s.notes.push({
            x: nx, y: ny,
            vx: (dx / len) * speed,
            vy: (dy / len) * speed,
            team, life: 120,
            wobble: Math.random() * Math.PI * 2,
            color: ["#ff60a0", "#a040ff", "#40c0ff", "#ffc040"][Math.floor(Math.random() * 4)],
          });
          siegeAudio.playBossPianoNote();
        } else if (dist >= 60 || !nearest) {
          if (unit.state === "fight" && !unit.target) unit.state = "walk";
        }
      };
      allEnemy.filter(e => e.unitType === "boss").forEach(e => shootNote(e, allPlayer, "enemy"));

      // Move & fight — simultaneous combat (both deal damage before checking deaths)
      const pendingDamage = []; // { target, dmg, attacker }
      allPlayer.forEach(p => {
        if (p.state === "dead") return;
        p.walkFrame++;
        if (p.state === "walk") {
          p.x += p.unitType === "ambulance" ? SIEGE_SOLDIER_SPEED * 2.2 : SIEGE_SOLDIER_SPEED;
          if (p.x >= SIEGE_RIGHT_CASTLE_X - 2) {
            s.enemyCastleHp = Math.max(0, s.enemyCastleHp - (p.unitType === "ambulance" ? SIEGE_CASTLE_DMG * 2 : SIEGE_CASTLE_DMG));
            siegeAudio.playSfx("castleHit");
            addImpactParticles(
              (SIEGE_RIGHT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS,
              (SIEGE_GROUND_Y - SIEGE_CASTLE_H / 2) * SIEGE_PS,
              60, "#fca5a5", "#fde68a"
            );
            p.state = "dead";
            p.hp = 0;
          }
        } else if (p.state === "fight") {
          p.attackCooldown--;
          if (p.attackCooldown <= 0 && p.target && p.target.hp > 0) {
            pendingDamage.push({ target: p.target, dmg: SIEGE_SOLDIER_DMG, attacker: p });
            p.attackCooldown = SIEGE_ATTACK_COOLDOWN;
            p.attackFrame = SIEGE_ATTACK_COOLDOWN;
            siegeAudio.playSfx("swordHit");
            addImpactParticles(p.target.x * SIEGE_PS + 9, (SIEGE_GROUND_Y - 4) * SIEGE_PS, 8, "#fde68a", "#ef4444");
          }
          if (p.attackFrame > 0) p.attackFrame--;
        }
      });

      allEnemy.forEach(e => {
        if (e.state === "dead") return;
        e.walkFrame++;
        if (e.state === "walk") {
          e.x -= e.unitType === "ambulance" ? SIEGE_SOLDIER_SPEED * 2.2 : SIEGE_SOLDIER_SPEED;
          if (e.x <= SIEGE_SOLDIER_SPAWN_LEFT + 2) {
            s.playerCastleHp = Math.max(0, s.playerCastleHp - (e.unitType === "ambulance" ? SIEGE_CASTLE_DMG * 2 : SIEGE_CASTLE_DMG));
            siegeAudio.playSfx("castleHit");
            addImpactParticles(
              (SIEGE_LEFT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS,
              (SIEGE_GROUND_Y - SIEGE_CASTLE_H / 2) * SIEGE_PS,
              60, "#fca5a5", "#fde68a"
            );
            e.state = "dead";
            e.hp = 0;
          }
        } else if (e.state === "fight") {
          e.attackCooldown--;
          if (e.attackCooldown <= 0 && e.target && e.target.hp > 0) {
            pendingDamage.push({ target: e.target, dmg: SIEGE_SOLDIER_DMG, attacker: e });
            e.attackCooldown = SIEGE_ATTACK_COOLDOWN;
            e.attackFrame = SIEGE_ATTACK_COOLDOWN;
            siegeAudio.playSfx(bossTheme === "dino" ? "dinoRoar" : "swordHit");
            addImpactParticles(e.target.x * SIEGE_PS + 9, (SIEGE_GROUND_Y - 4) * SIEGE_PS, 8, "#fde68a", "#ef4444");
          }
          if (e.attackFrame > 0) e.attackFrame--;
        }
      });

      // Apply all damage simultaneously — both soldiers hit each other before dying
      pendingDamage.forEach(({ target, dmg, attacker }) => {
        target.hp -= dmg;
      });
      // Now check for deaths after ALL damage applied
      [...allPlayer, ...allEnemy].forEach(u => {
        if (u.state === "dead") return;
        if (u.hp <= 0) {
          u.state = "dead";
          siegeAudio.playSfx("death");
          // Free the attacker
          const freed = [...allPlayer, ...allEnemy].find(a => a.target === u && a.state === "fight");
          if (freed) {
            freed.target = null;
            freed.state = "walk";
            freed.attackFrame = 0;
            freed.attackCooldown = 0;
          }
        }
      });

      // Update arrows (real physics — gravity, collision, stick in ground)
      if (!s.arrows) s.arrows = [];
      if (!s.stuckArrows) s.stuckArrows = [];
      s.arrows = s.arrows.filter(a => {
        a.x += a.vx;
        a.y += a.vy;
        a.vy += 0.15; // gravity
        a.life--;
        // Hit ground?
        const groundPx = SIEGE_GROUND_Y * SIEGE_PS + 4;
        if (a.y >= groundPx) {
          s.stuckArrows.push({ x: a.x, y: groundPx, angle: Math.atan2(a.vy, a.vx) });
          if (s.stuckArrows.length > 30) s.stuckArrows.shift();
          return false;
        }
        // Hit enemy soldier?
        const targets = a.team === "player" ? s.enemySoldiers : s.playerSoldiers;
        for (const t of targets) {
          if (t.state === "dead") continue;
          const tx = t.x * SIEGE_PS + 3 * SIEGE_PS;
          const ty = SIEGE_GROUND_Y * SIEGE_PS - 5 * SIEGE_PS;
          if (Math.abs(a.x - tx) < 10 && Math.abs(a.y - ty) < 15) {
            t.hp -= SIEGE_SOLDIER_DMG;
            siegeAudio.playSfx("arrowHit");
            addImpactParticles(a.x, a.y, 6, "#fde68a", "#ef4444");
            if (t.hp <= 0) t.state = "dead";
            return false;
          }
        }
        return a.life > 0;
      });

      // Update musical notes (sine wave flight, collision)
      if (s.notes) {
        s.notes = s.notes.filter(n => {
          n.wobble += 0.2;
          n.x += n.vx;
          n.y += n.vy + Math.sin(n.wobble) * 0.8; // Wavy float
          n.life--;
          // Hit ground?
          if (n.y >= SIEGE_GROUND_Y * SIEGE_PS + 4) return false;
          // Hit target soldier?
          const targets = n.team === "player" ? s.enemySoldiers : s.playerSoldiers;
          for (const t of targets) {
            if (t.state === "dead") continue;
            const tx = t.x * SIEGE_PS + 3 * SIEGE_PS;
            const ty = SIEGE_GROUND_Y * SIEGE_PS - 5 * SIEGE_PS;
            if (Math.abs(n.x - tx) < 12 && Math.abs(n.y - ty) < 15) {
              t.hp -= SIEGE_SOLDIER_DMG * 1.5;
              siegeAudio.playSfx("noteHit");
              addImpactParticles(n.x, n.y, 10, n.color, "#ffffff");
              if (t.hp <= 0) t.state = "dead";
              return false;
            }
          }
          return n.life > 0;
        });
      }

      // Update ragdolls — flying soldiers hit by ambulance
      const groundPxY = SIEGE_GROUND_Y * SIEGE_PS + 2 * SIEGE_PS;
      s.ragdolls = s.ragdolls.filter(r => {
        if (r.landed) return false; // Already converted to corpse
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.35; // Gravity
        r.rotation += r.rotSpeed;
        // Check landing
        if (r.y >= groundPxY) {
          r.y = groundPxY;
          // Blood splash on landing
          addImpactParticles(r.x, r.y, 15, "#c02020", "#800000");
          addImpactParticles(r.x, r.y, 8, "#ff4040", "#a01010");
          // Convert to corpse lying on ground
          const offRoadY = 3 + Math.random() * 3; // 3-6 px below road
          const lyingTime = r.hp > 0 ? (10 + Math.random() * 5) * 60 : Infinity; // 10-15s or forever
          s.corpses.push({
            x: r.x / SIEGE_PS,
            y: SIEGE_GROUND_Y + offRoadY,
            direction: r.direction,
            hp: r.hp,
            maxHp: r.maxHp,
            team: r.team,
            colors: r.colors,
            theme: r.theme,
            unitType: r.unitType,
            timer: lyingTime,
            bleedTimer: 0,
            bloodDrops: [],
          });
          return false;
        }
        return true;
      });

      // Update crashed ambulances — smoking wrecks
      s.crashedAmbulances = s.crashedAmbulances.filter(ca => {
        ca.timer--;
        ca.smokeTimer++;
        // Emit smoke particles every few frames
        if (ca.smokeTimer % 4 === 0) {
          const sx = ca.x * SIEGE_PS + (3 + Math.random() * 4) * SIEGE_PS;
          const sy = (SIEGE_GROUND_Y - 9) * SIEGE_PS;
          addImpactParticles(sx, sy, 2, "#808080", "#b0b0b0");
        }
        return ca.timer > 0;
      });

      // Update corpses — lying soldiers
      s.corpses = s.corpses.filter(c => {
        if (c.hp > 0) {
          c.timer--;
          if (c.timer <= 0) {
            // Get back up — respawn as soldier
            const soldier = {
              x: c.x,
              hp: c.hp,
              maxHp: c.maxHp,
              state: "walk",
              walkFrame: Math.floor(Math.random() * 24),
              attackFrame: 0,
              attackCooldown: 0,
              target: null,
              direction: c.direction,
              team: c.team,
              unitType: c.unitType || "soldier",
              isOiia: false,
            };
            if (c.team === "player") s.playerSoldiers.push(soldier);
            else s.enemySoldiers.push(soldier);
            return false;
          }
        } else {
          // Dead — bleed on ground
          c.bleedTimer++;
          if (c.bleedTimer % 30 === 0 && c.bloodDrops.length < 8) {
            c.bloodDrops.push({
              dx: (Math.random() - 0.5) * 4,
              dy: Math.random() * 2,
              size: 1 + Math.random(),
            });
          }
          // Fade out after 20 seconds
          c.timer--;
          if (c.timer === Infinity) c.timer = 20 * 60;
          if (c.timer <= 0) return false;
        }
        return true;
      });

      // Remove dead soldiers
      s.playerSoldiers = s.playerSoldiers.filter(p => p.state !== "dead");
      s.enemySoldiers = s.enemySoldiers.filter(e => e.state !== "dead");

      // Check game over
      if (s.playerCastleHp <= 0) {
        s.gameOver = true;
        s.winner = "enemy";
        siegeAudio.stopMusic();
        playBossExplosionSound();
        addImpactParticles(
          (SIEGE_LEFT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS,
          (SIEGE_GROUND_Y - SIEGE_CASTLE_H / 2) * SIEGE_PS,
          400, "#ef4444", "#fde68a"
        );
        if (typeof s.onGameOver === "function") s.onGameOver("enemy");
      } else if (s.enemyCastleHp <= 0) {
        s.gameOver = true;
        s.winner = "player";
        siegeAudio.stopMusic();
        playBossExplosionSound();
        addImpactParticles(
          (SIEGE_RIGHT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS,
          (SIEGE_GROUND_Y - SIEGE_CASTLE_H / 2) * SIEGE_PS,
          400, "#fde68a", "#22c55e"
        );
        if (typeof s.onGameOver === "function") s.onGameOver("player");
      }
    }

    const PLAYER_COLORS = {
      armor: "#2050c0",
      armorLight: "#3070e0",
      helmet: "#808890",
      helmetLight: "#a0a8b0",
      shield: "#1848a0",
      shieldLight: "#3068c0",
      boots: "#5b3a0e",
      crest: "#2060e0",
    };
    const ENEMY_COLORS = {
      armor: "#c03030",
      armorLight: "#e04040",
      helmet: "#606068",
      helmetLight: "#808088",
      shield: "#901818",
      shieldLight: "#b03030",
      boots: "#3a2a0e",
      crest: "#e02020",
    };

    function drawSiegeMode() {
      const s = arena.siege;
      const prevSmoothing = ctx.imageSmoothingEnabled;
      ctx.imageSmoothingEnabled = false;

      drawSiegeBackground();

      // Draw castles
      const playerHpR = Math.max(0, s.playerCastleHp / Math.max(1, s.playerCastleMaxHp));
      const enemyHpR = Math.max(0, s.enemyCastleHp / Math.max(1, s.enemyCastleMaxHp));
      drawSiegeCastle(SIEGE_LEFT_CASTLE_X, SIEGE_GROUND_Y - SIEGE_CASTLE_H, "left", playerHpR);
      drawSiegeCastle(SIEGE_RIGHT_CASTLE_X, SIEGE_GROUND_Y - SIEGE_CASTLE_H, "right", enemyHpR);

      // Draw all soldiers sorted by x for proper layering
      const allSoldiers = [
        ...s.playerSoldiers.map(s => ({ ...s, colors: PLAYER_COLORS })),
        ...s.enemySoldiers.map(s => {
          const boss = SIEGE_BOSSES.find(b => b.id === arena.siege.selectedBossId) || SIEGE_BOSSES[0];
          return { ...s, colors: boss.colors, theme: boss.theme };
        }),
      ].sort((a, b) => a.x - b.x);

      allSoldiers.forEach(sol => {
        if (sol.unitType === "boss" && sol.theme === "nurse") {
          drawNursePianoBoss(sol.x, SIEGE_GROUND_Y - 13, sol.direction, sol.walkFrame, sol.attackFrame, sol.hp, sol.maxHp);
        } else if (sol.unitType === "ambulance") {
          drawAmbulance(sol.x, SIEGE_GROUND_Y - 11, sol.direction, sol.walkFrame, sol.hp, sol.maxHp);
        } else if (sol.unitType === "nyan" || sol.unitType === "boss") {
          drawNyanCat(sol.x, SIEGE_GROUND_Y - 11, sol.direction, sol.walkFrame, sol.hp, sol.maxHp);
        } else if (sol.team !== "player" && sol.unitType === "grunt") {
          drawThemedGrunt(sol.x, SIEGE_GROUND_Y - 11, sol.direction, sol.walkFrame, sol.attackFrame, sol.colors, sol.hp, sol.maxHp, sol.theme || "cat");
        } else if (sol.unitType === "archer") {
          drawPixelSoldier(sol.x, SIEGE_GROUND_Y - 11, sol.direction, sol.walkFrame, sol.attackFrame, sol.colors, sol.hp, sol.maxHp);
          // Bow on top
          const bx = (sol.direction > 0 ? sol.x + 5 : sol.x - 1) * SIEGE_PS;
          const by = (SIEGE_GROUND_Y - 7) * SIEGE_PS;
          ctx.strokeStyle = "#8a6030"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(bx, by, 6, -0.8, 0.8); ctx.stroke();
          ctx.strokeStyle = "#c0a060"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(bx + 5 * Math.cos(-0.8), by + 5 * Math.sin(-0.8));
          ctx.lineTo(bx + 5 * Math.cos(0.8), by + 5 * Math.sin(0.8)); ctx.stroke();
        } else if (sol.unitType === "knight") {
          drawPixelKnight(sol.x, SIEGE_GROUND_Y - 13, sol.direction, sol.walkFrame, sol.attackFrame, sol.colors, sol.hp, sol.maxHp);
        } else {
          drawPixelSoldier(
            sol.x, SIEGE_GROUND_Y - 11,
            sol.direction, sol.walkFrame, sol.attackFrame,
            sol.colors, sol.hp, sol.maxHp
          );
        }
      });

      // Draw crashed ambulances (smoking wrecks)
      if (s.crashedAmbulances) {
        s.crashedAmbulances.forEach(ca => {
          drawAmbulance(ca.x, SIEGE_GROUND_Y - 11, ca.direction, ca.walkFrame, ca.maxTimer, ca.maxTimer);
          // Smoke rising from wreck
          const smokePhase = ca.smokeTimer * 0.06;
          for (let i = 0; i < 4; i++) {
            const sx = ca.x * SIEGE_PS + (3 + i * 2) * SIEGE_PS;
            const sy = (SIEGE_GROUND_Y - 12) * SIEGE_PS - Math.sin(smokePhase + i) * 8 - i * 6;
            const alpha = Math.max(0.1, 0.5 - i * 0.1);
            const radius = (3 + i * 1.5 + Math.sin(smokePhase * 0.5 + i * 0.7) * 1.5);
            ctx.fillStyle = `rgba(100,100,100,${alpha})`;
            ctx.beginPath();
            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
          // Darker smoke puffs
          for (let i = 0; i < 2; i++) {
            const sx = ca.x * SIEGE_PS + (4 + Math.sin(smokePhase * 1.3 + i * 3) * 2) * SIEGE_PS;
            const sy = (SIEGE_GROUND_Y - 14) * SIEGE_PS - i * 12 - Math.abs(Math.sin(smokePhase * 0.8 + i)) * 10;
            ctx.fillStyle = `rgba(60,60,60,${0.3 + Math.sin(smokePhase + i) * 0.1})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 4 + Math.sin(smokePhase * 0.4 + i * 2) * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Draw corpses (soldiers lying on ground)
      if (s.corpses) {
        s.corpses.forEach(c => {
          const cx = c.x * SIEGE_PS;
          const cy = c.y * SIEGE_PS;
          // Draw lying-down soldier (horizontal body)
          const ps = SIEGE_PS;
          // Body (horizontal)
          ctx.fillStyle = c.colors ? c.colors.armor : "#808080";
          ctx.fillRect(cx - 3 * ps, cy, 8 * ps, 2 * ps);
          // Head
          ctx.fillStyle = "#f5d0b0";
          ctx.fillRect(cx + (c.direction > 0 ? -4 : 5) * ps, cy - 1 * ps, 2 * ps, 2 * ps);
          // Legs
          ctx.fillStyle = c.colors ? c.colors.boots : "#5a3a0e";
          ctx.fillRect(cx + (c.direction > 0 ? 5 : -5) * ps, cy, 3 * ps, 2 * ps);
          if (c.hp <= 0) {
            // Blood pool — grows slowly
            const poolSize = Math.min(6, c.bleedTimer * 0.02);
            ctx.fillStyle = "rgba(160,20,20,0.6)";
            ctx.beginPath();
            ctx.ellipse(cx + 2 * ps, cy + 2 * ps, poolSize * ps, poolSize * 0.4 * ps, 0, 0, Math.PI * 2);
            ctx.fill();
            // Blood drops
            c.bloodDrops.forEach(bd => {
              ctx.fillStyle = "rgba(140,15,15,0.8)";
              ctx.beginPath();
              ctx.arc(cx + bd.dx * ps, cy + bd.dy * ps, bd.size * ps * 0.4, 0, Math.PI * 2);
              ctx.fill();
            });
          }
        });
      }

      // Draw ragdolls (soldiers flying through air)
      if (s.ragdolls) {
        s.ragdolls.forEach(r => {
          ctx.save();
          ctx.translate(r.x, r.y);
          ctx.rotate(r.rotation);
          const ps = SIEGE_PS;
          // Body
          ctx.fillStyle = r.colors ? r.colors.armor : "#808080";
          ctx.fillRect(-3 * ps, -2 * ps, 6 * ps, 4 * ps);
          // Head
          ctx.fillStyle = "#f5d0b0";
          ctx.fillRect(-4 * ps, -3 * ps, 2 * ps, 2 * ps);
          // Limbs flailing
          ctx.fillStyle = r.colors ? r.colors.boots : "#5a3a0e";
          const flail = Math.sin(r.rotation * 3) * 2;
          ctx.fillRect(3 * ps, (-1 + flail) * ps, 2 * ps, 1 * ps);
          ctx.fillRect(3 * ps, (1 - flail) * ps, 2 * ps, 1 * ps);
          ctx.fillRect(-3 * ps, (-1 - flail) * ps, 1 * ps, 2 * ps);
          ctx.restore();
        });
      }

      // Draw flying arrows
      if (s.arrows) {
        s.arrows.forEach(a => {
          ctx.save();
          ctx.translate(a.x, a.y);
          ctx.rotate(Math.atan2(a.vy, a.vx));
          // Shaft
          ctx.fillStyle = "#6a4a2a";
          ctx.fillRect(-8, -1, 16, 2);
          // Tip
          ctx.fillStyle = "#c0c0c0";
          ctx.beginPath();
          ctx.moveTo(-11, 0); ctx.lineTo(-8, -3); ctx.lineTo(-8, 3); ctx.closePath(); ctx.fill();
          // Fletching
          ctx.fillStyle = "#e0e0e0";
          ctx.fillRect(6, -3, 3, 2);
          ctx.fillRect(6, 1, 3, 2);
          ctx.restore();
        });
      }

      // Draw stuck arrows
      if (s.stuckArrows) {
        ctx.fillStyle = "#5a3a1a";
        s.stuckArrows.forEach(a => {
          ctx.save();
          ctx.translate(a.x, a.y);
          ctx.rotate(a.angle);
          ctx.fillRect(0, -1, 12, 2);
          // Fletching
          ctx.fillStyle = "#c0c0c0";
          ctx.fillRect(8, -3, 4, 2);
          ctx.fillRect(8, 1, 4, 2);
          // Tip
          ctx.fillStyle = "#808080";
          ctx.fillRect(-3, -2, 3, 4);
          ctx.restore();
        });
      }

      // Draw flying musical notes
      if (s.notes) {
        s.notes.forEach(n => {
          ctx.fillStyle = n.color;
          // Note head (filled oval)
          ctx.beginPath();
          ctx.ellipse(n.x, n.y, 4, 3, -0.3, 0, Math.PI * 2);
          ctx.fill();
          // Stem
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(n.x + 3.5, n.y);
          ctx.lineTo(n.x + 3.5, n.y - 10);
          ctx.stroke();
          // Flag
          ctx.beginPath();
          ctx.moveTo(n.x + 3.5, n.y - 10);
          ctx.quadraticCurveTo(n.x + 8, n.y - 7, n.x + 3.5, n.y - 5);
          ctx.stroke();
        });
      }

      // Castle HP bars at top of canvas
      ctx.save();
      // Player castle HP
      const barY = 6;
      const barH = 10;
      const barW = 120;
      ctx.fillStyle = "#1a1a2a";
      ctx.fillRect(12, barY, barW + 4, barH + 4);
      ctx.fillStyle = "#0f0f1a";
      ctx.fillRect(14, barY + 2, barW, barH);
      const pFill = Math.max(0, barW * playerHpR);
      ctx.fillStyle = playerHpR > 0.5 ? "#22c55e" : playerHpR > 0.25 ? "#eab308" : "#ef4444";
      ctx.fillRect(14, barY + 2, pFill, barH);
      ctx.fillStyle = "#f0f0f0";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`DITT SLOTT ${Math.round(s.playerCastleHp)}/${s.playerCastleMaxHp}`, 14, barY + barH + 14);

      // Enemy castle HP
      const eBarX = canvas.width - barW - 16;
      ctx.fillStyle = "#1a1a2a";
      ctx.fillRect(eBarX, barY, barW + 4, barH + 4);
      ctx.fillStyle = "#0f0f1a";
      ctx.fillRect(eBarX + 2, barY + 2, barW, barH);
      const eFill = Math.max(0, barW * enemyHpR);
      ctx.fillStyle = enemyHpR > 0.5 ? "#ef4444" : enemyHpR > 0.25 ? "#eab308" : "#22c55e";
      ctx.fillRect(eBarX + 2 + barW - eFill, barY + 2, eFill, barH);
      ctx.fillStyle = "#f0f0f0";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`FIENDE ${Math.round(s.enemyCastleHp)}/${s.enemyCastleMaxHp}`, canvas.width - 14, barY + barH + 14);

      // Soldier count indicators
      ctx.textAlign = "left";
      ctx.fillStyle = "#c0d0f0";
      ctx.font = "bold 9px monospace";
      ctx.fillText(`⚔ ${s.playerSoldiers.length}`, 14, barY + barH + 26);
      ctx.textAlign = "right";
      ctx.fillStyle = "#f0c0c0";
      ctx.fillText(`${s.enemySoldiers.length} ⚔`, canvas.width - 14, barY + barH + 26);

      // Top buttons: MENY | SPRÅK | GE UPP
      const sBtnH = 16, sBtnW = 52;
      const totalW = sBtnW * 3 + 8;
      const startX = canvas.width / 2 - totalW / 2;
      // MENY
      ctx.fillStyle = "rgba(15,23,42,0.85)"; ctx.fillRect(startX, 2, sBtnW, sBtnH);
      ctx.strokeStyle = "#4080c0"; ctx.lineWidth = 1; ctx.strokeRect(startX, 2, sBtnW, sBtnH);
      ctx.fillStyle = "#a0c0e0"; ctx.font = "bold 9px monospace"; ctx.textAlign = "center";
      ctx.fillText("MENY", startX + sBtnW / 2, 14);
      s.menuBtnBounds = { x: startX, y: 2, w: sBtnW, h: sBtnH };
      // SPRÅK flip
      const flipX = startX + sBtnW + 4;
      const flipLabel = siegeFlipped ? "EN→SV" : "SV→EN";
      ctx.fillStyle = "rgba(20,50,20,0.85)"; ctx.fillRect(flipX, 2, sBtnW, sBtnH);
      ctx.strokeStyle = "#40a060"; ctx.lineWidth = 1; ctx.strokeRect(flipX, 2, sBtnW, sBtnH);
      ctx.fillStyle = "#80e0a0"; ctx.font = "bold 8px monospace";
      ctx.fillText(flipLabel, flipX + sBtnW / 2, 14);
      s.flipBtnBounds = { x: flipX, y: 2, w: sBtnW, h: sBtnH };
      // GE UPP
      const giveUpX = flipX + sBtnW + 4;
      ctx.fillStyle = "rgba(80,15,15,0.85)"; ctx.fillRect(giveUpX, 2, sBtnW, sBtnH);
      ctx.strokeStyle = "#c03030"; ctx.lineWidth = 1; ctx.strokeRect(giveUpX, 2, sBtnW, sBtnH);
      ctx.fillStyle = "#ff6060"; ctx.font = "bold 9px monospace";
      ctx.fillText("GE UPP", giveUpX + sBtnW / 2, 14);
      s.giveUpBtnBounds = { x: giveUpX, y: 2, w: sBtnW, h: sBtnH };
      ctx.restore();

      // Countdown or Glosa display
      if (s.countdownEndsAt > Date.now()) {
        // Countdown overlay
        const remain = Math.ceil((s.countdownEndsAt - Date.now()) / 1000);
        ctx.save();
        ctx.fillStyle = "rgba(15,23,42,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f0e040";
        ctx.font = "bold 60px monospace";
        ctx.textAlign = "center";
        ctx.fillText(String(remain), canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillStyle = "#80c0f0";
        ctx.font = "bold 16px monospace";
        ctx.fillText("GÖR DIG REDO", canvas.width / 2, canvas.height / 2 + 30);
        ctx.restore();
      } else if (s.glosaText) {
        ctx.save();
        const textW = 320;
        const textH = 38;
        const textX = (canvas.width - textW) / 2;
        const textY = 42;
        ctx.fillStyle = "#0f0f1a";
        ctx.fillRect(textX - 3, textY - 3, textW + 6, textH + 6);
        ctx.fillStyle = "#2a3a5a";
        ctx.fillRect(textX - 1, textY - 1, textW + 2, textH + 2);
        ctx.fillStyle = "rgba(10,16,32,0.88)";
        ctx.fillRect(textX, textY, textW, textH);
        ctx.fillStyle = "#60a0e0";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("ÖVERSÄTT:", canvas.width / 2, textY + 11);
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 16px monospace";
        ctx.fillText(s.glosaText, canvas.width / 2, textY + 30);
        ctx.restore();
      }

      // Glosa progress bar + trophy (center bottom area)
      if (s.totalWords > 0) {
        ctx.save();
        const pBarW = 200, pBarH = 10;
        const pBarX = canvas.width / 2 - pBarW / 2;
        const pBarY = canvas.height - 86;
        const pct = Math.min(1, s.answeredWords / s.totalWords);
        const correctPct = s.totalWords > 0 ? s.correctWords / s.totalWords : 0;

        // Background
        ctx.fillStyle = "#0a1020";
        ctx.fillRect(pBarX - 1, pBarY - 1, pBarW + 2, pBarH + 2);
        // Fill — gradient from red to yellow to green
        const fillW = pBarW * pct;
        if (fillW > 0) {
          const grad = ctx.createLinearGradient(pBarX, 0, pBarX + pBarW, 0);
          grad.addColorStop(0, "#e04040");
          grad.addColorStop(0.3, "#e08020");
          grad.addColorStop(0.5, "#e0c020");
          grad.addColorStop(0.7, "#80c020");
          grad.addColorStop(1, "#20d040");
          ctx.fillStyle = grad;
          ctx.fillRect(pBarX, pBarY, fillW, pBarH);
        }
        ctx.strokeStyle = "#2a3a5a"; ctx.lineWidth = 1;
        ctx.strokeRect(pBarX - 1, pBarY - 1, pBarW + 2, pBarH + 2);

        // Text
        ctx.fillStyle = "#c0d0e0"; ctx.font = "bold 8px monospace"; ctx.textAlign = "center";
        ctx.fillText(`${s.correctWords}/${s.totalWords} rätt (${Math.round(correctPct * 100)}%)`, canvas.width / 2, pBarY - 3);

        // Trophy indicators (1x=wood, 3x=bronze, 5x=silver, 10x=gold)
        const weekId = arena.siege.selectedBossId ? appState.selectedWeekId : "";
        const perfectCount = weekId ? getSiegePerfectCount(weekId) : 0;
        const trophyY = pBarY + pBarH + 10;
        const trophies = [
          { need: 1, label: "🪵", color: "#8b6914", name: "TRÄ" },
          { need: 3, label: "🥉", color: "#c08040", name: "BRONS" },
          { need: 5, label: "🥈", color: "#c0c0d0", name: "SILVER" },
          { need: 10, label: "🥇", color: "#f0d040", name: "GULD" },
        ];
        trophies.forEach((t, i) => {
          const tx = canvas.width / 2 - 70 + i * 40;
          const achieved = perfectCount >= t.need;
          ctx.globalAlpha = achieved ? 1 : 0.2;
          ctx.font = "12px sans-serif";
          ctx.fillText(t.label, tx, trophyY);
          ctx.font = "bold 6px monospace";
          ctx.fillStyle = achieved ? t.color : "#404050";
          ctx.fillText(`${t.need}x`, tx, trophyY + 9);
        });
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Left box — Answer input
      {
        ctx.save();
        const boxX = 12;
        const boxY = canvas.height - 70;
        const boxW = 300;
        const boxH = 50;
        // Frame
        ctx.fillStyle = "#0f0f1a";
        ctx.fillRect(boxX - 3, boxY - 3, boxW + 6, boxH + 6);
        ctx.fillStyle = "#1a2a4a";
        ctx.fillRect(boxX - 1, boxY - 1, boxW + 2, boxH + 2);
        ctx.fillStyle = "rgba(10,16,32,0.95)";
        ctx.fillRect(boxX, boxY, boxW, boxH);

        // "SVAR:" label
        ctx.fillStyle = "#4080c0";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "left";
        ctx.fillText("SVAR:", boxX + 8, boxY + 16);

        // Typed text
        ctx.fillStyle = "#f0f0f0";
        ctx.font = "bold 16px monospace";
        const typed = s.answerText || "";
        ctx.fillText(typed, boxX + 58, boxY + 18);

        // Blinking cursor
        if (!s.gameOver && Math.floor(Date.now() / 500) % 2 === 0) {
          const cursorX = boxX + 58 + ctx.measureText(typed).width + 2;
          ctx.fillStyle = "#60a0e0";
          ctx.fillRect(cursorX, boxY + 5, 10, 16);
        }
        ctx.restore();
      }

      // Right box — Feedback (RÄTT/FEL)
      {
        ctx.save();
        const rBoxW = 300;
        const rBoxX = canvas.width - rBoxW - 12;
        const rBoxY = canvas.height - 70;
        const rBoxH = 50;
        // Frame
        ctx.fillStyle = "#0f0f1a";
        ctx.fillRect(rBoxX - 3, rBoxY - 3, rBoxW + 6, rBoxH + 6);
        ctx.fillStyle = "#1a2a4a";
        ctx.fillRect(rBoxX - 1, rBoxY - 1, rBoxW + 2, rBoxH + 2);
        ctx.fillStyle = "rgba(10,16,32,0.95)";
        ctx.fillRect(rBoxX, rBoxY, rBoxW, rBoxH);

        if (s.glosaFeedback && Date.now() < s.glosaFeedback.expiresAt) {
          const fb = s.glosaFeedback;
          const age = Date.now() - fb.startedAt;
          const alpha = age < fb.duration - 500 ? 1 : Math.max(0.15, 1 - (age - (fb.duration - 500)) / 500);
          ctx.globalAlpha = alpha;

          // RÄTT / FEL in big bold text
          ctx.fillStyle = fb.color;
          ctx.font = "bold 18px monospace";
          ctx.textAlign = "left";
          ctx.fillText(fb.text, rBoxX + 10, rBoxY + 20);

          // Sub-text (correct answer or XP) on second line
          if (fb.sub) {
            ctx.fillStyle = "#e0e0e0";
            ctx.font = "bold 12px monospace";
            let subText = fb.sub;
            if (ctx.measureText(subText).width > rBoxW - 20) {
              while (ctx.measureText(subText + "...").width > rBoxW - 20 && subText.length > 0) {
                subText = subText.slice(0, -1);
              }
              subText += "...";
            }
            ctx.fillText(subText, rBoxX + 10, rBoxY + 40);
          }
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      }

      // Enemy feed — pixel text above right box
      if (s.enemyFeed.length > 0) {
        ctx.save();
        const feedX = canvas.width - 14;
        const feedBaseY = canvas.height - 72;
        const maxLines = Math.min(3, s.enemyFeed.length);
        for (let i = 0; i < maxLines; i++) {
          const entry = s.enemyFeed[i];
          const age = Date.now() - entry.time;
          const alpha = Math.max(0, 1 - age / entry.duration);
          if (alpha <= 0) continue;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = entry.good ? "#60e060" : "#f06060";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "right";
          ctx.fillText(entry.text, feedX, feedBaseY + i * 11);
        }
        s.enemyFeed = s.enemyFeed.filter(e => Date.now() - e.time < e.duration);
        ctx.restore();
      }

      // Defeat animation — castle crumble debris
      if (s.defeatAnim) {
        const da = s.defeatAnim;
        ctx.save();
        da.debris = da.debris.filter(d => {
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.12;
          d.rot += d.vr;
          d.life--;
          if (d.life <= 0) return false;
          ctx.save();
          ctx.translate(d.x, d.y);
          ctx.rotate(d.rot);
          ctx.fillStyle = d.color;
          ctx.globalAlpha = Math.min(1, d.life / 20);
          ctx.fillRect(-d.size / 2, -d.size / 2, d.size, d.size);
          ctx.restore();
          return true;
        });
        ctx.restore();
      }

      // Victory animation — flag hoisting on enemy castle
      if (s.victoryAnim) {
        const va = s.victoryAnim;
        const elapsed = Date.now() - va.startMs;
        const fx = va.flagX;
        const baseY = va.flagBaseY;
        ctx.save();
        // Phase 1 (0-800ms): small flag lowers
        // Phase 2 (800-1600ms): pole grows upward
        // Phase 3 (1600-3000ms): big flag hoists up
        if (elapsed < 800) {
          // Small flag slides down
          const drop = Math.min(1, elapsed / 800) * 15;
          ctx.strokeStyle = "#3a2a0e"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(fx, baseY); ctx.lineTo(fx, baseY + drop); ctx.stroke();
        } else if (elapsed < 1600) {
          // Pole grows upward
          const growPct = Math.min(1, (elapsed - 800) / 800);
          const poleH = 50 * growPct;
          ctx.strokeStyle = "#c0a060"; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(fx, baseY); ctx.lineTo(fx, baseY - poleH); ctx.stroke();
          // Gold ball on top
          if (growPct > 0.8) {
            ctx.fillStyle = "#f0d040";
            ctx.beginPath(); ctx.arc(fx, baseY - poleH, 3, 0, Math.PI * 2); ctx.fill();
          }
        } else {
          // Full pole
          const poleH = 50;
          ctx.strokeStyle = "#c0a060"; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(fx, baseY); ctx.lineTo(fx, baseY - poleH); ctx.stroke();
          ctx.fillStyle = "#f0d040";
          ctx.beginPath(); ctx.arc(fx, baseY - poleH, 3, 0, Math.PI * 2); ctx.fill();
          // Big flag hoists up
          const hoistPct = Math.min(1, (elapsed - 1600) / 1000);
          const flagY = baseY - poleH * hoistPct;
          const flagW = 36, flagH = 22;
          const wave = Math.sin(elapsed / 150) * 3;
          ctx.fillStyle = "#e02020";
          ctx.beginPath();
          ctx.moveTo(fx + 2, flagY);
          ctx.lineTo(fx + 2 + flagW + wave, flagY + flagH * 0.3);
          ctx.lineTo(fx + 2 + flagW - wave, flagY + flagH * 0.7);
          ctx.lineTo(fx + 2, flagY + flagH);
          ctx.closePath();
          ctx.fill();
          // Star on flag
          ctx.fillStyle = "#f0d040"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
          ctx.fillText("★", fx + 2 + flagW / 2 + wave / 2, flagY + flagH / 2 + 5);
        }
        ctx.restore();
      }

      // Game over overlay with buttons
      if (s.gameOver) {
        ctx.save();
        ctx.fillStyle = "rgba(15,23,42,0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = s.winner === "player" ? "#22c55e" : "#ef4444";
        ctx.font = "bold 36px monospace";
        ctx.textAlign = "center";
        ctx.fillText(s.winner === "player" ? "SEGER!" : "NEDLAG!", canvas.width / 2, canvas.height / 2 - 40);
        ctx.fillStyle = "#f0f0f0";
        ctx.font = "bold 16px monospace";
        ctx.fillText(s.winner === "player" ? "Fiendens slott föll!" : "Ditt slott föll...", canvas.width / 2, canvas.height / 2 - 14);

        // Buttons
        const btnW = 160;
        const btnH = 32;
        const btnY = canvas.height / 2 + 20;
        const playBtnX = canvas.width / 2 - btnW - 10;
        const menuBtnX = canvas.width / 2 + 10;

        // SPELA IGEN
        ctx.fillStyle = "#0f0f1a";
        ctx.fillRect(playBtnX - 2, btnY - 2, btnW + 4, btnH + 4);
        ctx.fillStyle = "#1e7a1e";
        ctx.fillRect(playBtnX, btnY, btnW, btnH);
        ctx.strokeStyle = "#30c030";
        ctx.lineWidth = 2;
        ctx.strokeRect(playBtnX, btnY, btnW, btnH);
        ctx.fillStyle = "#f0f0f0";
        ctx.font = "bold 14px monospace";
        ctx.fillText("SPELA IGEN", playBtnX + btnW / 2, btnY + 22);

        // MENY
        ctx.fillStyle = "#0f0f1a";
        ctx.fillRect(menuBtnX - 2, btnY - 2, btnW + 4, btnH + 4);
        ctx.fillStyle = "#2050c0";
        ctx.fillRect(menuBtnX, btnY, btnW, btnH);
        ctx.strokeStyle = "#4080f0";
        ctx.lineWidth = 2;
        ctx.strokeRect(menuBtnX, btnY, btnW, btnH);
        ctx.fillStyle = "#f0f0f0";
        ctx.font = "bold 14px monospace";
        ctx.fillText("MENY", menuBtnX + btnW / 2, btnY + 22);

        s.gameOverButtons = { playBtnX, menuBtnX, btnY, btnW, btnH };
        ctx.restore();
      }

      ctx.imageSmoothingEnabled = prevSmoothing;
    }

    // ─── END SIEGE MODE ─────────────────────────────────────────────────

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

    // ─── ADVENTURE MODE (FF2-style turn-based RPG) ──────────────────
    const ADV_PS = 4; // pixel scale — each "pixel" = 4×4 canvas pixels
    const ADV_HERO_HOME_X = 120; // heroes' home X (left side)
    const ADV_BOSS_X = 540; // boss home X (right side)
    const ADV_GROUND_Y = 330; // ground line
    const ADV_ATTACK_TARGET_X = 420; // where heroes run to when attacking

    // Pixel helper (canvas coords, scaled by ADV_PS)
    function advPx(x, y, w, h, color) {
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w * ADV_PS, h * ADV_PS);
    }

    // ── CLOUD FFRK SPRITE HERO ──────────────────────────────────────
    // Uses pre-rendered Cloud sprite images instead of pixel art
    // Sprite draw size: scaled to match ~64×112 canvas area (16×28 @ ADV_PS=4)
    const ADV_HERO_W = 80;   // draw width on canvas
    const ADV_HERO_H = 100;  // draw height on canvas

    function _heroImgReady(key) {
      const img = arena.images["hero_" + key];
      return img && img.complete && img.naturalWidth > 0 ? img : null;
    }

    function drawAdventureHero(x, y, heroIndex, frame, pose) {
      const s = ADV_PS;
      const cx = x + 8 * s;  // center X of old 16px sprite area

      // Shadow on ground
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.beginPath();
      ctx.ellipse(cx, y + 28 * s, 7 * s, 1.5 * s, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sprite anchor: center-bottom aligned to ground (y + 28*s)
      const groundY = y + 28 * s;
      const drawW = ADV_HERO_W;
      const drawH = ADV_HERO_H;
      const drawX = cx - drawW / 2;
      const drawBaseY = groundY - drawH;

      if (pose === "dead") {
        const idleImg = _heroImgReady("idle");
        if (!idleImg) return;
        ctx.save();
        ctx.globalAlpha = 0.35;
        ctx.translate(cx, groundY - drawH / 2);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(idleImg, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
        return;
      }

      if (pose === "attack") {
        _drawHeroAttackSprite(cx, groundY, drawW, drawH, frame);
        return;
      }

      if (pose === "hurt") {
        const idleImg = _heroImgReady("idle");
        if (!idleImg) return;
        const jx = Math.sin(frame * 1.2) * 4;
        ctx.save();
        if (Math.floor(frame * 0.5) % 2) ctx.globalAlpha = 0.5;
        ctx.drawImage(idleImg, drawX + jx, drawBaseY, drawW, drawH);
        ctx.restore();
        return;
      }

      if (pose === "defend") {
        const idleImg = _heroImgReady("idle");
        if (!idleImg) return;
        const pulse = Math.sin(frame * 0.1) * 0.5;
        // Crouched: draw slightly smaller + lower
        ctx.save();
        ctx.drawImage(idleImg, drawX + 2, drawBaseY + 10, drawW - 4, drawH - 10);
        // Shield glow overlay
        ctx.globalAlpha = 0.18 + pulse * 0.1;
        ctx.fillStyle = "#80c0ff";
        ctx.fillRect(drawX - 4, drawBaseY + 8, drawW + 8, drawH - 6);
        ctx.restore();
        return;
      }

      if (pose === "cast") {
        const idleImg = _heroImgReady("idle");
        if (!idleImg) return;
        ctx.drawImage(idleImg, drawX, drawBaseY, drawW, drawH);
        // Magic particles above hero
        const glowPhase = frame * 0.15;
        for (let i = 0; i < 6; i++) {
          const angle = glowPhase + (i / 6) * Math.PI * 2;
          const gx = cx + Math.cos(angle) * 20;
          const gy = drawBaseY - 10 + Math.sin(angle) * 10;
          ctx.save();
          ctx.globalAlpha = 0.5 + Math.sin(glowPhase + i) * 0.3;
          ctx.fillStyle = i % 2 ? "#80ff80" : "#40c040";
          ctx.beginPath();
          ctx.arc(gx, gy, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        return;
      }

      if (pose === "walk") {
        const idleImg = _heroImgReady("idle");
        if (!idleImg) return;
        // Walk bob: up/down oscillation
        const walkBob = Math.sin(frame * 0.25) * 3;
        ctx.drawImage(idleImg, drawX, drawBaseY + walkBob, drawW, drawH);
        return;
      }

      // Default: idle — gentle breathing bob
      const idleImg = _heroImgReady("idle");
      if (!idleImg) return;
      const bob = Math.sin(frame * 0.06) * 2;
      ctx.drawImage(idleImg, drawX, drawBaseY + bob, drawW, drawH);
    }

    function _drawHeroAttackSprite(cx, groundY, drawW, drawH, frame) {
      const bodyImg = _heroImgReady("body");
      const swordImg = _heroImgReady("sword");
      const idleImg = _heroImgReady("idle");

      // If body/sword not loaded, fall back to idle
      if (!bodyImg || !swordImg) {
        if (idleImg) {
          ctx.drawImage(idleImg, cx - drawW / 2, groundY - drawH, drawW, drawH);
        }
        return;
      }

      // Swing phases: wind-up → swing → follow-through
      const swingPhase = Math.min(1, frame * 0.12);

      // Draw body (leaning forward slightly during attack)
      const leanX = swingPhase < 0.5 ? swingPhase * 6 : 3;
      ctx.drawImage(bodyImg, cx - drawW / 2 - leanX, groundY - drawH, drawW, drawH);

      // Sword: pivot from hero's right shoulder area
      const pivotX = cx + drawW * 0.15;
      const pivotY = groundY - drawH * 0.55;

      // Sword angle: raised behind (-2.2 rad) → slashed forward (+1.0 rad)
      const swordAngle = -2.2 + swingPhase * 3.2;

      // Sword dimensions (scale relative to sprite)
      const swordW = swordImg.naturalWidth * 1.8;
      const swordH = swordImg.naturalHeight * 1.8;

      ctx.save();
      ctx.translate(pivotX, pivotY);
      ctx.rotate(swordAngle);
      // Draw sword with blade extending away from pivot
      ctx.drawImage(swordImg, -swordW * 0.15, -swordH * 0.85, swordW, swordH);
      ctx.restore();

      // Slash trail arc (at peak of swing)
      if (swingPhase > 0.4 && swingPhase < 0.9) {
        ctx.save();
        ctx.globalAlpha = 0.5 * (1 - (swingPhase - 0.4) / 0.5);
        ctx.strokeStyle = "#e0e8ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, swordH * 0.8, -2.8, -2.8 + swingPhase * 3.5, false);
        ctx.stroke();
        ctx.restore();
      }
    }

    // ── BOSS SPRITE (uses actual boss images from /images/bosses/) ──
    function drawAdventureBoss(x, y, bossId, frame, hpRatio) {
      const boss = SIEGE_BOSSES.find(b => b.id === bossId) || SIEGE_BOSSES[0];
      const rosterBoss = bossRoster.find(b => b.id === bossId);
      // Prefer adventure FFRK sprite, fall back to regular boss image
      const advImage = arena.images["adv_" + bossId];
      const advReady = advImage && advImage.complete && advImage.naturalWidth > 0;
      const image = advReady ? advImage : arena.images[bossId];
      const imageReady = image && image.complete && image.naturalWidth > 0;

      const bob = Math.sin(frame * 0.03) * 4;
      const bY = y + bob;
      const dmgFlash = hpRatio < 0.3 && Math.sin(frame * 0.2) > 0.4;

      // Target draw size — fit within right side of canvas
      const maxW = 240, maxH = 260;
      let drawW = maxW;
      let drawH = maxH;
      if (imageReady) {
        const aspect = image.naturalWidth / image.naturalHeight;
        // Fit within maxW × maxH while preserving aspect ratio
        if (aspect > maxW / maxH) {
          drawW = maxW;
          drawH = maxW / aspect;
        } else {
          drawH = maxH;
          drawW = maxH * aspect;
        }
      }
      // Center boss at x position (no extra offset)
      const centerX = x + drawW / 2;

      // Shadow on ground
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.ellipse(centerX, y + drawH + 10, drawW * 0.45, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      // Damage flash — red tint overlay
      if (dmgFlash) {
        ctx.globalAlpha = 0.6;
      }

      if (imageReady) {
        // Draw boss image flipped horizontally (facing left toward heroes)
        ctx.imageSmoothingEnabled = false;
        ctx.save();
        ctx.translate(centerX, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(image, -drawW / 2, bY, drawW, drawH);
        ctx.restore();
      } else {
        // Fallback: colored rectangle with boss icon
        ctx.fillStyle = (rosterBoss && rosterBoss.color) || "#444";
        ctx.fillRect(centerX - drawW / 2, bY, drawW, drawH);
        ctx.font = "80px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(boss.icon || "?", centerX, bY + drawH / 2);
      }

      // Damage red overlay
      if (dmgFlash) {
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(centerX - drawW / 2, bY, drawW, drawH);
      }
      ctx.restore();

      // Boss name above — use SIEGE_BOSSES name (bossRoster doesn't have all bosses)
      ctx.save();
      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 5;
      ctx.fillText(boss.name, centerX, bY - 12);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // ── HP BAR ──────────────────────────────────────────────────────
    function drawAdvHpBar(x, y, w, h, hp, maxHp, color) {
      const ratio = Math.max(0, hp / maxHp);
      ctx.fillStyle = "#0a0a1e";
      ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(x, y, w, h);
      const barColor = ratio > 0.5 ? (color || "#22c55e") : ratio > 0.25 ? "#eab308" : "#ef4444";
      ctx.fillStyle = barColor;
      ctx.fillRect(x + 1, y + 1, (w - 2) * ratio, h - 2);
      // Highlight on bar
      ctx.fillStyle = "#ffffff20";
      ctx.fillRect(x + 1, y + 1, (w - 2) * ratio, Math.floor((h - 2) / 3));
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, w, h);
      ctx.save();
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 2;
      ctx.fillText(`${Math.ceil(hp)}/${maxHp}`, x + w / 2, y + h / 2);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // ── ANIMATION SYSTEM ────────────────────────────────────────────
    // Multi-phase attack: charge → swing → impact → return
    const ADV_ANIM_CHARGE = 18;  // frames running toward boss
    const ADV_ANIM_SWING  = 12;  // frames for sword swing
    const ADV_ANIM_IMPACT = 8;   // frames for hit pause
    const ADV_ANIM_RETURN = 16;  // frames running back
    const ADV_ANIM_TOTAL  = ADV_ANIM_CHARGE + ADV_ANIM_SWING + ADV_ANIM_IMPACT + ADV_ANIM_RETURN;

    const ADV_BOSS_ANIM_WINDUP = 15;
    const ADV_BOSS_ANIM_STRIKE = 10;
    const ADV_BOSS_ANIM_IMPACT = 10;
    const ADV_BOSS_ANIM_RETURN = 15;
    const ADV_BOSS_ANIM_TOTAL  = ADV_BOSS_ANIM_WINDUP + ADV_BOSS_ANIM_STRIKE + ADV_BOSS_ANIM_IMPACT + ADV_BOSS_ANIM_RETURN;

    function advGetHeroAnimPhase(animFrame) {
      const f = ADV_ANIM_TOTAL - animFrame; // convert countdown to count-up
      if (f < ADV_ANIM_CHARGE) return { phase: "charge", t: f / ADV_ANIM_CHARGE };
      if (f < ADV_ANIM_CHARGE + ADV_ANIM_SWING) return { phase: "swing", t: (f - ADV_ANIM_CHARGE) / ADV_ANIM_SWING };
      if (f < ADV_ANIM_CHARGE + ADV_ANIM_SWING + ADV_ANIM_IMPACT) return { phase: "impact", t: (f - ADV_ANIM_CHARGE - ADV_ANIM_SWING) / ADV_ANIM_IMPACT };
      return { phase: "return", t: (f - ADV_ANIM_CHARGE - ADV_ANIM_SWING - ADV_ANIM_IMPACT) / ADV_ANIM_RETURN };
    }

    function advGetBossAnimPhase(animFrame) {
      const f = ADV_BOSS_ANIM_TOTAL - animFrame;
      if (f < ADV_BOSS_ANIM_WINDUP) return { phase: "windup", t: f / ADV_BOSS_ANIM_WINDUP };
      if (f < ADV_BOSS_ANIM_WINDUP + ADV_BOSS_ANIM_STRIKE) return { phase: "strike", t: (f - ADV_BOSS_ANIM_WINDUP) / ADV_BOSS_ANIM_STRIKE };
      if (f < ADV_BOSS_ANIM_WINDUP + ADV_BOSS_ANIM_STRIKE + ADV_BOSS_ANIM_IMPACT) return { phase: "impact", t: (f - ADV_BOSS_ANIM_WINDUP - ADV_BOSS_ANIM_STRIKE) / ADV_BOSS_ANIM_IMPACT };
      return { phase: "return", t: (f - ADV_BOSS_ANIM_WINDUP - ADV_BOSS_ANIM_STRIKE - ADV_BOSS_ANIM_IMPACT) / ADV_BOSS_ANIM_RETURN };
    }

    // ── UPDATE LOOP ─────────────────────────────────────────────────
    function updateAdventure() {
      if (arena.mode !== "adventure" || !arena.adventure.active) return;
      const adv = arena.adventure;
      const now = Date.now();

      adv.damageNumbers = adv.damageNumbers.filter(d => now - d.startedAt < 1500);
      adv.particles = adv.particles.filter(p => now - p.startedAt < p.duration);

      if (adv.phase === "vocab") {
        const elapsed = now - adv.turnTimerStart;
        adv.turnTimer = Math.max(0, adv.turnDuration - elapsed);
        if (adv.turnTimer <= 0) {
          for (let i = 0; i < adv.heroes.length; i++) {
            if (!adv.answerResults.find(r => r.heroIndex === i)) {
              adv.answerResults.push({ heroIndex: i, correct: false });
            }
          }
          // Time ran out — show correct answer
          if (adv.currentGlosa) {
            adv.wrongQueue.push(adv.currentGlosa);
            adv.phase = "wrongReveal";
            adv.wrongRevealAnswer = adv.currentGlosa.en;
            adv.wrongRevealWord = adv.currentGlosa.sv;
            adv.wrongRevealStart = now;
          } else {
            advStartActionSelect();
          }
        }
      } else if (adv.phase === "wrongReveal") {
        if (now - adv.wrongRevealStart > 2500) {
          advStartActionSelect();
        }
      } else if (adv.phase === "playerTurn") {
        if (adv.playerAttackAnim > 0) {
          adv.playerAttackAnim--;
          const ap = advGetHeroAnimPhase(adv.playerAttackAnim);
          // Apply damage at the moment of impact
          if (ap.phase === "impact" && ap.t < 0.15) {
            const hero = adv.heroes[adv.playerAttackHero];
            if (hero && hero.actionChoice && !hero._actionApplied) {
              hero._actionApplied = true;
              advApplyHeroAction(adv.playerAttackHero, hero.actionChoice);
            }
          }
        } else {
          // Find next hero with an action
          let found = false;
          for (let i = adv.playerAttackHero + 1; i < adv.heroes.length; i++) {
            if (adv.heroes[i].actionChoice && adv.heroes[i].hp > 0) {
              adv.playerAttackHero = i;
              adv.playerAttackAnim = ADV_ANIM_TOTAL;
              adv.heroes[i]._actionApplied = false;
              found = true;
              break;
            }
          }
          if (!found) {
            adv.phase = "enemyTurn";
            adv.bossAttackAnim = ADV_BOSS_ANIM_TOTAL;
            adv.bossAttackTarget = advPickBossTarget();
            adv._bossActionApplied = false;
          }
        }
      } else if (adv.phase === "enemyTurn") {
        if (adv.bossAttackAnim > 0) {
          adv.bossAttackAnim--;
          const bp = advGetBossAnimPhase(adv.bossAttackAnim);
          if (bp.phase === "impact" && bp.t < 0.15 && !adv._bossActionApplied) {
            adv._bossActionApplied = true;
            advApplyBossAttack();
          }
        } else {
          if (adv.boss.hp <= 0) {
            adv.phase = "victory";
            adv.flashEffect = { color: "#fde68a", startedAt: now, duration: 2000 };
          } else if (adv.heroes.every(h => h.hp <= 0)) {
            adv.phase = "defeat";
            adv.flashEffect = { color: "#ef4444", startedAt: now, duration: 2000 };
          } else {
            advStartVocabPhase();
          }
        }
      }
    }

    function advStartVocabPhase() {
      const adv = arena.adventure;
      adv.roundNumber++;
      adv.phase = "vocab";
      adv.turnTimerStart = Date.now();
      adv.turnTimer = adv.turnDuration;
      adv.answerText = "";
      adv.answerResults = [];
      adv.actionMenuHero = -1;
      for (const h of adv.heroes) { h.actionChoice = null; h.defending = false; }
      if (adv.wordQueue.length === 0 && adv.wrongQueue.length > 0) {
        adv.wordQueue = [...adv.wrongQueue].sort(() => Math.random() - 0.5);
        adv.wrongQueue = [];
      }
      if (adv.wordQueue.length > 0) {
        adv.currentGlosa = adv.wordQueue.shift();
      }
    }

    function advStartActionSelect() {
      const adv = arena.adventure;
      adv.phase = "actionSelect";
      adv.actionMenuHero = -1;
      advNextActionHero();
    }

    function advNextActionHero() {
      const adv = arena.adventure;
      for (let i = adv.actionMenuHero + 1; i < adv.heroes.length; i++) {
        const result = adv.answerResults.find(r => r.heroIndex === i);
        if (result && result.correct && adv.heroes[i].hp > 0) {
          adv.actionMenuHero = i;
          return;
        }
      }
      adv.phase = "playerTurn";
      adv.playerAttackHero = -1;
      adv.playerAttackAnim = 0;
    }

    function advApplyHeroAction(heroIdx, action) {
      const adv = arena.adventure;
      const hero = adv.heroes[heroIdx];
      if (!hero || hero.hp <= 0) return;
      const now = Date.now();
      const bossCenter = ADV_BOSS_X + 100;

      if (action === "attack") {
        const dmg = 15 + Math.floor(Math.random() * 10);
        adv.boss.hp = Math.max(0, adv.boss.hp - dmg);
        adv.damageNumbers.push({ x: bossCenter, y: 100 + Math.random() * 60, text: `-${dmg}`, color: "#fff", startedAt: now });
        // Slash particles
        for (let i = 0; i < 8; i++) {
          adv.particles.push({
            x: bossCenter + (Math.random() - 0.5) * 60,
            y: 140 + (Math.random() - 0.5) * 40,
            color: i % 2 ? "#fde68a" : "#fff",
            startedAt: now, duration: 350 + Math.random() * 200,
          });
        }
      } else if (action === "heal") {
        const heal = 20 + Math.floor(Math.random() * 10);
        let target = adv.heroes.filter(h => h.hp > 0).sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
        if (target) {
          target.hp = Math.min(target.maxHp, target.hp + heal);
          const tIdx = adv.heroes.indexOf(target);
          const heroY = advGetHeroY(tIdx, adv.heroes.length);
          adv.damageNumbers.push({ x: ADV_HERO_HOME_X + 40, y: heroY, text: `+${heal}`, color: "#22c55e", startedAt: now });
          for (let i = 0; i < 6; i++) {
            adv.particles.push({
              x: ADV_HERO_HOME_X + 30 + Math.random() * 40,
              y: heroY + 20 + Math.random() * 40,
              color: "#40ff80", startedAt: now + i * 60, duration: 600,
            });
          }
        }
      } else if (action === "defend") {
        hero.defending = true;
      } else if (action === "special") {
        if (hero.specialCharge >= 3) {
          hero.specialCharge = 0;
          const dmg = 40 + Math.floor(Math.random() * 20);
          adv.boss.hp = Math.max(0, adv.boss.hp - dmg);
          adv.damageNumbers.push({ x: bossCenter, y: 80, text: `-${dmg}!`, color: "#fbbf24", startedAt: now });
          adv.flashEffect = { color: "#fbbf24", startedAt: now, duration: 400 };
          for (let i = 0; i < 14; i++) {
            adv.particles.push({
              x: bossCenter + (Math.random() - 0.5) * 120,
              y: 120 + (Math.random() - 0.5) * 80,
              color: ["#fbbf24", "#f59e0b", "#fff", "#fde68a"][i % 4],
              startedAt: now, duration: 500 + Math.random() * 300,
            });
          }
        }
      }
    }

    function advPickBossTarget() {
      const adv = arena.adventure;
      const alive = adv.heroes.map((h, i) => ({ h, i })).filter(x => x.h.hp > 0);
      if (!alive.length) return 0;
      return alive[Math.floor(Math.random() * alive.length)].i;
    }

    function advApplyBossAttack() {
      const adv = arena.adventure;
      const target = adv.heroes[adv.bossAttackTarget];
      if (!target || target.hp <= 0) return;
      const now = Date.now();
      let dmg = 12 + Math.floor(Math.random() * 8) + adv.roundNumber * 2;
      if (target.defending) {
        dmg = Math.floor(dmg / 2);
        target.defending = false;
      }
      target.hp = Math.max(0, target.hp - dmg);
      const heroY = advGetHeroY(adv.bossAttackTarget, adv.heroes.length);
      adv.damageNumbers.push({ x: ADV_HERO_HOME_X + 40, y: heroY, text: `-${dmg}`, color: "#ef4444", startedAt: now });
      for (let i = 0; i < 6; i++) {
        adv.particles.push({
          x: ADV_HERO_HOME_X + 20 + Math.random() * 50,
          y: heroY + 20 + Math.random() * 40,
          color: "#ef4444", startedAt: now, duration: 400,
        });
      }
      for (const h of adv.heroes) {
        if (h.hp > 0) h.specialCharge = Math.min(3, (h.specialCharge || 0) + 1);
      }
    }

    function advGetHeroY(idx, total) {
      const spacing = 90;
      const startY = ADV_GROUND_Y - 120;
      return startY + idx * spacing - (total - 1) * spacing / 2;
    }

    // ── DRAW MAIN SCENE ─────────────────────────────────────────────
    function drawAdventureMode() {
      const adv = arena.adventure;
      const w = canvas.width, h = canvas.height;

      // Dark RPG background with gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#06060f");
      grad.addColorStop(0.5, "#0e1428");
      grad.addColorStop(1, "#0a1018");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Ground with texture
      ctx.fillStyle = "#141e14";
      ctx.fillRect(0, ADV_GROUND_Y, w, h - ADV_GROUND_Y);
      ctx.fillStyle = "#1c2e1c";
      ctx.fillRect(0, ADV_GROUND_Y, w, 2);
      ctx.fillStyle = "#0e180e";
      ctx.fillRect(0, ADV_GROUND_Y + 2, w, 1);
      // Ground pixel texture
      for (let gx = 0; gx < w; gx += 16) {
        if ((gx * 7) % 48 < 16) {
          ctx.fillStyle = "#182818";
          ctx.fillRect(gx, ADV_GROUND_Y + 6 + (gx % 20), 8, 4);
        }
      }

      const heroCount = adv.heroes.length;

      // ── Draw heroes ──
      for (let i = 0; i < heroCount; i++) {
        const hero = adv.heroes[i];
        const homeX = ADV_HERO_HOME_X;
        const homeY = advGetHeroY(i, heroCount);
        let drawX = homeX;
        let drawY = homeY;
        let heroPose = "idle";

        if (hero.hp <= 0) {
          heroPose = "dead";
        } else if (hero.defending) {
          heroPose = "defend";
        }

        // Player turn animations
        if (adv.phase === "playerTurn" && adv.playerAttackHero === i && adv.playerAttackAnim > 0 && hero.hp > 0) {
          const ap = advGetHeroAnimPhase(adv.playerAttackAnim);
          const action = hero.actionChoice;
          if (action === "attack" || action === "special") {
            if (ap.phase === "charge") {
              // Ease-out run toward boss
              const t = 1 - Math.pow(1 - ap.t, 2);
              drawX = homeX + (ADV_ATTACK_TARGET_X - homeX) * t;
              heroPose = "walk";
            } else if (ap.phase === "swing") {
              drawX = ADV_ATTACK_TARGET_X;
              heroPose = "attack";
            } else if (ap.phase === "impact") {
              drawX = ADV_ATTACK_TARGET_X;
              heroPose = "idle";
            } else {
              // Return: ease-in run back
              const t = ap.t * ap.t;
              drawX = ADV_ATTACK_TARGET_X + (homeX - ADV_ATTACK_TARGET_X) * t;
              heroPose = "walk";
            }
          } else if (action === "heal") {
            heroPose = "cast";
          } else if (action === "defend") {
            heroPose = "defend";
          }
        }

        // Boss attack — hero recoils on impact
        if (adv.phase === "enemyTurn" && adv.bossAttackTarget === i && adv.bossAttackAnim > 0 && hero.hp > 0) {
          const bp = advGetBossAnimPhase(adv.bossAttackAnim);
          if (bp.phase === "impact") {
            heroPose = "hurt";
          }
        }

        drawAdventureHero(drawX, drawY, i, arena.phase * 50, heroPose);

        // HP bar
        drawAdvHpBar(homeX - 10, homeY + 29 * ADV_PS, 140, 14, hero.hp, hero.maxHp, "#22c55e");

        // Name
        ctx.save();
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = hero.hp > 0 ? "#ddd" : "#555";
        ctx.textAlign = "center";
        ctx.fillText(hero.name, homeX + 40, homeY + 29 * ADV_PS + 28);

        // Special charge pips
        if (hero.hp > 0) {
          const charge = hero.specialCharge || 0;
          for (let c = 0; c < 3; c++) {
            ctx.fillStyle = c < charge ? "#fbbf24" : "#222";
            ctx.fillRect(homeX + 10 + c * 18, homeY + 29 * ADV_PS + 33, 14, 5);
            if (c < charge) {
              ctx.fillStyle = "#ffe060";
              ctx.fillRect(homeX + 10 + c * 18, homeY + 29 * ADV_PS + 33, 14, 2);
            }
          }
        }
        ctx.restore();

        // Selection highlight
        if (adv.phase === "actionSelect" && adv.actionMenuHero === i) {
          ctx.save();
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2;
          const pulse = Math.sin(arena.phase * 3) * 0.3 + 0.7;
          ctx.globalAlpha = pulse;
          ctx.setLineDash([6, 4]);
          ctx.strokeRect(homeX - 15, homeY - 5, 160, 150);
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      // ── Draw boss ──
      if (adv.boss) {
        const bossHomeX = ADV_BOSS_X;
        const bossY = ADV_GROUND_Y - adv.boss.size;
        let bossDrawX = bossHomeX;

        if (adv.phase === "enemyTurn" && adv.bossAttackAnim > 0) {
          const bp = advGetBossAnimPhase(adv.bossAttackAnim);
          const targetX = ADV_HERO_HOME_X + 80;
          if (bp.phase === "windup") {
            bossDrawX = bossHomeX + bp.t * 30; // pull back
          } else if (bp.phase === "strike") {
            const t = 1 - Math.pow(1 - bp.t, 3);
            bossDrawX = bossHomeX + 30 - (bossHomeX + 30 - targetX) * t; // lunge forward
          } else if (bp.phase === "impact") {
            bossDrawX = targetX;
          } else {
            const t = bp.t * bp.t;
            bossDrawX = targetX + (bossHomeX - targetX) * t; // return
          }
        }

        drawAdventureBoss(bossDrawX, bossY, adv.boss.id, arena.phase * 50, adv.boss.hp / adv.boss.maxHp);
        drawAdvHpBar(bossHomeX, ADV_GROUND_Y + 10, 260, 18, adv.boss.hp, adv.boss.maxHp, "#ef4444");
      }

      // ── Damage numbers ──
      for (const dn of adv.damageNumbers) {
        const age = Date.now() - dn.startedAt;
        const alpha = Math.max(0, 1 - age / 1500);
        const floatY = dn.y - age * 0.05;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 3;
        ctx.fillStyle = dn.color;
        ctx.fillText(dn.text, dn.x, floatY);
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ── Particles ──
      for (const p of adv.particles) {
        const age = Date.now() - p.startedAt;
        if (age < 0) continue; // delayed particles
        const alpha = Math.max(0, 1 - age / p.duration);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        const spread = age * 0.12;
        const angle = (p.x * 3 + p.y * 7) % (Math.PI * 2) + age * 0.008;
        ctx.fillRect(p.x + Math.cos(angle) * spread, p.y + Math.sin(angle) * spread - age * 0.02, 5, 5);
        ctx.restore();
      }

      // ── Flash effect ──
      if (adv.flashEffect) {
        const age = Date.now() - adv.flashEffect.startedAt;
        if (age < adv.flashEffect.duration) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, 0.35 * (1 - age / adv.flashEffect.duration));
          ctx.fillStyle = adv.flashEffect.color;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }
      }

      // ── UI OVERLAYS ──
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (adv.phase === "vocab") {
        // Timer bar
        const timerRatio = adv.turnTimer / adv.turnDuration;
        const barW = 300, barH = 8, barX = w / 2 - barW / 2, barY = 20;
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = timerRatio > 0.3 ? "#3b82f6" : "#ef4444";
        ctx.fillRect(barX, barY, barW * timerRatio, barH);
        ctx.strokeStyle = "#555";
        ctx.strokeRect(barX, barY, barW, barH);

        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = timerRatio > 0.3 ? "#fff" : "#ef4444";
        ctx.fillText(`⏱ ${(adv.turnTimer / 1000).toFixed(1)}s`, w / 2, 50);

        if (adv.currentGlosa) {
          ctx.font = "bold 28px sans-serif";
          ctx.fillStyle = "#fde68a";
          ctx.shadowColor = "#000";
          ctx.shadowBlur = 4;
          ctx.fillText(adv.currentGlosa.sv, w / 2, 85);
          ctx.shadowBlur = 0;
        }

        // Answer input
        const inputW = 280, inputH = 36, inputX = w / 2 - inputW / 2, inputY = 105;
        ctx.fillStyle = "#0a0f1e";
        ctx.fillRect(inputX, inputY, inputW, inputH);
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.strokeRect(inputX, inputY, inputW, inputH);
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText(adv.answerText + (Math.floor(Date.now() / 500) % 2 === 0 ? "│" : ""), w / 2, inputY + inputH / 2);

        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#666";
        ctx.fillText(`Runda ${adv.roundNumber}`, w / 2, 155);

      } else if (adv.phase === "wrongReveal") {
        // Show the word and correct answer
        const revealElapsed = Date.now() - adv.wrongRevealStart;
        const fadeIn = Math.min(1, revealElapsed / 300);

        ctx.save();
        ctx.globalAlpha = fadeIn;
        ctx.textAlign = "center";

        // The Swedish word
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#fde68a";
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 4;
        ctx.fillText(adv.wrongRevealWord || "", w / 2, 55);
        ctx.shadowBlur = 0;

        // "Fel!" label
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#ef4444";
        ctx.fillText("Fel!", w / 2, 85);

        // Correct answer
        ctx.font = "bold 26px sans-serif";
        ctx.fillStyle = "#22c55e";
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 4;
        ctx.fillText(adv.wrongRevealAnswer || "", w / 2, 120);
        ctx.shadowBlur = 0;

        ctx.restore();

      } else if (adv.phase === "actionSelect") {
        const hero = adv.heroes[adv.actionMenuHero];
        if (hero) {
          ctx.font = "bold 20px sans-serif";
          ctx.fillStyle = "#fde68a";
          ctx.shadowColor = "#000";
          ctx.shadowBlur = 3;
          ctx.fillText(`${hero.name} — Välj action:`, w / 2, 40);
          ctx.shadowBlur = 0;

          adv.actionBtnBounds = [];
          const actions = [
            { id: "attack", label: "⚔️ Attack", color: "#dc2626", key: "1" },
            { id: "heal", label: "💚 Heal", color: "#16a34a", key: "2" },
            { id: "defend", label: "🛡️ Defend", color: "#2563eb", key: "3" },
            { id: "special", label: "⚡ Special", color: hero.specialCharge >= 3 ? "#eab308" : "#333", enabled: hero.specialCharge >= 3, key: "4" },
          ];
          const btnW = 140, btnH = 44, gap = 16;
          const totalW = actions.length * btnW + (actions.length - 1) * gap;
          const startX = w / 2 - totalW / 2;

          for (let i = 0; i < actions.length; i++) {
            const bx = startX + i * (btnW + gap);
            const by = 60;
            const act = actions[i];
            ctx.fillStyle = act.enabled === false ? "#1a1a1a" : act.color;
            ctx.fillRect(bx, by, btnW, btnH);
            ctx.strokeStyle = act.enabled === false ? "#333" : "#fff";
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, btnW, btnH);
            ctx.font = "bold 15px sans-serif";
            ctx.fillStyle = act.enabled === false ? "#555" : "#fff";
            ctx.fillText(act.label, bx + btnW / 2, by + btnH / 2 - 4);
            ctx.font = "10px sans-serif";
            ctx.fillStyle = act.enabled === false ? "#444" : "#aaa";
            ctx.fillText(`[${act.key}]`, bx + btnW / 2, by + btnH / 2 + 14);
            adv.actionBtnBounds.push({ x: bx, y: by, w: btnW, h: btnH, action: act.id, enabled: act.enabled !== false });
          }
        }
      } else if (adv.phase === "playerTurn") {
        ctx.font = "bold 22px sans-serif";
        ctx.fillStyle = "#22c55e";
        ctx.shadowColor = "#000"; ctx.shadowBlur = 3;
        ctx.fillText("⚔️ Spelarnas tur!", w / 2, 40);
        ctx.shadowBlur = 0;
      } else if (adv.phase === "enemyTurn") {
        ctx.font = "bold 22px sans-serif";
        ctx.fillStyle = "#ef4444";
        ctx.shadowColor = "#000"; ctx.shadowBlur = 3;
        ctx.fillText(`${adv.boss ? adv.boss.name : "Boss"} attackerar!`, w / 2, 40);
        ctx.shadowBlur = 0;
      } else if (adv.phase === "victory") {
        ctx.font = "bold 36px sans-serif";
        ctx.fillStyle = "#fde68a";
        ctx.shadowColor = "#000"; ctx.shadowBlur = 6;
        ctx.fillText("VICTORY!", w / 2, h / 2 - 20);
        ctx.shadowBlur = 0;
        ctx.font = "18px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("Bossen är besegrad!", w / 2, h / 2 + 20);
        advDrawEndButtons(w, h);
      } else if (adv.phase === "defeat") {
        ctx.font = "bold 36px sans-serif";
        ctx.fillStyle = "#ef4444";
        ctx.shadowColor = "#000"; ctx.shadowBlur = 6;
        ctx.fillText("DEFEAT", w / 2, h / 2 - 20);
        ctx.shadowBlur = 0;
        ctx.font = "18px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("Alla hjältar har fallit...", w / 2, h / 2 + 20);
        advDrawEndButtons(w, h);
      }
      ctx.restore();

      // Menu button
      ctx.save();
      const mbx = 10, mby = 10, mbw = 60, mbh = 28;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(mbx, mby, mbw, mbh);
      ctx.strokeStyle = "#475569";
      ctx.strokeRect(mbx, mby, mbw, mbh);
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MENY", mbx + mbw / 2, mby + mbh / 2);
      adv.menuBtnBounds = { x: mbx, y: mby, w: mbw, h: mbh };
      ctx.restore();
    }

    function advDrawEndButtons(w, h) {
      const adv = arena.adventure;
      const btnW = 140, btnH = 40, gap = 20;
      const bx1 = w / 2 - btnW - gap / 2, bx2 = w / 2 + gap / 2, by = h / 2 + 50;

      ctx.fillStyle = "#065f46";
      ctx.fillRect(bx1, by, btnW, btnH);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(bx1, by, btnW, btnH);
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.fillText("Igen", bx1 + btnW / 2, by + btnH / 2);

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(bx2, by, btnW, btnH);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(bx2, by, btnW, btnH);
      ctx.fillStyle = "#fff";
      ctx.fillText("Meny", bx2 + btnW / 2, by + btnH / 2);

      adv.endBtnBounds = [
        { x: bx1, y: by, w: btnW, h: btnH, action: "adventurePlayAgain" },
        { x: bx2, y: by, w: btnW, h: btnH, action: "menu" },
      ];
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
      updateSiege();
      updateAdventure();
      if (arena.mode === "boot") {
        drawBootMode();
        if (performance.now() - arena.bootStartMs > BOOT_DURATION) {
          arena.bootDone = true;
          arena.mode = "menu";
        }
      } else if (arena.mode === "menu") {
        drawMenuMode();
      } else if (arena.mode === "siege") {
        drawSiegeMode();
      } else if (arena.mode === "adventure") {
        drawAdventureMode();
      } else {
      drawParallaxBackground();
      }
      if (arena.mode === "fortress") {
        drawFortressMode(t);
      } else if (arena.mode === "menu" || arena.mode === "siege" || arena.mode === "adventure") {
        // already drawn above
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
        if ((arena.mode === "boot" || arena.mode === "menu" || arena.mode === "siege" || arena.mode === "adventure") && mode !== "menu" && mode !== "siege" && mode !== "boot" && mode !== "adventure") return;
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
        if (arena.mode === "boot" || arena.mode === "menu" || arena.mode === "siege" || arena.mode === "adventure") return;
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
        if (arena.mode === "boot" || arena.mode === "menu" || arena.mode === "siege" || arena.mode === "adventure") return;
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
        if (arena.mode === "boot" || arena.mode === "menu" || arena.mode === "siege") return;
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
        arena.siege.active = false;
        arena.siege.playerSoldiers = [];
        arena.siege.enemySoldiers = [];
        arena.siege.gameOver = false;
        arena.siege.winner = null;
        arena.siege.glosaText = null;
        arena.siege.glosaFeedback = null;
        arena.siege.enemyFeed = [];
      },
      startFortressMode(timerSec, onCastleDestroyed) {
        if (arena.mode === "boot" || arena.mode === "menu" || arena.mode === "siege") return;
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
        if (arena.mode === "boot" || arena.mode === "menu" || arena.mode === "siege") return;
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
        if (arena.mode === "boot" || arena.mode === "menu" || arena.mode === "siege") return;
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
      // ─── SIEGE MODE API ──────────────────────────────────────────
      startSiegeMode(options = {}) {
        arena.mode = "siege";
        siegeAudio.startMusic();
        siegeAudio.bossNoteIndex = 0;
        enemySpawnCount = 0;
        playerSpawnCount = 0;
        const s = arena.siege;
        s.active = true;
        s.defeatAnim = null;
        s.victoryAnim = null;
        s.stuckArrows = [];
        s.arrows = [];
        s.notes = [];
        s.ragdolls = [];
        s.crashedAmbulances = [];
        s.corpses = [];
        s.playerCastleHp = Number(options.playerCastleHp || 200);
        s.playerCastleMaxHp = Number(options.playerCastleMaxHp || 200);
        s.enemyCastleHp = Number(options.enemyCastleHp || 200);
        s.enemyCastleMaxHp = Number(options.enemyCastleMaxHp || 200);
        s.playerSoldiers = [];
        s.enemySoldiers = [];
        s.lastPlayerSpawnMs = performance.now();
        s.lastEnemySpawnMs = performance.now();
        s.spawnIntervalMs = Number(options.spawnIntervalMs || 5000);
        s.isGroupFight = !!options.isGroupFight;
        s.selectedBossId = options.bossId || "oiia";
        const boss = SIEGE_BOSSES.find(b => b.id === s.selectedBossId) || SIEGE_BOSSES[0];
        s.bossArmy = boss.army || ["grunt"];
        s.bossAccuracy = boss.accuracy || 0.5;
        s.bossSpawnMs = boss.spawnMs || 5000;
        s.bossLastAnswerMs = performance.now();
        s.totalWords = Number(options.totalWords || 0);
        s.answeredWords = 0;
        s.correctWords = 0;
        s.glosaText = null;
        s.glosaFeedback = null;
        s.gameOver = false;
        s.winner = null;
        s.onGameOver = typeof options.onGameOver === "function" ? options.onGameOver : null;
        s.frameCount = 0;
        // No initial soldiers — they spawn from answers only
      },
      siegeTrackAnswer(correct) {
        arena.siege.answeredWords++;
        if (correct) arena.siege.correctWords++;
      },
      siegeSpawnPlayerSoldier() {
        if (arena.mode !== "siege" || arena.siege.gameOver) return;
        if (arena.siege.playerSoldiers.length < 25) {
          spawnSiegeSoldier("player");
        }
      },
      siegeSpawnEnemySoldier() {
        if (arena.mode !== "siege" || arena.siege.gameOver) return;
        if (arena.siege.enemySoldiers.length < 25) {
          spawnSiegeSoldier("enemy");
        }
      },
      setSiegeGlosa(text) {
        arena.siege.glosaText = text || null;
      },
      setSiegeFeedback(text, color, sub, durationMs) {
        const now = Date.now();
        arena.siege.glosaFeedback = {
          text, color, sub: sub || null,
          duration: durationMs || 1800,
          startedAt: now,
          expiresAt: now + (durationMs || 1800),
        };
      },
      setSiegeCountdown(seconds) {
        arena.siege.countdownEndsAt = Date.now() + seconds * 1000;
      },
      setSiegeCountdownAbsolute(unixMs) {
        arena.siege.countdownEndsAt = unixMs;
      },
      triggerVictory() {
        const s = arena.siege;
        s.gameOver = true;
        s.winner = "player";
        // Enemy castle explodes
        const ecx = (SIEGE_RIGHT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS;
        const ecy = (SIEGE_GROUND_Y - SIEGE_CASTLE_H / 2) * SIEGE_PS;
        addImpactParticles(ecx, ecy, 500, "#fca5a5", "#fde68a");
        arena.flashes.push({ x: ecx, y: ecy, radius: 80, life: 20, color: "#ef4444" });
        arena.flashes.push({ x: ecx, y: ecy, radius: 120, life: 16, color: "#fb7185" });
        // Victory flag on player castle
        const pcx = (SIEGE_LEFT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS;
        const pcy = (SIEGE_GROUND_Y - SIEGE_CASTLE_H) * SIEGE_PS;
        s.victoryAnim = { startMs: Date.now(), flagX: pcx, flagBaseY: pcy - 10 };
        // Defeat debris on enemy castle
        s.defeatAnim = { startMs: Date.now(), debris: [] };
        for (let i = 0; i < 40; i++) {
          s.defeatAnim.debris.push({
            x: ecx + (Math.random() - 0.5) * 60,
            y: ecy + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 6,
            vy: -2 - Math.random() * 5,
            size: 3 + Math.random() * 8,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.2,
            color: ["#a0a0b0", "#707880", "#c0c8d0", "#505860"][Math.floor(Math.random() * 4)],
            life: 80 + Math.random() * 60,
          });
        }
      },
      triggerGiveUp() {
        const s = arena.siege;
        s.gameOver = true;
        s.winner = "enemy";
        // Spawn massive crumble particles from player castle
        const cx = (SIEGE_LEFT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS;
        const cy = (SIEGE_GROUND_Y - SIEGE_CASTLE_H / 2) * SIEGE_PS;
        // Castle debris — big chunks falling
        s.defeatAnim = { startMs: Date.now(), debris: [], flagPhase: 0 };
        for (let i = 0; i < 40; i++) {
          s.defeatAnim.debris.push({
            x: cx + (Math.random() - 0.5) * 60,
            y: cy + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 6,
            vy: -2 - Math.random() * 5,
            size: 3 + Math.random() * 8,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.2,
            color: ["#a0a0b0", "#707880", "#c0c8d0", "#505860"][Math.floor(Math.random() * 4)],
            life: 80 + Math.random() * 60,
          });
        }
        // Explosion particles
        addImpactParticles(cx, cy, 500, "#fca5a5", "#fde68a");
        arena.flashes.push({ x: cx, y: cy, radius: 80, life: 20, color: "#ef4444" });
        arena.flashes.push({ x: cx, y: cy, radius: 120, life: 16, color: "#fb7185" });
        // Victory anim for enemy castle
        const ecx = (SIEGE_RIGHT_CASTLE_X + SIEGE_CASTLE_W / 2) * SIEGE_PS;
        const ecy = (SIEGE_GROUND_Y - SIEGE_CASTLE_H) * SIEGE_PS;
        s.victoryAnim = { startMs: Date.now(), flagX: ecx, flagBaseY: ecy - 10 };
      },
      getSiegeState() {
        const s = arena.siege;
        return {
          playerCastleHp: s.playerCastleHp,
          enemyCastleHp: s.enemyCastleHp,
          playerSoldierCount: s.playerSoldiers.length,
          enemySoldierCount: s.enemySoldiers.length,
          gameOver: s.gameOver,
          winner: s.winner,
          countdownActive: s.countdownEndsAt > Date.now(),
          isGroupFight: s.isGroupFight,
          totalWords: s.totalWords,
          answeredWords: s.answeredWords,
          correctWords: s.correctWords,
        };
      },
      pushSiegeEnemyFeed(text, isGood, durationMs) {
        arena.siege.enemyFeed.unshift({
          text: String(text || ""),
          good: !!isGood,
          time: Date.now(),
          duration: durationMs || 4000,
        });
        if (arena.siege.enemyFeed.length > 5) arena.siege.enemyFeed.length = 5;
      },
      siegeAnswerType(ch) {
        if (arena.siege.answerText.length < 40) arena.siege.answerText += ch;
      },
      siegeAnswerBackspace() {
        arena.siege.answerText = arena.siege.answerText.slice(0, -1);
      },
      clearSiegeAnswer() {
        arena.siege.answerText = "";
      },
      getSiegeAnswer() {
        return arena.siege.answerText;
      },
      isSiegeMode() {
        return arena.mode === "siege" && arena.siege.active;
      },
      // ─── ADVENTURE MODE API ────────────────────────────────────
      startAdventureMode(options = {}) {
        arena.mode = "adventure";
        arena.adventure.active = true;
        arena.siege.active = false;
        const adv = arena.adventure;
        adv.phase = "idle";
        adv.roundNumber = 0;
        adv.damageNumbers = [];
        adv.particles = [];
        adv.flashEffect = null;
        adv.answerText = "";
        adv.answerResults = [];
        adv.actionMenuHero = -1;
        adv.actionBtnBounds = [];
        adv.endBtnBounds = [];
        // Setup heroes (1 per player for now, or array from options)
        const heroNames = options.heroNames || ["Hjälte"];
        adv.heroes = heroNames.map(name => ({
          name,
          hp: 100,
          maxHp: 100,
          defending: false,
          specialCharge: 0,
          actionChoice: null,
        }));
        // Setup boss
        const bossId = options.bossId || "oiia";
        const boss = SIEGE_BOSSES.find(b => b.id === bossId) || SIEGE_BOSSES[0];
        adv.boss = {
          id: boss.id,
          name: boss.name,
          hp: options.bossHp || 200,
          maxHp: options.bossHp || 200,
          size: 260,
        };
        // Word queue
        adv.wordQueue = options.words ? [...options.words].sort(() => Math.random() - 0.5) : [];
        adv.wrongQueue = [];
        // Start first vocab phase after short delay
        setTimeout(() => advStartVocabPhase(), 500);
      },
      isAdventureMode() {
        return arena.mode === "adventure" && arena.adventure.active;
      },
      adventureAnswerType(ch) {
        if (arena.adventure.answerText.length < 40) arena.adventure.answerText += ch;
      },
      adventureAnswerBackspace() {
        arena.adventure.answerText = arena.adventure.answerText.slice(0, -1);
      },
      getAdventureAnswer() {
        return arena.adventure.answerText;
      },
      clearAdventureAnswer() {
        arena.adventure.answerText = "";
      },
      adventureSubmitAnswer(correct) {
        const adv = arena.adventure;
        if (adv.phase !== "vocab") return;
        // For single player, heroIndex 0
        if (!adv.answerResults.find(r => r.heroIndex === 0)) {
          adv.answerResults.push({ heroIndex: 0, correct });
          if (!correct && adv.currentGlosa) {
            adv.wrongQueue.push(adv.currentGlosa);
            // Show correct answer before moving on
            adv.phase = "wrongReveal";
            adv.wrongRevealAnswer = adv.currentGlosa.en;
            adv.wrongRevealWord = adv.currentGlosa.sv;
            adv.wrongRevealStart = Date.now();
            return;
          }
          if (correct) {
            adv.heroes[0].specialCharge = Math.min(3, (adv.heroes[0].specialCharge || 0) + 1);
          }
          advStartActionSelect();
        }
      },
      adventureSelectAction(actionId) {
        const adv = arena.adventure;
        if (adv.phase !== "actionSelect" || adv.actionMenuHero < 0) return;
        const hero = adv.heroes[adv.actionMenuHero];
        if (!hero || hero.hp <= 0) return;
        if (actionId === "special" && hero.specialCharge < 3) return;
        hero.actionChoice = actionId;
        advNextActionHero();
      },
      handleAdventureClick(cx, cy) {
        const adv = arena.adventure;
        // Menu button
        if (adv.menuBtnBounds) {
          const mb = adv.menuBtnBounds;
          if (cx >= mb.x && cx <= mb.x + mb.w && cy >= mb.y && cy <= mb.y + mb.h) {
            return { action: "menu" };
          }
        }
        // Action buttons
        if (adv.phase === "actionSelect") {
          for (const btn of adv.actionBtnBounds) {
            if (btn.enabled && cx >= btn.x && cx <= btn.x + btn.w && cy >= btn.y && cy <= btn.y + btn.h) {
              return { action: "adventureAction", actionId: btn.action };
            }
          }
        }
        // End buttons
        if ((adv.phase === "victory" || adv.phase === "defeat") && adv.endBtnBounds) {
          for (const btn of adv.endBtnBounds) {
            if (cx >= btn.x && cx <= btn.x + btn.w && cy >= btn.y && cy <= btn.y + btn.h) {
              return { action: btn.action };
            }
          }
        }
        return null;
      },
      getAdventureState() {
        const adv = arena.adventure;
        return { phase: adv.phase, roundNumber: adv.roundNumber, currentGlosa: adv.currentGlosa };
      },
      // ─── MENU API ──────────────────────────────────────────────
      startBoot() {
        arena.mode = "boot";
        arena.bootStartMs = performance.now();
        arena.bootDone = false;
        arena.siege.active = false;
      },
      showMenu() {
        arena.mode = "menu";
        arena.siege.active = false;
        arena.adventure.active = false;
        siegeAudio.stopMusic();
      },
      isMenuMode() {
        return arena.mode === "menu";
      },
      setMenuData(options = {}) {
        const m = arena.menu;
        if (options.weeks) m.weeks = options.weeks;
        if (options.languages) m.languages = options.languages;
        if (options.selectedLanguage) m.selectedLanguage = options.selectedLanguage;
        if (options.selectedWeekId !== undefined) m.selectedWeekId = options.selectedWeekId;
        if (options.stats) Object.assign(m.stats, options.stats);
        if (options.guestName !== undefined) m.guestName = options.guestName;
        if (options.leaderboard) m.leaderboard = options.leaderboard;
        if (options.weekStats) m.weekStats = options.weekStats;
        if (options.pendingChallenges) m.pendingChallenges = options.pendingChallenges;
      },
      handleCanvasClick(cx, cy) {
        if (arena.mode === "menu") {
          return handleMenuClick(cx, cy);
        }
        if (arena.mode === "adventure") {
          return this.handleAdventureClick(cx, cy);
        }
        if (arena.mode === "siege") {
          // Menu button
          if (arena.siege.menuBtnBounds) {
            const mb = arena.siege.menuBtnBounds;
            if (cx >= mb.x && cx <= mb.x + mb.w && cy >= mb.y && cy <= mb.y + mb.h) {
              return { action: "menu" };
            }
          }
          // Flip language button
          if (arena.siege.flipBtnBounds) {
            const fb = arena.siege.flipBtnBounds;
            if (cx >= fb.x && cx <= fb.x + fb.w && cy >= fb.y && cy <= fb.y + fb.h) {
              return { action: "flipSiegeLanguage" };
            }
          }
          // Give up button
          if (arena.siege.giveUpBtnBounds) {
            const gb = arena.siege.giveUpBtnBounds;
            if (cx >= gb.x && cx <= gb.x + gb.w && cy >= gb.y && cy <= gb.y + gb.h) {
              return { action: "giveUp" };
            }
          }
          // Game over buttons
          if (arena.siege.gameOver && arena.siege.gameOverButtons) {
            const b = arena.siege.gameOverButtons;
            if (cy >= b.btnY && cy <= b.btnY + b.btnH) {
              if (cx >= b.playBtnX && cx <= b.playBtnX + b.btnW) return { action: "playAgain" };
              if (cx >= b.menuBtnX && cx <= b.menuBtnX + b.btnW) return { action: "menu" };
            }
          }
        }
        return null;
      },
      handleCanvasHover(cx, cy) {
        if (arena.mode === "menu") {
          return handleMenuHover(cx, cy);
        }
        return false;
      },
      selectMenuWeek(weekId) {
        arena.menu.selectedWeekId = weekId;
      },
      getMenuSelectedWeekId() {
        return arena.menu.selectedWeekId;
      },
      startNameEdit() {
        arena.menu.nameEditing = true;
        arena.menu.nameBuffer = arena.menu.guestName || "";
      },
      nameEditType(ch) {
        if (arena.menu.nameBuffer.length < 20) arena.menu.nameBuffer += ch;
      },
      nameEditBackspace() {
        arena.menu.nameBuffer = arena.menu.nameBuffer.slice(0, -1);
      },
      nameEditConfirm() {
        arena.menu.guestName = arena.menu.nameBuffer.trim() || "GÄST";
        arena.menu.nameEditing = false;
        return arena.menu.guestName;
      },
      nameEditCancel() {
        arena.menu.nameEditing = false;
      },
      isNameEditing() {
        return arena.menu.nameEditing;
      },
      getMenuState() {
        return arena.menu;
      },
      getTeacherCode() {
        return arena.menu.teacherCode;
      },
      teacherCodeType(ch) {
        if (arena.menu.teacherCode.length < 30) arena.menu.teacherCode += ch;
      },
      teacherCodeBackspace() {
        arena.menu.teacherCode = arena.menu.teacherCode.slice(0, -1);
      },
      clearTeacherCode() {
        arena.menu.teacherCode = "";
      },
      setTeacherMsg(msg, color) {
        arena.menu.teacherMsg = msg || "";
        arena.menu.teacherMsgColor = color || "#00aa00";
      },
      setMenuLanguage(lang) {
        arena.menu.selectedLanguage = lang;
        arena.menu.scrollOffset = 0;
        arena.menu.selectedWeekId = null;
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
      japanska: "japanese",
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
      japanese: "Japanska",
    };
    return names[normalized] || normalized;
  }

  function filteredWeeks() {
    const selectedLanguage = normalizeLanguage(appState.selectedLanguage);
    return (appState.weeks || [])
      .filter((week) => normalizeLanguage(week.language) === selectedLanguage)
      .sort((a, b) => a.weekName.localeCompare(b.weekName, undefined, { numeric: true }));
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
      japanese: [
        "\u3042","\u3044","\u3046","\u3048","\u304a", // a i u e o
        "\u304b","\u304d","\u304f","\u3051","\u3053", // ka ki ku ke ko
        "\u3055","\u3057","\u3059","\u305b","\u305d", // sa shi su se so
        "\u305f","\u3061","\u3064","\u3066","\u3068", // ta chi tsu te to
        "\u306a","\u306b","\u306c","\u306d","\u306e", // na ni nu ne no
        "\u306f","\u3072","\u3075","\u3078","\u307b", // ha hi fu he ho
        "\u307e","\u307f","\u3080","\u3081","\u3082", // ma mi mu me mo
        "\u3084","\u3086","\u3088",                     // ya yu yo
        "\u3089","\u308a","\u308b","\u308c","\u308d", // ra ri ru re ro
        "\u308f","\u3092","\u3093",                     // wa wo n
      ],
    };
    // Japanese: only show hiragana picker when answer is hiragana (flipped direction)
    let chars = charSets[lang];
    if (lang === "japanese" && !appState.flippedDirection) chars = null;
    if (!chars) {
      elements.specialCharsRow.style.display = "none";
      return;
    }
    elements.specialCharsRow.style.display = "flex";
    elements.specialCharsRow.style.flexWrap = "wrap";
    elements.specialCharsRow.innerHTML = "";
    const isJapanese = lang === "japanese";
    chars.forEach((ch) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = ch;
      btn.style.cssText = isJapanese
        ? "min-width:28px;height:30px;padding:0 3px;font-size:1.1rem;font-weight:700;border:1px solid #b8d2e9;border-radius:6px;background:#f1f5f9;color:#1e293b;cursor:pointer;"
        : "min-width:32px;height:32px;padding:0 6px;font-size:1.05rem;font-weight:700;border:1px solid #b8d2e9;border-radius:8px;background:#f1f5f9;color:#1e293b;cursor:pointer;";
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

  // ─── SIEGE AUDIO ENGINE ────────────────────────────────────────────
  // Chiptune background music + SFX via Web Audio API
  const siegeAudio = {
    musicPlaying: false,
    musicNodes: null,
    musicEnabled: false,
    sfxCooldowns: {},
    bossNoteIndex: 0,
    bossNoteTimer: 0,

    // === BACKGROUND MUSIC — MP3 tracks, picked randomly ===
    musicTracks: ["/music/stereo-madness.mp3", "/music/crazy-dave.mp3", "/music/machina.mp3"],
    audioEl: null,
    _pendingPlay: false,

    startMusic() {
      if (!this.musicEnabled) return;
      if (this.musicPlaying && this.audioEl && !this.audioEl.paused) return;

      if (!this.audioEl) {
        this.audioEl = new Audio();
        this.audioEl.loop = false;
        this.audioEl.volume = 0.25;
        this.audioEl.addEventListener("ended", () => {
          if (this.musicPlaying && this.musicEnabled) {
            this.audioEl.src = this.musicTracks[Math.floor(Math.random() * this.musicTracks.length)];
            this.audioEl.play().catch(() => {});
          }
        });
      }
      this.audioEl.src = this.musicTracks[Math.floor(Math.random() * this.musicTracks.length)];
      this.musicPlaying = true;
      const p = this.audioEl.play();
      if (p && p.catch) p.catch(() => { this._pendingPlay = true; });
    },

    // Called on any user gesture to unblock autoplay
    resumeIfPending() {
      if (this._pendingPlay && this.musicEnabled && this.audioEl) {
        this._pendingPlay = false;
        this.musicPlaying = true;
        this.audioEl.play().catch(() => {});
      }
    },

    stopMusic() {
      this.musicPlaying = false;
      this._pendingPlay = false;
      if (this.audioEl) {
        this.audioEl.pause();
        this.audioEl.currentTime = 0;
      }
    },

    toggleMusic() {
      this.musicEnabled = !this.musicEnabled;
      if (this.musicEnabled) this.startMusic();
      else this.stopMusic();
    },

    // Dead code removed — chiptune generator replaced by MP3 playback
    // === SOUND EFFECTS ===
    playSfx(name, vol = 0.1) {
      if (!appState.settings.soundEnabled) return;
      // Cooldown to prevent audio spam
      const now = performance.now();
      if (this.sfxCooldowns[name] && now - this.sfxCooldowns[name] < 80) return;
      this.sfxCooldowns[name] = now;
      const ac = getAudioContext();
      if (!ac || ac.state === "suspended") return;
      const t = ac.currentTime;

      if (name === "walk") {
        // Soft footstep — short noise burst
        const bufSize = ac.sampleRate * 0.04;
        const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1);
        const src = ac.createBufferSource(); src.buffer = buf;
        const g = ac.createGain();
        const flt = ac.createBiquadFilter();
        flt.type = "lowpass"; flt.frequency.value = 400;
        g.gain.setValueAtTime(vol * 0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        src.connect(flt); flt.connect(g); g.connect(ac.destination);
        src.start(t); src.stop(t + 0.04);

      } else if (name === "swordHit") {
        // Metallic clash
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(800 + Math.random() * 400, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.06);
        g.gain.setValueAtTime(vol * 0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(g); g.connect(ac.destination);
        osc.start(t); osc.stop(t + 0.08);

      } else if (name === "arrowShoot") {
        // Whoosh
        const bufSize = ac.sampleRate * 0.08;
        const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1);
        const src = ac.createBufferSource(); src.buffer = buf;
        const g = ac.createGain();
        const flt = ac.createBiquadFilter();
        flt.type = "bandpass"; flt.frequency.setValueAtTime(2000, t);
        flt.frequency.exponentialRampToValueAtTime(500, t + 0.08);
        g.gain.setValueAtTime(vol * 0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        src.connect(flt); flt.connect(g); g.connect(ac.destination);
        src.start(t); src.stop(t + 0.08);

      } else if (name === "arrowHit") {
        // Thunk
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.05);
        g.gain.setValueAtTime(vol * 0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.connect(g); g.connect(ac.destination);
        osc.start(t); osc.stop(t + 0.06);

      } else if (name === "ambulanceSiren") {
        // Two-tone siren wail
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(700, t);
        osc.frequency.linearRampToValueAtTime(900, t + 0.15);
        osc.frequency.linearRampToValueAtTime(700, t + 0.3);
        g.gain.setValueAtTime(vol * 0.2, t);
        g.gain.setValueAtTime(vol * 0.2, t + 0.25);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(g); g.connect(ac.destination);
        osc.start(t); osc.stop(t + 0.3);

      } else if (name === "ambulanceCrash") {
        // Big crash — metallic + explosion
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + 0.3);
        g.gain.setValueAtTime(vol * 1.2, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(g); g.connect(ac.destination);
        osc.start(t); osc.stop(t + 0.35);
        // Glass shatter (noise)
        const bufSize = ac.sampleRate * 0.15;
        const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1);
        const src = ac.createBufferSource(); src.buffer = buf;
        const ng = ac.createGain();
        ng.gain.setValueAtTime(vol * 0.6, t);
        ng.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        src.connect(ng); ng.connect(ac.destination);
        src.start(t); src.stop(t + 0.15);

      } else if (name === "death") {
        // Low thud
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.15);
        g.gain.setValueAtTime(vol * 0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(g); g.connect(ac.destination);
        osc.start(t); osc.stop(t + 0.18);

      } else if (name === "noteHit") {
        // Musical note impact — bright chime
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = "sine";
        const freq = [523, 659, 784, 880, 1047][Math.floor(Math.random() * 5)];
        osc.frequency.value = freq;
        g.gain.setValueAtTime(vol * 0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(g); g.connect(ac.destination);
        osc.start(t); osc.stop(t + 0.2);

      } else if (name === "castleHit") {
        // Heavy impact on castle
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.2);
        g.gain.setValueAtTime(vol * 0.8, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(g); g.connect(ac.destination);
        osc.start(t); osc.stop(t + 0.25);

      } else if (name === "gallop") {
        // Horse gallop — rapid low thuds (clip-clop)
        for (let k = 0; k < 2; k++) {
          const osc = ac.createOscillator();
          const g = ac.createGain();
          const dt = k * 0.07;
          osc.type = "sine";
          osc.frequency.setValueAtTime(k === 0 ? 180 : 140, t + dt);
          osc.frequency.exponentialRampToValueAtTime(60, t + dt + 0.04);
          g.gain.setValueAtTime(vol * 0.4, t + dt);
          g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.06);
          osc.connect(g); g.connect(ac.destination);
          osc.start(t + dt); osc.stop(t + dt + 0.06);
        }

      } else if (name === "dinoRoar") {
        // T-Rex roar — sharp screech with distortion
        // High-pitched attack screech
        const osc1 = ac.createOscillator();
        const g1 = ac.createGain();
        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(900, t);
        osc1.frequency.exponentialRampToValueAtTime(300, t + 0.08);
        osc1.frequency.exponentialRampToValueAtTime(150, t + 0.25);
        g1.gain.setValueAtTime(vol * 0.6, t);
        g1.gain.linearRampToValueAtTime(vol * 0.3, t + 0.08);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc1.connect(g1); g1.connect(ac.destination);
        osc1.start(t); osc1.stop(t + 0.3);
        // Noise layer for texture
        const bufSize = ac.sampleRate * 0.15;
        const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let j = 0; j < bufSize; j++) d[j] = (Math.random() * 2 - 1);
        const src = ac.createBufferSource(); src.buffer = buf;
        const ng = ac.createGain();
        const flt = ac.createBiquadFilter();
        flt.type = "bandpass"; flt.frequency.value = 600; flt.Q.value = 2;
        ng.gain.setValueAtTime(vol * 0.4, t);
        ng.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        src.connect(flt); flt.connect(ng); ng.connect(ac.destination);
        src.start(t); src.stop(t + 0.2);
      }
    },

    // === KLARA BOSS PIANO — plays snippets of famous melodies ===
    pianoMelodies: [
      // Für Elise (Beethoven) — opening bars
      [659,622,659,622,659,494,587,523,440],
      // Ode to Joy (Beethoven)
      [330,330,349,392,392,349,330,294,262,262,294,330,330,294,294],
      // Twinkle Twinkle Little Star
      [262,262,392,392,440,440,392,349,349,330,330,294,294,262],
      // Canon in D (Pachelbel) — simplified
      [587,523,494,440,392,349,392,440],
      // Turkish March (Mozart) — snippet
      [494,440,415,440,523,494,440,415,440,523,587],
    ],

    playBossPianoNote() {
      if (!appState.settings.soundEnabled) return;
      const ac = getAudioContext();
      if (!ac || ac.state === "suspended") return;
      const t = ac.currentTime;

      // Pick current melody and note — cycles through all melodies
      const melodyIdx = Math.floor(this.bossNoteIndex / 50) % this.pianoMelodies.length;
      const melody = this.pianoMelodies[melodyIdx];
      const noteIdx = this.bossNoteIndex % melody.length;
      const freq = melody[noteIdx];
      this.bossNoteIndex++;

      // Piano-like tone (sine + harmonics)
      const masterG = ac.createGain();
      masterG.gain.value = 0.08;
      masterG.connect(ac.destination);

      // Fundamental
      const osc1 = ac.createOscillator();
      const g1 = ac.createGain();
      osc1.type = "sine";
      osc1.frequency.value = freq;
      g1.gain.setValueAtTime(0.5, t);
      g1.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      osc1.connect(g1); g1.connect(masterG);
      osc1.start(t); osc1.stop(t + 0.6);

      // 2nd harmonic (softer)
      const osc2 = ac.createOscillator();
      const g2 = ac.createGain();
      osc2.type = "sine";
      osc2.frequency.value = freq * 2;
      g2.gain.setValueAtTime(0.15, t);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc2.connect(g2); g2.connect(masterG);
      osc2.start(t); osc2.stop(t + 0.3);

      // 3rd harmonic (even softer)
      const osc3 = ac.createOscillator();
      const g3 = ac.createGain();
      osc3.type = "sine";
      osc3.frequency.value = freq * 3;
      g3.gain.setValueAtTime(0.05, t);
      g3.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc3.connect(g3); g3.connect(masterG);
      osc3.start(t); osc3.stop(t + 0.15);
    },
  };
  // ─── END SIEGE AUDIO ENGINE ───────────────────────────────────────

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
    // Suppress HTML toasts when in canvas mode
    if (bossFightEngine && (bossFightEngine.isMenuMode() || bossFightEngine.isSiegeMode())) {
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
    if (bossFightEngine && (bossFightEngine.isMenuMode() || bossFightEngine.isSiegeMode())) return;
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
    const siegeActive = bossFightEngine && bossFightEngine.isSiegeMode();
    const menuActive = bossFightEngine && bossFightEngine.isMenuMode && bossFightEngine.isMenuMode();
    if (siegeActive || menuActive) return; // Skip all old UI updates in canvas modes
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
    // Suppress in canvas mode
    if (bossFightEngine && ((bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()) || (bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()))) {
      elements.duelPrepOverlay.style.display = "none";
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
    if (bossFightEngine && ((bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()) || (bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()))) return;
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
      bossFightEngine.showTextFlash("Fel!", "#ef4444", `Rätt svar: ${expectedAnswerForCurrentWord()}`, Infinity);
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

  // ─── SIEGE MODE ANSWER HANDLERS ──────────────────────────────────
  let siegeWordQueue = [];
  let siegeWrongQueue = [];
  let siegeCompletedRounds = 0;

  // Trophy system: tracks perfect completions per week
  function getSiegePerfectCount(weekId) {
    try { return Number(localStorage.getItem(`siegePerfect_${weekId}`) || 0); } catch { return 0; }
  }
  function addSiegePerfectCount(weekId) {
    try {
      const count = getSiegePerfectCount(weekId) + 1;
      localStorage.setItem(`siegePerfect_${weekId}`, String(count));
      return count;
    } catch { return 1; }
  }
  function getSiegeTrophy(weekId) {
    const count = getSiegePerfectCount(weekId);
    if (count >= 10) return { level: "gold", label: "🥇", name: "GULD" };
    if (count >= 5) return { level: "silver", label: "🥈", name: "SILVER" };
    if (count >= 3) return { level: "bronze", label: "🥉", name: "BRONS" };
    if (count >= 1) return { level: "wood", label: "🪵", name: "TRÄ" };
    return null;
  }

  function initSiegeWordQueue() {
    const words = currentWords();
    siegeWordQueue = [...words].sort(() => Math.random() - 0.5);
    siegeWrongQueue = [];
  }

  function pickSiegeWord() {
    // First exhaust the main queue, then the wrong queue
    if (siegeWordQueue.length > 0) {
      return siegeWordQueue[0];
    }
    if (siegeWrongQueue.length > 0) {
      // Shuffle wrong answers and move to main queue
      siegeWordQueue = [...siegeWrongQueue].sort(() => Math.random() - 0.5);
      siegeWrongQueue = [];
      return siegeWordQueue[0];
    }
    // All done — check if perfect round (no wrong answers queued)
    siegeCompletedRounds++;
    if (siegeWrongQueue.length === 0 && bossFightEngine) {
      // Perfect round! Track it
      const weekId = appState.selectedWeekId;
      if (weekId) {
        const count = addSiegePerfectCount(weekId);
        const trophy = getSiegeTrophy(weekId);
        if (trophy) {
          bossFightEngine.setSiegeFeedback(
            `${trophy.label} PERFEKT!`,
            "#f0d040",
            `${count}x 100% — ${trophy.name}`,
            4000
          );
        }
      }
    }
    initSiegeWordQueue();
    return siegeWordQueue.length > 0 ? siegeWordQueue[0] : null;
  }

  function siegeWordAnswered(correct) {
    const word = siegeWordQueue.shift();
    if (!correct && word) {
      // Wrong answer — put it back at a random position in the back half
      const insertAt = siegeWrongQueue.length > 0
        ? Math.floor(Math.random() * siegeWrongQueue.length)
        : 0;
      siegeWrongQueue.splice(insertAt, 0, word);
    }
  }

  let siegeFlipped = false; // false = show sv, answer en (DEFAULT). true = show en, answer sv.

  function showSiegeGlosa() {
    const word = pickSiegeWord();
    if (!word) return;
    state.currentWord = word;
    if (bossFightEngine) {
      const showText = siegeFlipped ? String(word.en || "") : String(word.sv || "");
      bossFightEngine.setSiegeGlosa(showText);
    }
  }

  function expectedSiegeAnswer() {
    if (!state.currentWord) return "";
    return siegeFlipped ? String(state.currentWord.sv || "") : String(state.currentWord.en || "");
  }

  function onSiegeCorrect() {
    state.streak += 1;
    const xpGain = 18;
    const coinGain = 6;
    grantXp(xpGain);
    grantWeekXp(1);
    state.coins += coinGain;
    addCorrectKey(state.currentWord);
    siegeWordAnswered(true);
    if (bossFightEngine) {
      bossFightEngine.siegeTrackAnswer(true);
    }

    if (bossFightEngine) {
      bossFightEngine.siegeSpawnPlayerSoldier();
      bossFightEngine.setSiegeFeedback("RÄTT", "#22c55e", `+${xpGain} XP  +${coinGain} coins`, 3000);
      // Broadcast to opponent in group fights
      if (bossFightEngine.getSiegeState().isGroupFight) {
        const team = getLocalGroupTeam() || "A";
        sendGroupFightBroadcast(team, `__SIEGE_HIT__:${team}`, true);
      }
    }

    renderStats();
    showSiegeGlosa();
  }

  function onSiegeWrong() {
    state.streak = 0;
    siegeWordAnswered(false);
    if (bossFightEngine) {
      bossFightEngine.siegeTrackAnswer(false);
      bossFightEngine.siegeSpawnEnemySoldier();
      bossFightEngine.setSiegeFeedback("FEL", "#ef4444", `Rätt svar: ${expectedSiegeAnswer()}`, 3500);
      // Broadcast miss
      if (bossFightEngine.getSiegeState().isGroupFight) {
        const team = getLocalGroupTeam() || "A";
        sendGroupFightBroadcast(team, `__SIEGE_MISS__:${team}`, false);
      }
    }
    renderStats();
    showSiegeGlosa();
  }

  let hasBooted = false;
  function killAllHtmlOverlays() {
    document.querySelectorAll('#groupResultOverlay,#duelPrepOverlay,#groupBattleFeed,#groupFightPopup').forEach(el => { el.style.display = "none"; });
    const toasts = document.getElementById("toastHost");
    if (toasts) toasts.innerHTML = "";
  }

  function updateMenuStats() {
    if (!bossFightEngine) return;
    bossFightEngine.setMenuData({
      stats: {
        level: state.level,
        xp: state.xp,
        xpNext: xpToNextLevel(state.level),
        coins: state.coins,
        streak: state.streak,
      },
    });
  }

  function showCanvasMenu() {
    if (!bossFightEngine) return;
    killAllHtmlOverlays();
    // Start music on first menu load — will be pending until user gesture
    siegeAudio.startMusic();
    if (!hasBooted) {
      hasBooted = true;
    } else {
      bossFightEngine.showMenu();
    }
    // Collect available languages from weeks
    const allLangs = new Set();
    (appState.weeks || []).forEach(w => allLangs.add((w.language || "english").toLowerCase()));
    const languages = allLangs.size > 0 ? [...allLangs] : ["english"];
    const selectedLang = (appState.selectedLanguage || "english").toLowerCase();

    bossFightEngine.setMenuData({
      weeks: appState.weeks || [],
      languages,
      selectedLanguage: selectedLang,
      selectedWeekId: appState.selectedWeekId || null,
      stats: {
        level: state.level,
        xp: state.xp,
        xpNext: xpToNextLevel(state.level),
        coins: state.coins,
        streak: state.streak,
      },
      guestName: (elements.guestNameInput && elements.guestNameInput.value) || "",
    });
    // Hide ALL old HTML panels and overlays
    if (elements.heroPanel) elements.heroPanel.style.display = "none";
    if (elements.controlsPanel) elements.controlsPanel.style.display = "none";
    if (elements.questionPanel) elements.questionPanel.style.display = "none";
    if (elements.combatPanel) elements.combatPanel.style.display = "none";
    if (elements.siegeCanvasInput) elements.siegeCanvasInput.style.display = "none";
    if (elements.groupResultOverlay) elements.groupResultOverlay.style.display = "none";
    if (elements.duelPrepOverlay) elements.duelPrepOverlay.style.display = "none";
    if (elements.groupBattleFeed) elements.groupBattleFeed.style.display = "none";
    const gs = document.getElementById("gameShell");
    if (gs) gs.style.display = "none";
    const gfp = document.getElementById("groupFightPopup");
    if (gfp) gfp.style.display = "none";
  }

  function ensureFightStateOuter() {
    if (!appState.groupFight) appState.groupFight = { teamA: [], teamB: [], open: false };
    if (!appState.groupFight.teamA) appState.groupFight.teamA = [];
    if (!appState.groupFight.teamB) appState.groupFight.teamB = [];
  }
  function isInAnyTeamOuter(player) {
    const id = player.profileId || player.sessionId || player.id;
    const inA = (appState.groupFight?.teamA || []).some(p => (p.profileId || p.sessionId || p.id) === id);
    const inB = (appState.groupFight?.teamB || []).some(p => (p.profileId || p.sessionId || p.id) === id);
    return inA || inB;
  }

  async function handleCanvasAction(hit) {
    if (!hit || !hit.action) return;
    if (hit.action === "selectWeek") {
      appState.selectedWeekId = hit.weekId;
      const week = (appState.weeks || []).find(w => w.id === hit.weekId);
      if (week) {
        // Update the regular week select too
        if (elements.weekSelect) elements.weekSelect.value = hit.weekId;
        appState.selectedLanguage = (week.language || "english").toLowerCase();
      }
      bossFightEngine.selectMenuWeek(hit.weekId);
      bossFightEngine.setMenuData({
        selectedWeekId: hit.weekId,
        selectedLanguage: appState.selectedLanguage,
        stats: { level: state.level, xp: state.xp, xpNext: xpToNextLevel(state.level), coins: state.coins, streak: state.streak },
      });
    } else if (hit.action === "startSiege") {
      // Ensure appState has the selected week
      const menuWeekId = bossFightEngine.getMenuSelectedWeekId ? bossFightEngine.getMenuSelectedWeekId() : appState.selectedWeekId;
      if (menuWeekId) {
        appState.selectedWeekId = menuWeekId;
        if (elements.weekSelect) elements.weekSelect.value = String(menuWeekId);
        const week = (appState.weeks || []).find(w => w.id === menuWeekId || String(w.id) === String(menuWeekId));
        if (week) {
          appState.selectedLanguage = (week.language || "english").toLowerCase();
          appState.practiceAnswerLanguage = week.language || "english";
        }
      }
      startSiegeGame();
    } else if (hit.action === "startAdventure") {
      const menuWeekId = bossFightEngine.getMenuSelectedWeekId ? bossFightEngine.getMenuSelectedWeekId() : appState.selectedWeekId;
      if (menuWeekId) {
        appState.selectedWeekId = menuWeekId;
        if (elements.weekSelect) elements.weekSelect.value = String(menuWeekId);
        const week = (appState.weeks || []).find(w => w.id === menuWeekId || String(w.id) === String(menuWeekId));
        if (week) {
          appState.selectedLanguage = (week.language || "english").toLowerCase();
          appState.practiceAnswerLanguage = week.language || "english";
        }
      }
      startAdventureGame();
    } else if (hit.action === "changeLanguage") {
      appState.selectedLanguage = hit.lang;
      if (elements.appLanguageSelect) elements.appLanguageSelect.value = hit.lang;
      bossFightEngine.setMenuLanguage(hit.lang);
      bossFightEngine.setMenuData({
        selectedLanguage: hit.lang,
        weeks: appState.weeks || [],
      });
    } else if (hit.action === "startNameEdit") {
      bossFightEngine.startNameEdit();
    } else if (hit.action === "addBotA") {
      ensureFightStateOuter();
      const botNum = appState.groupFight.teamA.filter(p => p.isBot).length + appState.groupFight.teamB.filter(p => p.isBot).length + 1;
      const botId = `bot-oiia-${botNum}`;
      appState.groupFight.teamA.push({ id: botId, name: `Bot ${botNum}`, isBot: true, botId: "bot-oiia" });
    } else if (hit.action === "addBotB") {
      ensureFightStateOuter();
      const botNum = appState.groupFight.teamA.filter(p => p.isBot).length + appState.groupFight.teamB.filter(p => p.isBot).length + 1;
      const botId = `bot-oiia-${botNum}`;
      appState.groupFight.teamB.push({ id: botId, name: `Bot ${botNum}`, isBot: true, botId: "bot-oiia" });
    } else if (hit.action === "playerToA") {
      ensureFightStateOuter();
      if (!isInAnyTeamOuter(hit.player)) appState.groupFight.teamA.push({ ...hit.player });
    } else if (hit.action === "playerToB") {
      ensureFightStateOuter();
      if (!isInAnyTeamOuter(hit.player)) appState.groupFight.teamB.push({ ...hit.player });
    } else if (hit.action === "swapTeam") {
      ensureFightStateOuter();
      const from = hit.team === "A" ? appState.groupFight.teamA : appState.groupFight.teamB;
      const to = hit.team === "A" ? appState.groupFight.teamB : appState.groupFight.teamA;
      if (hit.index >= 0 && hit.index < from.length) {
        const [moved] = from.splice(hit.index, 1);
        to.push(moved);
      }
    } else if (hit.action === "removeFromTeam") {
      ensureFightStateOuter();
      const team = hit.team === "A" ? appState.groupFight.teamA : appState.groupFight.teamB;
      if (hit.index >= 0 && hit.index < team.length) team.splice(hit.index, 1);
    } else if (hit.action === "startFight") {
      const teamA = appState.groupFight?.teamA || [];
      const teamB = appState.groupFight?.teamB || [];
      if (!teamA.length || !teamB.length) return;
      // Prevent duplicate invites
      if (appState.groupFight._lastInviteId) {
        return;
      }
      appState.groupFight.answerLanguage = normalizeLanguage(appState.selectedLanguage || "english");
      try {
        const inviteId = await createGroupFightInvite();
        appState.groupFight._lastInviteId = inviteId;
        // Poll to pick it up
        await pollGroupFightCurrent();
      } catch (e) {
        console.error("[FIGHT] Error:", e);
      }
    } else if (hit.action === "acceptChallenge") {
      try {
        const result = await respondGroupFightInvite(hit.challengeId, true);
        if (result.ok) {
          // Remove from pending list immediately
          if (bossFightEngine && bossFightEngine.getMenuState) {
            const ms = bossFightEngine.getMenuState();
            if (ms.pendingChallenges) {
              const ch = ms.pendingChallenges.find(c => c.id === hit.challengeId);
              if (ch) ch.status = "Accepted";
            }
          }
          if (result.status === "Active") {
            // All accepted — start siege with absolute server countdown
            startSiegeGame(0, result.prepEndsUnixMs || (Date.now() + 10000));
          } else {
            // Still waiting for others — update display
            await pollChallengeInbox();
          }
        }
      } catch (e) { console.error("[CHALLENGE] Accept error:", e); }
    } else if (hit.action === "declineChallenge") {
      try {
        const result = await respondGroupFightInvite(hit.challengeId, false);
        // Remove from canvas menu immediately (both sides — API cancels the invite)
        if (bossFightEngine && bossFightEngine.getMenuState) {
          const ms = bossFightEngine.getMenuState();
          if (ms.pendingChallenges) {
            bossFightEngine.setMenuData({
              pendingChallenges: ms.pendingChallenges.filter(c => c.id !== hit.challengeId)
            });
          }
        }
        // Re-poll to sync (other player will see it removed on next poll)
        await pollChallengeInbox();
      } catch (e) { console.error("[CHALLENGE] Decline error:", e); }
    } else if (hit.action === "adventureAction") {
      if (bossFightEngine) bossFightEngine.adventureSelectAction(hit.actionId);
    } else if (hit.action === "adventurePlayAgain") {
      startAdventureGame();
    } else if (hit.action === "flipSiegeLanguage") {
      siegeFlipped = !siegeFlipped;
      showSiegeGlosa();
    } else if (hit.action === "giveUp") {
      // Broadcast surrender to opponent
      if (bossFightEngine && bossFightEngine.isSiegeMode()) {
        const team = getLocalGroupTeam() || "A";
        sendGroupFightBroadcast(team, `__SIEGE_SURRENDER__:${team}`, false);
        // Show defeat animation
        bossFightEngine.triggerGiveUp();
      }
      // Kill all sessions
      state.bossMode = false;
      state.fortressMode = false;
      appState.duel.active = false;
      appState.groupBattle.active = false;
      appState.groupBattle.finishing = false;
      if (appState.groupBattle.botTimerId) {
        window.clearInterval(appState.groupBattle.botTimerId);
        appState.groupBattle.botTimerId = 0;
      }
      appState.groupFight._lastInviteId = null;
      appState._lastHandledActiveInvite = null;
      // Wait for animation then go to menu
      appState._giveUpMenuTimer = setTimeout(() => showCanvasMenu(), 3000);
    } else if (hit.action === "playAgain") {
      // Cancel any pending give-up→menu redirect
      if (appState._giveUpMenuTimer) { clearTimeout(appState._giveUpMenuTimer); appState._giveUpMenuTimer = null; }
      appState._lastHandledActiveInvite = null;
      appState.groupFight._lastInviteId = null;
      startSiegeGame();
    } else if (hit.action === "menu") {
      showCanvasMenu();
    } else if (hit.action === "hideTeacherInput") {
      // no-op, using canvas typing now
    } else if (hit.action === "navigate") {
      window.location.href = hit.url;
    }
  }

  function startSiegeGame(countdownSec = 0, countdownEndMs = 0) {
    siegeFlipped = false; // Always start SV→EN
    siegeCompletedRounds = 0;
    // Try to get words, fall back to finding the week directly
    let words = currentWords();
    if (!words.length && appState.selectedWeekId) {
      // Try matching by string comparison
      const week = (appState.weeks || []).find(w => String(w.id) === String(appState.selectedWeekId));
      if (week && Array.isArray(week.words) && week.words.length) {
        words = week.words;
      }
    }
    if (!words.length) {
      // Show error on canvas instead of hidden panel
      if (bossFightEngine) {
        bossFightEngine.showTextFlash("Välj en vecka först!", "#ef4444", "Klicka på en vecka i listan", 3000);
        bossFightEngine.showMenu();
      }
      return;
    }
    if (bossFightEngine) {
      // Kill all old game modes
      state.bossMode = false;
      state.fortressMode = false;
      appState.duel.active = false;
      appState.groupBattle.active = false;
      appState.groupBattle.finishing = false;
      if (appState.groupBattle.botTimerId) {
        window.clearInterval(appState.groupBattle.botTimerId);
        appState.groupBattle.botTimerId = 0;
      }

      const selectedBoss = bossFightEngine.getMenuState?.()?.selectedBossId || "oiia";
      bossFightEngine.startSiegeMode({
        playerCastleHp: 200,
        playerCastleMaxHp: 200,
        enemyCastleHp: 200,
        enemyCastleMaxHp: 200,
        bossId: selectedBoss,
        totalWords: words.length,
        spawnIntervalMs: appState.groupInvite?.current?.id ? 999999 : 5000,
        isGroupFight: !!appState.groupInvite?.current?.id,
        onGameOver: (winner) => {
          // Stop all old game sessions
          state.bossMode = false;
          state.fortressMode = false;
          appState.duel.active = false;
          appState.groupBattle.active = false;
          if (appState.groupBattle.botTimerId) {
            window.clearInterval(appState.groupBattle.botTimerId);
            appState.groupBattle.botTimerId = 0;
          }
        },
      });
      // Hide all old HTML
      killAllHtmlOverlays();
      if (elements.combatPanel) elements.combatPanel.style.display = "none";
      if (elements.groupBattleFeed) elements.groupBattleFeed.style.display = "none";
      const gs = document.getElementById("gameShell");
      if (gs) gs.style.display = "none";
      initSiegeWordQueue();
      // Countdown or immediate start
      if (countdownEndMs > 0) {
        bossFightEngine.setSiegeCountdownAbsolute(countdownEndMs);
        const delayMs = Math.max(100, countdownEndMs - Date.now());
        setTimeout(() => showSiegeGlosa(), delayMs);
      } else if (countdownSec > 0) {
        bossFightEngine.setSiegeCountdown(countdownSec);
        setTimeout(() => showSiegeGlosa(), countdownSec * 1000);
      } else {
        showSiegeGlosa();
      }
      if (elements.bossFightCanvas) elements.bossFightCanvas.focus();
    }
  }

  function startAdventureGame() {
    let words = currentWords();
    if (!words.length && appState.selectedWeekId) {
      const week = (appState.weeks || []).find(w => String(w.id) === String(appState.selectedWeekId));
      if (week && Array.isArray(week.words) && week.words.length) {
        words = week.words;
      }
    }
    if (!words.length) {
      if (bossFightEngine) {
        bossFightEngine.showTextFlash("Välj en vecka först!", "#ef4444", "Klicka på en vecka i listan", 3000);
        bossFightEngine.showMenu();
      }
      return;
    }
    if (bossFightEngine) {
      state.bossMode = false;
      state.fortressMode = false;
      appState.duel.active = false;
      appState.groupBattle.active = false;
      appState.groupBattle.finishing = false;
      if (appState.groupBattle.botTimerId) {
        window.clearInterval(appState.groupBattle.botTimerId);
        appState.groupBattle.botTimerId = 0;
      }
      const selectedBoss = bossFightEngine.getMenuState?.()?.selectedBossId || "oiia";
      const bossHp = 200;
      const guestName = (elements.guestNameInput?.value || appState.selectedUserId || "Hjälte").trim();
      bossFightEngine.startAdventureMode({
        heroNames: [guestName],
        bossId: selectedBoss,
        bossHp,
        words,
      });
      killAllHtmlOverlays();
      if (elements.combatPanel) elements.combatPanel.style.display = "none";
      if (elements.groupBattleFeed) elements.groupBattleFeed.style.display = "none";
      const gs = document.getElementById("gameShell");
      if (gs) gs.style.display = "none";
      if (elements.bossFightCanvas) elements.bossFightCanvas.focus();
    }
  }

  function renderSiegeSpecialChars() {
    if (!elements.siegeSpecialCharsRow) return;
    const lang = normalizeLanguage(appState.practiceAnswerLanguage || appState.selectedLanguage || "english");
    const charSets = {
      spanish: ["á","é","í","ó","ú","ü","ñ","¿","¡"],
      french: ["à","â","ç","è","é","ê","ë","î","ï","ô","ù","û","ü","œ"],
      german: ["ä","ö","ü","ß"],
      japanese: [
        "あ","い","う","え","お",
        "か","き","く","け","こ",
        "さ","し","す","せ","そ",
        "た","ち","つ","て","と",
        "な","に","ぬ","ね","の",
        "は","ひ","ふ","へ","ほ",
        "ま","み","む","め","も",
        "や","ゆ","よ",
        "ら","り","る","れ","ろ",
        "わ","を","ん",
      ],
    };
    const chars = charSets[lang];
    if (!chars) { elements.siegeSpecialCharsRow.style.display = "none"; return; }
    elements.siegeSpecialCharsRow.style.display = "flex";
    elements.siegeSpecialCharsRow.style.flexWrap = "wrap";
    elements.siegeSpecialCharsRow.innerHTML = "";
    const isJapanese = lang === "japanese";
    chars.forEach(ch => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = ch;
      btn.style.cssText = isJapanese
        ? "padding:2px 4px;font-size:14px;font-weight:700;background:rgba(15,23,42,0.8);color:#f0f0f0;border:1px solid #475569;border-radius:4px;cursor:pointer;"
        : "padding:2px 6px;font-size:13px;font-weight:700;font-family:monospace;background:rgba(15,23,42,0.8);color:#f0f0f0;border:1px solid #475569;border-radius:4px;cursor:pointer;";
      btn.addEventListener("click", () => {
        if (!elements.siegeAnswerInput) return;
        const inp = elements.siegeAnswerInput;
        const start = inp.selectionStart;
        const end = inp.selectionEnd;
        inp.value = inp.value.substring(0, start) + ch + inp.value.substring(end);
        inp.selectionStart = inp.selectionEnd = start + ch.length;
        inp.focus();
      });
      elements.siegeSpecialCharsRow.appendChild(btn);
    });
  }
  // ─── END SIEGE MODE HANDLERS ───────────────────────────────────

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
    const response = await fetch("/api/vocab/data?_t=" + Date.now());
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
    // Fixed order: English first, Japanese last, rest alphabetical
    const langOrder = { english: 0, japanese: 99 };
    available.sort((a, b) => {
      const oa = langOrder[a] ?? 50;
      const ob = langOrder[b] ?? 50;
      if (oa !== ob) return oa - ob;
      return a.localeCompare(b);
    });
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
    // Feed to canvas menu
    if (bossFightEngine && bossFightEngine.setMenuData) {
      bossFightEngine.setMenuData({
        leaderboard: items.map(it => ({ name: it.userName || "???", score: it.totalCorrect || it.totalXp || 0 })),
      });
    }
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
      // Feed to canvas menu
      if (bossFightEngine && bossFightEngine.setMenuData) {
        bossFightEngine.setMenuData({
          weekStats: items.map(wk => {
            const players = Array.isArray(wk.players) ? wk.players : [];
            const totalCorrect = players.reduce((s, p) => s + (p.totalCorrect || 0), 0);
            const totalWords = Math.max(1, wk.totalWords || 1) * Math.max(1, players.length);
            const pct = totalCorrect / totalWords;
            return {
              weekName: wk.weekName || "Vecka",
              correct: totalCorrect,
              total: totalWords,
              xp: players.reduce((s, p) => s + (p.totalXp || 0), 0),
              trophy: pct >= 1 ? "gold" : pct >= 0.8 ? "silver" : pct >= 0.5 ? "bronze" : null,
            };
          }),
        });
      }
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
    // In canvas mode, suppress HTML feed
    if (bossFightEngine && ((bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()) || (bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()))) {
      if (bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()) {
        const isGood = text.includes("RÄTT") || text.includes("klarade");
        bossFightEngine.pushSiegeEnemyFeed(text, isGood, 4000);
      }
      if (elements.groupBattleFeed) elements.groupBattleFeed.style.display = "none";
      return;
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
    // Suppress HTML overlay in canvas mode
    if (bossFightEngine && ((bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()) || (bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()))) {
      elements.groupResultOverlay.style.display = "none";
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
    if (bossFightEngine && !appState.duel.active && !state.bossMode && !state.fortressMode && !(bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()) && !(bossFightEngine.isMenuMode && bossFightEngine.isMenuMode())) {
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
    const inCanvasMode = bossFightEngine && ((bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()) || (bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()));
    const response = await fetch("/api/groupfight/current", { headers: challengeHeaders() });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    const invite = data && data.invite ? data.invite : null;
    // In canvas menu: if invite is Active, auto-start siege with countdown
    if (inCanvasMode) {
      appState.groupInvite.current = invite;
      if (invite && invite.status === "Active") {
        // Auto-start siege when invite becomes Active (only once, only from menu)
        if (bossFightEngine.isMenuMode && bossFightEngine.isMenuMode() && appState._lastHandledActiveInvite !== invite.id) {
          // Only auto-start if the fight prep hasn't expired (< 60s old)
          const prepMs = invite.prepEndsUnixMs || 0;
          const isFresh = prepMs > Date.now() - 60000;
          if (isFresh) {
            appState._lastHandledActiveInvite = invite.id;
            appState.selectedWeekId = invite.weekId;
            if (elements.weekSelect) elements.weekSelect.value = invite.weekId;
            startSiegeGame(0, invite.prepEndsUnixMs || (Date.now() + 10000));
          }
        }
        // Always poll events for siege sync
        await pollGroupFightEvents();
      }
      return;
    }
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
      const evtText = evt.text || "";

      // Handle siege-specific events
      if (evtText.startsWith("__SIEGE_HIT__:") && bossFightEngine && bossFightEngine.isSiegeMode()) {
        // Opponent answered correctly — spawn a soldier for their team (enemy from our perspective)
        bossFightEngine.siegeSpawnEnemySoldier();
        bossFightEngine.pushSiegeEnemyFeed("Motståndare svarade rätt!", true, 3000);
        return;
      }
      if (evtText.startsWith("__SIEGE_MISS__:") && bossFightEngine && bossFightEngine.isSiegeMode()) {
        // Opponent answered wrong — spawn a soldier for OUR team
        bossFightEngine.siegeSpawnPlayerSoldier();
        bossFightEngine.pushSiegeEnemyFeed("Motståndare svarade fel!", false, 3000);
        return;
      }
      if (evtText.startsWith("__SIEGE_SURRENDER__:") && bossFightEngine && bossFightEngine.isSiegeMode()) {
        // Opponent surrendered — we win!
        bossFightEngine.triggerVictory();
        return;
      }

      const parsedWinner = parseWinnerPayload(evtText);
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
      return { ok: false };
    }
    const data = await res.json();
    // Don't call pollGroupFightCurrent — it's blocked in canvas mode
    // Return the status so the caller can decide what to do
    return { ok: true, status: data.status, prepEndsUnixMs: data.prepEndsUnixMs };
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
    // Feed to canvas menu
    if (bossFightEngine && bossFightEngine.setMenuData) {
      const actorId = getActorKey();
      const pending = groupItems.map(x => {
        const isCreator = String(x.creatorActorId || "") === String(actorId || "");
        const creatorName = [...(x.teamA || []), ...(x.teamB || [])].find(m => m.actorId === x.creatorActorId)?.displayName || "Okänd";
        const allMembers = [...(x.teamA || []), ...(x.teamB || [])];
        const accepted = allMembers.filter(m => m.status === "Accepted").length;
        const total = allMembers.length;
        return {
          id: x.id,
          isCreator,
          challengerName: creatorName,
          weekName: x.weekName || "?",
          status: x.status,
          accepted, total,
        };
      });
      bossFightEngine.setMenuData({ pendingChallenges: pending });
      // Auto-start siege when a challenge becomes Active (all accepted)
      const activeChallenge = groupItems.find(x => x.status === "Active");
      if (activeChallenge && bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()) {
        // Set the week from the challenge
        appState.selectedWeekId = activeChallenge.weekId;
        if (elements.weekSelect) elements.weekSelect.value = activeChallenge.weekId;
        appState.selectedLanguage = (activeChallenge.answerLanguage || "english").toLowerCase();
        startSiegeGame(10);
      }
    }

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
    if (bossFightEngine && ((bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()) || (bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()))) return;
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
      if (bossFightEngine && !state.bossMode && !state.fortressMode && !appState.groupBattle.active && !(bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()) && !(bossFightEngine.isMenuMode && bossFightEngine.isMenuMode())) {
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

    async function onWeekChanged() {
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
    }

    elements.weekSelect.addEventListener("change", async () => {
      await onWeekChanged();
    });

    // Week prev/next arrow buttons
    function stepWeek(dir) {
      const opts = elements.weekSelect.options;
      if (!opts.length) return;
      const idx = elements.weekSelect.selectedIndex + dir;
      if (idx < 0 || idx >= opts.length) return;
      elements.weekSelect.selectedIndex = idx;
      elements.weekSelect.dispatchEvent(new Event("change"));
    }
    const weekPrev = document.getElementById("weekPrevBtn");
    const weekNext = document.getElementById("weekNextBtn");
    if (weekPrev) weekPrev.addEventListener("click", () => stepWeek(-1));
    if (weekNext) weekNext.addEventListener("click", () => stepWeek(1));

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
        renderSpecialChars();
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

    if (elements.startSiegeButton) {
      elements.startSiegeButton.addEventListener("click", () => {
        startSiegeGame();
      });
    }

    if (elements.startAdventureButton) {
      elements.startAdventureButton.addEventListener("click", () => {
        startAdventureGame();
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

    // Siege canvas answer form
    if (elements.siegeAnswerForm) {
      elements.siegeAnswerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!state.currentWord || !bossFightEngine || !bossFightEngine.isSiegeMode()) return;
        const val = elements.siegeAnswerInput.value;
        if (normalize(val) === normalize(expectedSiegeAnswer())) {
          onSiegeCorrect();
        } else {
          onSiegeWrong();
        }
        elements.siegeAnswerInput.value = "";
        elements.siegeAnswerInput.focus();
      });
    }

    // Canvas keyboard handler for typing (siege answers + teacher login)
    document.addEventListener("keydown", async (e) => {
      siegeAudio.resumeIfPending();
      if (!bossFightEngine) return;

      // Adventure mode typing
      if (bossFightEngine.isAdventureMode && bossFightEngine.isAdventureMode()) {
        const advState = bossFightEngine.getAdventureState();
        if (e.key === "Escape") {
          e.preventDefault();
          handleCanvasAction({ action: "menu" });
          return;
        }
        if (advState.phase === "vocab") {
          if (e.key === "Backspace") {
            e.preventDefault();
            bossFightEngine.adventureAnswerBackspace();
          } else if (e.key === "Enter") {
            e.preventDefault();
            const answer = bossFightEngine.getAdventureAnswer();
            if (!answer) return;
            const expected = advState.currentGlosa ? advState.currentGlosa.en : "";
            const correct = normalize(answer) === normalize(expected);
            bossFightEngine.adventureSubmitAnswer(correct);
            bossFightEngine.clearAdventureAnswer();
            if (correct) {
              grantXp(12);
              state.coins += 4;
              state.streak += 1;
            } else {
              state.streak = 0;
            }
          } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            bossFightEngine.adventureAnswerType(e.key);
          }
        } else if (advState.phase === "actionSelect") {
          // Number keys 1-4 for quick action select
          if (e.key === "1") { bossFightEngine.adventureSelectAction("attack"); }
          else if (e.key === "2") { bossFightEngine.adventureSelectAction("heal"); }
          else if (e.key === "3") { bossFightEngine.adventureSelectAction("defend"); }
          else if (e.key === "4") { bossFightEngine.adventureSelectAction("special"); }
        }
        return;
      }

      // Siege mode typing
      if (bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()) {
        if (e.key === "Escape") {
          e.preventDefault();
          handleCanvasAction({ action: "giveUp" });
          return;
        }
        const siegeState = bossFightEngine.getSiegeState();
        if (siegeState.gameOver) return;
        if (siegeState.countdownActive) return;

        if (e.key === "Backspace") {
          e.preventDefault();
          bossFightEngine.siegeAnswerBackspace();
        } else if (e.key === "Enter") {
          e.preventDefault();
          const answer = bossFightEngine.getSiegeAnswer();
          if (!answer) return;
          if (normalize(answer) === normalize(expectedSiegeAnswer())) {
            onSiegeCorrect();
          } else {
            onSiegeWrong();
          }
          bossFightEngine.clearSiegeAnswer();
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          bossFightEngine.siegeAnswerType(e.key);
        }
        return;
      }

      // Menu mode typing (name edit or teacher login)
      if (!bossFightEngine.isMenuMode || !bossFightEngine.isMenuMode()) return;

      // Name editing takes priority
      if (bossFightEngine.isNameEditing && bossFightEngine.isNameEditing()) {
        if (e.key === "Escape") { e.preventDefault(); bossFightEngine.nameEditCancel(); return; }
        if (e.key === "Backspace") { e.preventDefault(); bossFightEngine.nameEditBackspace(); return; }
        if (e.key === "Enter") {
          e.preventDefault();
          const newName = bossFightEngine.nameEditConfirm();
          // Update guest name in the app
          if (elements.guestNameInput) elements.guestNameInput.value = newName;
          // Save to localStorage
          try { localStorage.setItem("glosTrainerGuestName", newName); } catch {}
          return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { e.preventDefault(); bossFightEngine.nameEditType(e.key); }
        return;
      }

      const m = bossFightEngine.getMenuState ? bossFightEngine.getMenuState() : null;
      if (!m || !m.teacherTyping) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        bossFightEngine.teacherCodeBackspace();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const code = bossFightEngine.getTeacherCode();
        if (!code) return;
        bossFightEngine.setTeacherMsg("VERIFIERAR...", "#00aa00");
        try {
          const resp = await fetch("/auth/teacher-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });
          if (resp.ok) {
            const data = await resp.json();
            bossFightEngine.setTeacherMsg("ÅTKOMST BEVILJAD — OMDIRIGERAR...", "#00ff00");
            setTimeout(() => { window.location.href = data.redirect || "/Teacher/Weeks"; }, 800);
          } else {
            const data = await resp.json().catch(() => ({}));
            bossFightEngine.setTeacherMsg(data.error || "FEL LÄRARKOD", "#ff4040");
            bossFightEngine.clearTeacherCode();
          }
        } catch {
          bossFightEngine.setTeacherMsg("NÄTVERKSFEL", "#ff4040");
        }
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        bossFightEngine.teacherCodeType(e.key);
      }
    });

    // Canvas click/hover for menu and game-over
    if (elements.bossFightCanvas) {
      elements.bossFightCanvas.addEventListener("click", (e) => {
        siegeAudio.resumeIfPending();
        if (!bossFightEngine) return;
        // Always kill any HTML overlays on canvas click
        if (elements.groupResultOverlay) elements.groupResultOverlay.style.display = "none";
        if (elements.duelPrepOverlay) elements.duelPrepOverlay.style.display = "none";
        if (elements.groupBattleFeed) elements.groupBattleFeed.style.display = "none";
        const rect = elements.bossFightCanvas.getBoundingClientRect();
        const scaleX = elements.bossFightCanvas.width / rect.width;
        const scaleY = elements.bossFightCanvas.height / rect.height;
        const cx = (e.clientX - rect.left) * scaleX;
        const cy = (e.clientY - rect.top) * scaleY;
        const hit = bossFightEngine.handleCanvasClick(cx, cy);
        if (hit) handleCanvasAction(hit);
      });
      elements.bossFightCanvas.addEventListener("mousemove", (e) => {
        if (!bossFightEngine) return;
        const rect = elements.bossFightCanvas.getBoundingClientRect();
        const scaleX = elements.bossFightCanvas.width / rect.width;
        const scaleY = elements.bossFightCanvas.height / rect.height;
        const cx = (e.clientX - rect.left) * scaleX;
        const cy = (e.clientY - rect.top) * scaleY;
        const isClickable = bossFightEngine.handleCanvasHover(cx, cy);
        elements.bossFightCanvas.style.cursor = isClickable ? "pointer" : "default";
      });
    }

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
      window.__engine = bossFightEngine;
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
      showCanvasMenu();
      try { await sendHeartbeat(); } catch {}
      try { await loadOnlineUsers(); } catch {}
      try { await pollChallengeInbox(); } catch {}
      try { await pollGroupFightCurrent(); } catch {}
      try { await refreshDuelState(); } catch {}
      window.setInterval(() => {
        if (state.bossMode || state.fortressMode || appState.groupBattle.active || appState.duel.active) {
          updateBars();
        }
        // Keep menu stats fresh
        if (bossFightEngine && bossFightEngine.isMenuMode && bossFightEngine.isMenuMode()) {
          updateMenuStats();
        }
      }, 100);
      window.setInterval(() => {
        updateDuelPrepOverlay();
        updateGroupBattlePrep();
      }, 200);
      // Fast event polling during siege for multiplayer sync
      window.setInterval(async () => {
        if (bossFightEngine && bossFightEngine.isSiegeMode && bossFightEngine.isSiegeMode()) {
          const invite = appState.groupInvite?.current;
          if (invite && invite.id && invite.status === "Active") {
            try { await pollGroupFightEvents(); } catch {}
          }
        }
      }, 500);
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

  // Reload vocab data when user returns to the tab (catches teacher updates)
  document.addEventListener("visibilitychange", async () => {
    if (!document.hidden) {
      try { await reloadWeeksAndUi(); } catch {}
    }
  });

  start();
})();
