const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function generatePrompt(postContent, brandTone) {
  return `
    System: You are a social media assistant for the ${brandTone} brand.
    Generate three distinct, engaging comments for the following blog post.
    Each comment should be under 280 characters.

    Post Content: ${postContent}

    Comment 1:
    Comment 2:
    Comment 3:
  `;
}

async function generateComment(postContent, brandTone) {
  const prompt = generatePrompt(postContent, brandTone);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: prompt }],
      n: 3,
      max_tokens: 150,
    });

    return response.choices.map(choice => choice.message.content.trim());
  } catch (error) {
    console.error("Error generating comment:", error);
    throw error;
  }
}

module.exports = { generateComment };
