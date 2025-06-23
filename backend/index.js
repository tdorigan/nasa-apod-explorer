const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://nasa-apod-explorer-green.vercel.app']
}));

const PORT = process.env.PORT || 5000;

// TEMP: Confirm the key loaded correctly
//console.log('Using NASA API Key:', process.env.NASA_API_KEY);

app.get('/api/apod', async (req, res) => {
  const { date } = req.query;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}` +
              (date ? `&date=${date}` : '');

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('NASA API error:', error.message);

    if (error.response?.status === 429) {
      // 🔁 Return mock data if rate-limited
      res.json({
        title: "Mock APOD - Rate Limit Hit",
        date: date || new Date().toISOString().split('T')[0],
        url: "https://apod.nasa.gov/apod/image/2506/NGC3521-1024.jpg",
        explanation: "You're seeing this because the NASA API rate limit was hit. This is mock data so you can keep developing.",
        media_type: "image"
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
