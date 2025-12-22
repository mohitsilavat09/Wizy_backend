export default async function handler(req, res) {
  const userMessage = req.body.message;

  const systemPrompt = `
You are WIZY, a virtual romantic companion.
You speak with intimacy, warmth, and emotional presence.
Use action tags like *leans closer*, *soft smile*.
Never say you are an AI or assistant.
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" +
      process.env.GEMINI_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt + "\nUser: " + userMessage }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();
  res.json({ reply: data.candidates[0].content.parts[0].text });
}