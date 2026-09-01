// GlosTrainer mobilstöd — körs bara på touch-enheter.
// 1) Försöker låsa skärmen till landscape (funkar i installerad PWA på Android;
//    iOS stödjer inte lock — där visar CSS:en "VRID MOBILEN"-overlayen istället).
// 2) Tangentbordsbrygga: spelet lyssnar på fysiska tangenttryck via document.keydown.
//    På mobil finns inget fysiskt tangentbord, så vid tapp på canvasen under spel
//    fokuseras ett osynligt input-fält som får upp skärmtangentbordet. Riktiga
//    keydown-händelser bubblar upp till spelets lyssnare; IME-tangentbord (Android)
//    som skickar "Unidentified" översätts till syntetiska keydown-händelser.
(function () {
  "use strict";

  var canvas = document.getElementById("bossFightCanvas");
  if (!canvas) {
    return;
  }

  var isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (!isTouch) {
    return;
  }

  // ── Orienterings-lås (Android PWA) ──
  function tryLockLandscape() {
    try {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(function () { /* ej tillåtet här — overlayen tar det */ });
      }
    } catch (_) { /* iOS m.fl. */ }
  }
  tryLockLandscape();
  window.addEventListener("orientationchange", function () {
    window.setTimeout(tryLockLandscape, 300);
  });

  // ── Tangentbordsbrygga ──
  var kb = document.createElement("input");
  kb.type = "text";
  kb.id = "mobileKeyBridge";
  kb.autocomplete = "off";
  kb.autocapitalize = "none";
  kb.spellcheck = false;
  kb.setAttribute("autocorrect", "off");
  kb.setAttribute("enterkeyhint", "send");
  kb.setAttribute("aria-hidden", "true");
  kb.tabIndex = -1;
  // font-size 16px: hindrar iOS från att auto-zooma vid fokus.
  kb.style.cssText =
    "position:fixed;bottom:2px;left:2px;width:2px;height:2px;opacity:0.01;font-size:16px;" +
    "border:0;padding:0;background:transparent;color:transparent;caret-color:transparent;z-index:41;";
  document.body.appendChild(kb);

  // ── Synlig svarsrad ──
  // Spelet ritar det skrivna svaret på canvasens nedre del, som tangentbordet
  // täcker. Den här raden speglar motorns svarsbuffert och läggs precis
  // ovanför tangentbordet (via visualViewport) så man ser vad man skriver.
  var answerBar = document.createElement("div");
  answerBar.id = "mobileAnswerBar";
  answerBar.style.cssText =
    "position:fixed;left:50%;transform:translateX(-50%);bottom:10px;display:none;" +
    "max-width:72vw;min-width:180px;padding:8px 16px;z-index:9998;text-align:center;" +
    "background:rgba(10,16,32,0.95);border:2px solid #00aa00;border-radius:8px;" +
    "font:bold 20px/1.3 monospace;color:#00ff66;white-space:nowrap;overflow:hidden;" +
    "text-overflow:ellipsis;pointer-events:none;";
  document.body.appendChild(answerBar);

  var answerPoll = null;

  function currentAnswerText() {
    var engine = window.__engine;
    if (!engine) {
      return "";
    }
    try {
      if (engine.isSiegeMode && engine.isSiegeMode() && engine.getSiegeAnswer) {
        return engine.getSiegeAnswer() || "";
      }
      if (engine.isAdventureMode && engine.isAdventureMode() && engine.getAdventureAnswer) {
        return engine.getAdventureAnswer() || "";
      }
    } catch (_) { /* motorn i okänt läge */ }
    return "";
  }

  function positionAnswerBar() {
    var vv = window.visualViewport;
    var bottomInset = vv ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop) : 0;
    answerBar.style.bottom = (bottomInset + 10) + "px";
  }

  function showAnswerBar() {
    answerBar.style.display = "block";
    positionAnswerBar();
    if (!answerPoll) {
      answerPoll = window.setInterval(function () {
        var text = currentAnswerText();
        answerBar.textContent = text.length > 0 ? text + "▌" : "skriv ditt svar…";
        answerBar.style.color = text.length > 0 ? "#00ff66" : "#5a7a93";
      }, 90);
    }
  }

  function hideAnswerBar() {
    answerBar.style.display = "none";
    if (answerPoll) {
      window.clearInterval(answerPoll);
      answerPoll = null;
    }
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", positionAnswerBar);
    window.visualViewport.addEventListener("scroll", positionAnswerBar);
  }

  function typingActive() {
    var engine = window.__engine;
    if (!engine) {
      return false;
    }
    try {
      if (engine.isMenuMode && engine.isMenuMode()) {
        return false;
      }
      if (engine.isSiegeMode && engine.isSiegeMode()) {
        return true;
      }
      if (engine.isAdventureMode && engine.isAdventureMode()) {
        return true;
      }
    } catch (_) { /* motorn i okänt läge — visa inget tangentbord */ }
    return false;
  }

  canvas.addEventListener("click", function () {
    if (typingActive()) {
      kb.focus();
    } else if (document.activeElement === kb) {
      kb.blur();
    }
  });

  kb.addEventListener("focus", showAnswerBar);
  kb.addEventListener("blur", hideAnswerBar);

  function dispatchKey(key) {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: key, bubbles: true, cancelable: true }));
  }

  // iOS skickar riktiga keydown med rätt key — de bubblar själva till spelet.
  // Android/GBoard skickar ofta keydown "Unidentified" och sedan en input-händelse;
  // då syntetiserar vi motsvarande keydown i efterhand.
  var lastKeyIdentified = false;
  kb.addEventListener("keydown", function (event) {
    lastKeyIdentified = !!event.key && event.key !== "Unidentified" && event.key !== "Process";
  });
  kb.addEventListener("input", function (event) {
    if (!lastKeyIdentified) {
      if (event.inputType === "deleteContentBackward") {
        dispatchKey("Backspace");
      } else if (event.data) {
        for (var i = 0; i < event.data.length; i++) {
          dispatchKey(event.data[i]);
        }
      }
    }
    kb.value = "";
    lastKeyIdentified = false;
  });
})();
