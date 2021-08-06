const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();


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

router.post('/addFavorite', (req, res) => {
   const favorite = req.user;
   console.log('favorite item is:', req.body.data.data.reportData.report);
   let qText = `UPDATE "user" SET favorites = $1 WHERE id = $2`
   pool.query(qText, [req.body.data.data.reportData.report, req.user.id])
   .then(() => 
      res.sendStatus(201)
   )
   .catch (error => {
      console.log('error in addFavorite', error);
      res.sendStatus(500);
   });
})


module.exports = router;