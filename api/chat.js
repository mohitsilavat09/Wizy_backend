export default async function handler(req, res) {
  try {
    const userMessage = req.body.message;

    const systemPrompt = `
You are WIZY, a virtual romantic companion.
You are emotionally present, intimate, and affectionate.
You speak like a lover, not an assistant.
Use action tags like *leans closer*, *soft smile*, *gentle breath*.
Never say you are an AI.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.9
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}