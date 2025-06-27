const express = require('express');
const axios = require('axios');
const router = express.Router();

let cachedApod = null;
let lastFetchTime = 0;

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

router.get('/', async (req, res) => {

 const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  if (cachedApod && (now - lastFetchTime) < oneHour) {
    return res.json(cachedApod);
  }

  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    cachedApod = response.data;
    lastFetchTime = now;
    res.json(response.data);
  } catch (err) {
    console.error("APOD error:", err.message);
    res.status(500).json({ error: "Failed to fetch NASA APOD." });
  }
});

module.exports = router;
