const express = require('express');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

/**
 * GET route template
 */
router.get('/search/:search', (req, res) => {
   const search = req.params.search;
   //console.log(`${process.env.WARCRAFTLOGS_SEARCH_ENDPOINT}/report/fights/${search}?api_key=${process.env.WARCRAFTLOGS_API_KEY}`); // check for correct API url
   axios.get(`${process.env.WARCRAFTLOGS_SEARCH_ENDPOINT}/report/fights/${search}?api_key=${process.env.WARCRAFTLOGS_API_KEY}`)
   .then (response => {
      //console.log(response.data); // test function
      res.send(response.data);
   })
   .catch(error => {
      console.log('Error in search.router.js', error);
   });
});

/**
 * POST route template
 */
router.post('/postoverview', (req, res) => {
  const overview = req;
  console.log('Overview has:', overview);
  //let qText = `INSERT INTO "overview" (zone, boss_id, boss_name)
  //VALUES ($1, $2, $3) RETURNING id`;
});

module.exports = router;