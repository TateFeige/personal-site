const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware').rejectUnauthenticated;

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const query= `WITH "comment" AS (
    SELECT array_agg("comment".comment), "comment".stemtell_id
    FROM "comment"
    WHERE "comment".stemtell_id = 1
    GROUP BY "comment".stemtell_id
    )
  SELECT *
  FROM "stemtell"
  JOIN "comment" ON "stemtell".id = "comment".stemtell_id
  WHERE "stemtell".id = 1;`;
  pool
    .query(query)
    .then((result) => {
      console.log('successful GETTING comments', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING comments', err);
    });
     
});

router.get('/feedback', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query= `SELECT "user".name AS username, "stemtell".id, "user".profile_picture_url, "comment".comment, "comment".date_published, "comment".id, "user".authority 
  FROM "comment"
  JOIN "user" ON "comment".user_id = "user".id
  JOIN "stemtell" ON "stemtell".id = "comment".stemtell_id
  WHERE "comment".stemtell_id = 2 AND "comment".teacher_feedback=TRUE;`;
  pool
    .query(query)
    .then((result) => {
      console.log('successful GETTING teacher feedback', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error GETTING teacher feedback', err);
    });
     
});

/**
 * POST route template
 */
router.post('/:', rejectUnauthenticated, (req, res) => {
  const query= `INSERT INTO "comment" ("comment", "user_id", "stemtell_id", "date_published", "teacher_feedback")
  VALUES $1, $2, $3, $4, $5, $6;`;
  pool
  .query(query, [
    req.body.comment,
    req.body.user_id,
    req.body.stemtell_id,
    req.body.date_published,
    req.body.teacher_feedback,
  ])
  .then((result) => {
    console.log('New comment posted', result);
  })
  .catch((error) => {
    console.log('Error Posting comment', error);
  })
});

module.exports = router;
