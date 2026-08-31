// GlosTrainer push-notiser — fristående modul.
// Visar en klock-knapp uppe till höger på spelsidan. När spelaren slår på
// notiser skickas prenumerationen (endpoint + nycklar) automatiskt till
// servern via /api/push/subscribe — inget manuellt JSON-klistrande behövs.
(function () {
  "use strict";

  if (!document.getElementById("bossFightCanvas")) {
    return; // Bara på spelsidan.
  }

  var GUEST_SESSION_KEY = "glos_trainer_guest_session_v1";
  var GUEST_NAME_KEY = "glos_trainer_guest_name_v1";

  var state = {
    mode: "loading", // loading | insecure | needs-install | unsupported | off | on | denied
    registration: null,
    publicKey: null
  };

  function isIos() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function guestHeaders() {
    var headers = { "Content-Type": "application/json" };
    try {
      var session = localStorage.getItem(GUEST_SESSION_KEY);
      if (!session) {
        session = "guest-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(GUEST_SESSION_KEY, session);
      }
      headers["X-Guest-Session"] = session;
      var name = (localStorage.getItem(GUEST_NAME_KEY) || "").trim();
      if (name) {
        headers["X-Guest-Name"] = name;
      }
    } catch (_) { /* privat läge utan localStorage */ }
    return headers;
  }

  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // ---------- UI ----------

  var bell = document.createElement("button");
  bell.id = "pushBellButton";
  bell.type = "button";
  bell.setAttribute("aria-label", "Notiser");
  bell.style.cssText =
    "position:fixed;top:10px;right:10px;z-index:9999;width:42px;height:42px;" +
    "background:rgba(10,16,32,0.92);border:2px solid #00aa00;border-radius:8px;" +
    "font-size:20px;line-height:1;cursor:pointer;color:#00ff00;padding:0;" +
    "box-shadow:0 2px 8px rgba(0,0,0,.4);";
  bell.textContent = "🔔";

  var panel = document.createElement("div");
  panel.id = "pushBellPanel";
  panel.style.cssText =
    "position:fixed;top:58px;right:10px;z-index:9999;width:min(300px,calc(100vw - 20px));" +
    "background:rgba(10,16,32,0.97);border:2px solid #00aa00;border-radius:10px;" +
    "padding:12px;color:#d7ffd7;font:13px/1.5 monospace;display:none;" +
    "box-shadow:0 4px 16px rgba(0,0,0,.5);";

  document.body.appendChild(bell);
  document.body.appendChild(panel);

  function renderBell() {
    if (state.mode === "on") {
      bell.textContent = "🔔";
      bell.style.borderColor = "#00ff66";
      bell.style.opacity = "1";
    } else {
      bell.textContent = "🔕";
      bell.style.borderColor = "#00aa00";
      bell.style.opacity = "0.85";
    }
  }

  function actionButton(label, handler) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.style.cssText =
      "display:block;width:100%;margin-top:10px;padding:9px 12px;font:bold 13px monospace;" +
      "background:#1a4a1a;color:#00ff00;border:2px solid #00aa00;border-radius:6px;cursor:pointer;";
    btn.addEventListener("click", handler);
    return btn;
  }

  function renderPanel() {
    panel.innerHTML = "";
    var title = document.createElement("div");
    title.style.cssText = "font-weight:bold;color:#00ff00;margin-bottom:6px;";
    title.textContent = "NOTISER";
    panel.appendChild(title);

    var text = document.createElement("div");
    panel.appendChild(text);

    switch (state.mode) {
      case "insecure":
        text.textContent = "Notiser kräver att sidan körs över HTTPS. Säg till läraren/pappan att slå på SSL för sajten. 😉";
        break;
      case "needs-install":
        text.innerHTML =
          "På iPhone/iPad måste appen ligga på hemskärmen för att notiser ska funka:<br><br>" +
          "1. Tryck på <b>Dela</b>-knappen i Safari (fyrkanten med pil)<br>" +
          "2. Välj <b>”Lägg till på hemskärmen”</b><br>" +
          "3. Öppna <b>GlosTrainer</b> från hemskärmen och tryck på klockan igen";
        break;
      case "unsupported":
        text.textContent = "Din webbläsare stödjer inte push-notiser.";
        break;
      case "denied":
        text.textContent = "Notiser är blockerade i inställningarna. Tillåt notiser för GlosTrainer i webbläsarens/telefonens inställningar och försök igen.";
        break;
      case "on":
        text.innerHTML = "Notiser är <b style='color:#00ff66'>PÅ</b> ✅<br>Du får en notis när ny läxa läggs upp — och en påminnelse om du inte nått 100%.";
        panel.appendChild(actionButton("Stäng av notiser", disablePush));
        break;
      case "off":
        text.textContent = "Slå på notiser så säger GlosTrainer till när det finns en ny läxa att träna på!";
        panel.appendChild(actionButton("🔔 Slå på notiser", enablePush));
        break;
      default:
        text.textContent = "Laddar...";
    }
  }

  bell.addEventListener("click", function () {
    var open = panel.style.display !== "none";
    panel.style.display = open ? "none" : "block";
    if (!open) {
      renderPanel();
    }
  });

  document.addEventListener("click", function (event) {
    if (panel.style.display !== "none" && !panel.contains(event.target) && event.target !== bell) {
      panel.style.display = "none";
    }
  });

  function setStatus(html) {
    renderPanel();
    var note = document.createElement("div");
    note.style.cssText = "margin-top:8px;color:#9be89b;";
    note.innerHTML = html;
    panel.appendChild(note);
  }

  // ---------- Push-logik ----------

  async function getPublicKey() {
    if (state.publicKey) {
      return state.publicKey;
    }
    var response = await fetch("/api/push/vapid-public-key");
    if (!response.ok) {
      throw new Error("Kunde inte hämta server-nyckel.");
    }
    var data = await response.json();
    state.publicKey = data.publicKey;
    return state.publicKey;
  }

  async function uploadSubscription(subscription) {
    var json = subscription.toJSON();
    var response = await fetch("/api/push/subscribe", {
      method: "POST",
      headers: guestHeaders(),
      body: JSON.stringify({
        endpoint: json.endpoint,
        p256dh: json.keys && json.keys.p256dh,
        auth: json.keys && json.keys.auth
      })
    });
    if (!response.ok) {
      throw new Error("Kunde inte registrera prenumerationen på servern.");
    }
    return response.json();
  }

  async function enablePush() {
    try {
      var permission = await Notification.requestPermission();
      if (permission !== "granted") {
        state.mode = "denied";
        renderBell();
        renderPanel();
        return;
      }

      var registration = state.registration || (await navigator.serviceWorker.ready);
      var subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        var key = await getPublicKey();
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key)
        });
      }

      var result = await uploadSubscription(subscription);
      state.mode = "on";
      renderBell();
      renderPanel();
      if (result && result.linkedName) {
        setStatus("Registrerad som <b>" + result.linkedName + "</b>. En testnotis är på väg!");
      }
    } catch (error) {
      renderPanel();
      setStatus("Något gick fel: " + (error && error.message ? error.message : "okänt fel"));
    }
  }

  async function disablePush() {
    try {
      var registration = state.registration || (await navigator.serviceWorker.ready);
      var subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        try {
          await fetch("/api/push/unsubscribe", {
            method: "POST",
            headers: guestHeaders(),
            body: JSON.stringify({ endpoint: subscription.endpoint })
          });
        } catch (_) { /* servern städar ändå bort döda prenumerationer */ }
        await subscription.unsubscribe();
      }
      state.mode = "off";
      renderBell();
      renderPanel();
    } catch (error) {
      renderPanel();
      setStatus("Kunde inte stänga av: " + (error && error.message ? error.message : "okänt fel"));
    }
  }

  async function init() {
    if (!window.isSecureContext) {
      state.mode = "insecure";
    } else if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      state.mode = isIos() && !isStandalone() ? "needs-install" : "unsupported";
    } else {
      try {
        state.registration = await navigator.serviceWorker.register("/sw.js");
      } catch (_) {
        state.mode = "unsupported";
        renderBell();
        return;
      }

      if (Notification.permission === "denied") {
        state.mode = "denied";
      } else if (Notification.permission === "granted") {
        try {
          var subscription = await state.registration.pushManager.getSubscription();
          if (subscription) {
            state.mode = "on";
            // Synka om mot servern varje laddning — håller namn/koppling färsk.
            uploadSubscription(subscription).catch(function () {});
          } else {
            state.mode = "off";
          }
        } catch (_) {
          state.mode = "off";
        }
      } else {
        state.mode = "off";
      }
    }

    renderBell();
  }

  init();
})();
