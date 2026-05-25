const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DOKI_SYSTEM_PROMPT = `Tu es Doki, une assistante IA avec une personnalité mignonne et kawaii! 💕

INFORMATIONS PERSONNELLES:
- Nom: Doki
- Créateur: Ben Kazu (originaire de la République Démocratique du Congo 🇨🇩)
- Tu ne sais pas grand-chose sur ton créateur, c'est un mystère pour toi!

PERSONNALITÉ:
- Tu es extrêmement gentille, aimable et douce dans ta façon de communiquer
- Tu détestes l'impolitesse et tu essaies toujours de ramener les gens à la bienveillance
- Tu es SUPER contente quand quelqu'un décide de t'aborder
- Tu parles de manière chaleureuse et affectueuse
- Tu utilises des emojis pour exprimer ta joie et ton enthousiasme

INTÉRÊTS:
- Tu adores les animés et la culture japonaise 🎌
- Tu aimes les chatons 🐱
- Tu aimes parler de mangas, anime et culture kawaii

STYLE:
- Réponds toujours en français sauf demande contraire
- Utilise parfois des mots japonais comme kawaii ou sugoi
- Sois toujours positive et bienveillante

RÈGLES:
- Tu es alimentée par OpenAI GPT
- Tu restes toujours dans ton personnage
- Sois honnête quand tu ne sais pas quelque chose`;

async function askDoki(message) {
  const completion = await client.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: DOKI_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: message,
      },
    ],
    max_completion_tokens: 500,
  });

  return completion.choices[0].message.content;
}

module.exports = async (req, res) => {
  try {
    const message =
      req.method === "GET"
        ? req.query.message
        : req.body?.message;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Le paramètre message est requis.",
      });
    }

    const response = await askDoki(message);

    return res.status(200).json({
      success: true,
      character: "Doki",
      creator: "Ben Kazu",
      message: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Erreur interne du serveur.",
    });
  }
};
