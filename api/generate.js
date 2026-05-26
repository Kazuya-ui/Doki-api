const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(
  prompt,
  style = "vivid",
  quality = "standard"
) {
  try {
    if (!prompt || prompt.trim().length === 0) {
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

async function generateKawaiiImage(description) {
  return generateImage(
    `Adorable and cute kawaii style artwork of: ${description}`,
    "vivid",
    "hd"
  );
}

async function generateAnimeImage(description) {
  return generateImage(
    `Beautiful anime style artwork of: ${description}`,
    "vivid",
    "hd"
  );
}

async function generateCatImage(description = "cute kawaii kitten") {
  return generateImage(
    `Extremely adorable and kawaii kitten: ${description}`,
    "vivid",
    "hd"
  );
}

module.exports = async (req, res) => {
  const {
    prompt,
    style = "vivid",
    quality = "standard",
    type = "normal",
  } = req.body;

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
        result = await generateImage(
          prompt,
          style,
          quality
        );
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
