const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt required" });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI chatbot." },
        {
          role: "user",
          content: `Answer concisely in 2 sentences: ${prompt}`,
        },
      ],
    });

    const answer = response.choices[0].message.content;

    res.json({ aiAnswer: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI request failed", error: err.message });
  }
};

module.exports = { askAI };
