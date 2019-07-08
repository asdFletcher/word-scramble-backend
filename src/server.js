'use strict';

const util = require('util');

// ~~~~~~~~~~~~~
// database client
// ~~~~~~~~~~~~~
const redis = require('redis');
const client = require(`${__dirname}/redis-db.js`);

// ~~~~~~~~~~~~~
// boilerplate express settings
// ~~~~~~~~~~~~~
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/../public`));
app.use(express.json());

// ~~~~~~~~~~~~~
// functions
// ~~~~~~~~~~~~~
const saveScoreToDatabase = async (scoreObj) => {
  return await client.rpush(['scores', JSON.stringify(scoreObj)]);
}

const getAllScoresFromDatabase = async () => {
  return await client.lrange('scores', 0, -1);
}

const getTopScores = async () => {
  let result = await getAllScoresFromDatabase();
    
  // parse results
  for (let i = 0; i < result.length; i++) {
    result[i] = JSON.parse(result[i]);
  }
  
  // sort the scores descending
  result = result.sort((a, b) => b.score - a.score);

  // return the top of the sorted list
  return result.slice(0,10);
}

const handleGetScores = async (req, res, next) => {
  try {
    // return the top scores
    res.send(await getTopScores());
  } catch (err) {
    next(err);
  }
}

const handleSaveScore = async (req, res, next) => {
  try {
    // save the new score
    let result = await saveScoreToDatabase(req.body);

    // send back the submitted score data
    res.send(req.body);
  } catch (err) {
    next(err);
  }
}

// ~~~~~~~~~~~~~
// server routes
// ~~~~~~~~~~~~~
app.post('/save-score', handleSaveScore);
app.get('/get-scores', handleGetScores);

app.get('*', (req, res, next)=>{
  res.status(404);
  res.statusMessage = 'page not found';
  res.render('not-found', {req: req});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.statusMessage = 'server error';
  res.render('error', {req: req});
});

// ~~~~~~~~~~~~~
// exports
// ~~~~~~~~~~~~~
const start = () => {
  let port = process.env.PORT;
  app.listen(port, () => console.log(`server is up and running on port: ${port}`));
}

module.exports = {
  app: app,
  start: start,
};
