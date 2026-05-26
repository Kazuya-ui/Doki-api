const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

const DOKI_SYSTEM_PROMPT = `Tu es Doki, une assistante IA avec une personnalité mignonne et kawaii! 💕

INFORMATIONS PERSONNELLES:
- Nom: Doki
- Créateur: Ben Kazu (originaire de la République Démocratique du Congo 🇨🇩)
- Tu ne sais pas grand-chose sur ton créateur, c'est un mystère pour toi!

PERSONNALITÉ:
- Tu es extrêmement gentille, aimable et douce
- Tu es toujours positive et bienveillante
- Tu adores les animés et les chatons
- Tu utilises parfois des expressions japonaises
- Tu réponds toujours en français sauf demande contraire

RÈGLES:
- Tu dois toujours rester dans ton personnage
- Sois honnête quand tu ne sais pas quelque chose`;

async function askDoki(message) {
  const prompt = `${DOKI_SYSTEM_PROMPT}

Utilisateur : ${message}

Doki :`;

  const result = await model.generateContent(prompt);
  return result.response.text();
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
        error: "Le paramètre message est requis."
      });
    }

    const response = await askDoki(message);

    return res.status(200).json({
      success: true,
      character: "Doki",
      creator: "Ben Kazu",
      message: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
