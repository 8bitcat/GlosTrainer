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
