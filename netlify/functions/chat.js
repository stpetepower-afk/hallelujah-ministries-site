// netlify/functions/chat.js
// Backend for the Hallelujah Ministries AI assistant.
// Receives { system, messages } from the frontend and forwards to the Anthropic API.
// Requires an environment variable ANTHROPIC_API_KEY set in Netlify's site settings
// (Site configuration -> Environment variables) — never put the key in frontend code.

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server is not configured with an API key yet. Ask the site admin to set ANTHROPIC_API_KEY." }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const { system, messages } = payload;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "messages is required" }) };
  }

  // Basic abuse guardrails: cap history length and message size.
  const trimmedMessages = messages.slice(-30).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: String(m.content || "").slice(0, 4000),
  }));

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 500,
        system: String(system || "").slice(0, 4000),
        messages: trimmedMessages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return { statusCode: 502, body: JSON.stringify({ error: "Upstream error", detail: errText.slice(0, 500) }) };
    }

    const data = await res.json();
    const text = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text || "I'm sorry — I didn't quite catch that. Could you rephrase?" }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error", detail: String(err && err.message) }) };
  }
};
