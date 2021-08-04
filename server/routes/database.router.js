const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

router.post('/allfights', (req, res) => {
   //console.log("req body is:", req.body);
   let data = req.body;
   let qText = `INSERT INTO "all_fights_summary" (boss_id, boss_name, start_time, end_time, size, difficulty)
   VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
   pool.query(qText, [data.boss, data.name, data.start_time, data.end_time, data.size, data.difficulty])
   .then (() =>
      res.sendStatus(201)
   )
   .catch (error => {
      console.log('Error in posting allfights to database', error);
      res.sendStatus(500);
   });
});

router.post('/postoverview', (req, res) => {
   const overview = req.body;
   console.log('Overview has:', overview); // test function
   //console.log('adding:', overview.title, start);
   let qText = `INSERT INTO "overview" (report_url, report_name, zone, date)
   VALUES ($1, $2, $3, $4) RETURNING id`;
   pool.query(qText, [overview.url, overview.title, overview.zone, overview.date])
   .then (() => 
      res.sendStatus(201)
   )
   .catch (error => {
      console.log('Error in postoverview', error);
      res.sendStatus(500);
   });
 });






module.exports = router;