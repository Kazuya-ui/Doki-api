const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ========================
// GENERATE IMAGE BASE
// ========================
async function generateImage(prompt, style = "vivid", quality = "standard") {
  try {
    if (!prompt || prompt.trim() === "") {
      return {
        success: false,
        error: "Ohh, tu dois me donner une description! 🥺",
      };
    }

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality,
      style,
    });

    return {
      success: true,
      url: response.data[0].url,
      prompt,
      revisedPrompt: response.data[0].revised_prompt,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================
// STYLES
// ========================
async function generateKawaiiImage(desc) {
  return generateImage(
    `Adorable kawaii anime style: ${desc}. pastel colors, chibi style, ultra cute`,
    "vivid",
    "hd"
  );
}

async function generateAnimeImage(desc) {
  return generateImage(
    `High quality anime illustration: ${desc}. detailed, cinematic, professional anime style`,
    "vivid",
    "hd"
  );
}

async function generateCatImage(desc = "cute kitten") {
  return generateImage(
    `Ultra cute kawaii kitten: ${desc}. fluffy, big eyes, pastel aesthetic`,
    "vivid",
    "hd"
  );
}

// ========================
// VERCEL API ENDPOINT
// ========================
module.exports = async (req, res) => {
  // 🔥 Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Only POST method allowed",
    });
  }

  const {
    prompt,
    style = "vivid",
    quality = "standard",
    type = "normal",
  } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt requis",
    });
  }

  try {
    let result;

    switch (type) {
      case "kawaii":
        result = await generateKawaiiImage(prompt);
        break;

      case "anime":
        result = await generateAnimeImage(prompt);
        break;

      case "cat":
        result = await generateCatImage(prompt);
        break;

      default:
        result = await generateImage(prompt, style, quality);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
