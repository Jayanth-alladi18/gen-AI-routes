const express = require('express');
const router = express.Router();
require('dotenv').config();

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ response: reply });
  } catch (err) {
    console.error('Error from OpenAI:', err);
    res.status(500).json({ response: 'Failed to generate a response.' });
  }
});

module.exports = router;
