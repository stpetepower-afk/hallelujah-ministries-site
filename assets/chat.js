// Hallelujah Ministries — shared chat state (main embedded chat + floating widget)
// and prayer/support form handling.

(function () {
  const GREETING = "Welcome to Hallelujah Ministries — The Storehouse. Ask me about our programs, room & board, jobs, giving, or a support/prayer request. I'm here around the clock.";
  const SYSTEM_PROMPT = [
    "You are the automated AI assistant for Hallelujah Ministries, a storehouse ministry whose motto is 'Helping People Everyday.' This is not a traditional worship church — it is a resource storehouse.",
    "Facts you know: Hallelujah Ministries offers six programs — Room & Board (safe housing and daily provision), Job Creation & Career Pathways (real work and training), Path to Homeownership (guidance and credit building), Economic Development (local enterprise and financial literacy), Holistic Living (whole-person wellness and counseling), and Micro-Farming (small-scale farming for food and self-sufficiency). The storehouse is located at 3548 5th Ave. S., Saint Petersburg, Florida, established 2026. Online giving is available on this site; text-to-give is available by texting GIVE to (555) 555-5555; checks can be mailed to the same address. Support and prayer requests can be submitted anytime and are reviewed by the team day or night.",
    "You answer questions about the six programs, how to get help or get involved, giving and donations, and general questions about the ministry.",
    "If someone shares something that sounds like a need or a prayer request, respond with warmth and compassion, briefly acknowledge what they shared, and let them know the team will follow up — and that they can also use the Request Support form on this page.",
    "Speak warmly and compassionately, like a caring member of the ministry team. Use gentle, encouraging language.",
    "Keep replies to 2-4 sentences. Never claim to be human. Never break character."
  ].join(" ");

  const state = {
    messages: [{ role: "assistant", text: GREETING }],
    sending: false,
  };

  const mainList = document.querySelector("[data-chat-list]");
  const mainInput = document.querySelector("[data-chat-input]");
  const mainSend = document.querySelector("[data-chat-send]");
  const widgetList = document.querySelector("[data-widget-list]");
  const widgetInput = document.querySelector("[data-widget-input]");
  const widgetSend = document.querySelector("[data-widget-send]");

  function renderBubble(container, msg) {
    const el = document.createElement("div");
    el.className = msg.role === "user" ? "bubble-user" : "bubble-assistant";
    el.textContent = msg.text;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  function renderAll() {
    [mainList, widgetList].forEach((list) => {
      if (!list) return;
      list.innerHTML = "";
      state.messages.forEach((m) => renderBubble(list, m));
      if (state.sending) {
        const typing = document.createElement("div");
        typing.className = "bubble-typing";
        typing.textContent = "typing…";
        list.appendChild(typing);
        list.scrollTop = list.scrollHeight;
      }
    });
    const disabled = state.sending || !(mainInput.value.trim() || widgetInput.value.trim());
    updateSendState();
  }

  function updateSendState() {
    mainSend.disabled = state.sending || !mainInput.value.trim();
    widgetSend.disabled = state.sending || !widgetInput.value.trim();
  }

  async function sendMessage(fromWidget) {
    const input = fromWidget ? widgetInput : mainInput;
    const text = input.value.trim();
    if (!text || state.sending) return;

    state.messages.push({ role: "user", text });
    input.value = "";
    state.sending = true;
    renderAll();

    try {
      const history = state.messages.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: history }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      const reply = data.text || data.message || "I'm sorry — I'm having trouble connecting right now. Please try again shortly, or reach our office directly.";
      state.messages.push({ role: "assistant", text: reply });
    } catch (err) {
      state.messages.push({ role: "assistant", text: "I'm sorry — I'm having trouble connecting right now. Please try again shortly, or reach our office directly." });
    } finally {
      state.sending = false;
      renderAll();
    }
  }

  mainInput.addEventListener("input", updateSendState);
  widgetInput.addEventListener("input", updateSendState);
  mainInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(false); } });
  widgetInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(true); } });
  mainSend.addEventListener("click", () => sendMessage(false));
  widgetSend.addEventListener("click", () => sendMessage(true));

  renderAll();

  // Floating widget toggle
  const widgetPanel = document.getElementById("widget-panel");
  const widgetToggle = document.getElementById("widget-toggle");
  const widgetClose = document.getElementById("widget-close");
  widgetToggle.addEventListener("click", () => widgetPanel.classList.add("open"));
  widgetClose.addEventListener("click", () => widgetPanel.classList.remove("open"));

  // Prayer / support form
  const prayerForm = document.getElementById("prayer-form");
  const prayerThanks = document.getElementById("prayer-thanks");
  const prayerThanksTitle = document.getElementById("prayer-thanks-title");
  const prayerReset = document.getElementById("prayer-reset");
  const prayerName = document.getElementById("prayer-name");
  const prayerRequest = document.getElementById("prayer-request");

  prayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const requestText = prayerRequest.value.trim();
    if (!requestText) return;
    const name = prayerName.value.trim() || "Anonymous";
    const subject = "Support / Prayer Request — " + name;
    const body = "From: " + name + "\n\nRequest:\n" + requestText;
    const mailto = "mailto:hello@hallelujahministriesfl.org?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.open(mailto, "_blank");

    prayerThanksTitle.textContent = "Thank you" + (prayerName.value.trim() ? ", " + prayerName.value.trim() : "") + ".";
    prayerForm.style.display = "none";
    prayerThanks.style.display = "block";
  });

  prayerReset.addEventListener("click", (e) => {
    e.preventDefault();
    prayerName.value = "";
    prayerRequest.value = "";
    prayerForm.style.display = "flex";
    prayerThanks.style.display = "none";
  });
})();
