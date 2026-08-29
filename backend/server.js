require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY is not set. Set it in your environment before starting the server.');
}

app.post('/api/chat', async (req, res) => {
  const { messages, model = 'gpt-4' } = req.body;
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages must be an array of {role, content} objects' });
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model, messages, max_tokens: 800 }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).send(text);
    }

    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error('OpenAI request failed', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`OpenAI proxy server listening on http://localhost:${PORT}`);
});
