const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { date } = req.query;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}` +
              (date ? `&date=${date}` : '');

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('NASA API error:', error.message);

    if (error.response?.status === 429) {
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

module.exports = router;
