const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  try {
    const prompt =
      req.method === "GET"
        ? req.query.prompt
        : req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt requis"
      });
    }

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1
    });

    return res.status(200).json({
      success: true,
      image: response.data[0].url,
      prompt
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
