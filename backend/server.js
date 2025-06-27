//Importing express.js helps to create routes and respond to requests
const express = require('express');

//import http client to request external api
const axios = require('axios');  

//middleware tells the server okay to accept req from diff domain
const cors = require('cors');
const apodRoute = require('./routes/apod');

//hides sensitive info like NASA Api key
require('dotenv').config();

const app = express();

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

app.use(cors());

app.use('/api/apod', apodRoute);


// New Asteroid Data Route
app.get('/api/asteroids', async (req, res) => {
 const{ start_date, end_date } = req.query;

 if(!start_date || !end_date){
  return res.status(400).json({ error: 'Please provide start_date and end_date in the query.'});
 }
//log the key to make sure it's being read from .env

const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`;


 try{
  const { data } = await axios.get(nasaURL);
  res.json(data);
 } catch (err){
  console.error(err.message);
  res.status(500).json({ error: 'Failed to fresh asteroid data from NASA.' });
 }
});

if( require.main == module){
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => 
  console.log(`Server is running on http://localhost:${PORT}`));
}

module.exports = app;


