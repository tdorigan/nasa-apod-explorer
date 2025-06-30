const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/photos', async (req, res) => {
  const { earth_date, rover = 'curiosity' } = req.query;
  const apiKey = process.env.NASA_API_KEY;

  if (!earth_date) {
    return res.status(400).json({ error: 'Missing earth_date parameter' });
  }

  try {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: {
        earth_date,
        api_key: apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Mars Rover API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Mars Rover data' });
  }
});

module.exports = router;
