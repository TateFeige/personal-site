const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { response } = require('express');



router.get('/', (req, res) => {

  const query = `SELECT "user".name AS username, "user".id AS author_id, "stemtell".id AS stem_id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".date_published, "class".name AS class_name
  FROM "stemtell"
  JOIN "user" ON "stemtell".user_id = "user".id
  JOIN "class" ON "stemtell".class_id = "class".id
  WHERE "class".id = $1 

  ORDER BY "stemtell".date_published DESC;`;
  pool
    .query(query, [req.params])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting all STEMtells", err);
      res.sendStatus(500);
    });
});

/**
 * GET api/stemtell/tags/:id
 * Description: GETs all tags for one STEMtell ID 
 * Returns 200
 */
router.get('/tags/:id', rejectUnauthenticated, (req, res) => {
    const stemtellId = Number(req.params.id);

    const queryText = `
    SELECT "tag".id, "tag".name, "tag".stem_field, "tag".type
    FROM "stemtell_tag"
    JOIN "tag" ON "tag".id = "stemtell_tag".tag_id
    WHERE "stemtell_tag".stemtell_id = $1;
    `;

    pool.query(queryText, [stemtellId])
      .then(response => {
        res.send(response.rows);
      })
      .catch(err => {
        console.log("Error getting existing tags:", err);
        res.sendStatus(500);
      });
});

/**
 * POST api/stemtell/
 * Description: INSERTS a new STEMtell into "stemtell" table and INSERTS tags into "stemtell_tag" table 
 * Returns 201 CREATED
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newStemtell = req.body;
    const user = req.user;

    (async () => {
      const client = await pool.connect();
      try {
          await client.query('BEGIN');
          const queryTextAddStemtell = `
          INSERT INTO "stemtell" ("class_id", "user_id", "title", "body_text", "media_url", "date_published")
          VALUES ($1, $2, $3, $4, $5, NOW())
          RETURNING id
          `;
          const response = await client.query(queryTextAddStemtell, [newStemtell.class_id, user.id, newStemtell.title, newStemtell.body_text, newStemtell.media_url]);
  
          const stemtellId = response.rows[0].id;

          const queryTextAddTag = `
          INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
          VALUES ($1, $2)
          `;

          for (let id of newStemtell.tag_ids) {
              await client.query(queryTextAddTag, [id, stemtellId]);
          }
  
          await client.query('COMMIT');
          
      } catch (err) {
          await client.query('ROLLBACK');
          throw err;
      } finally {
        client.release();
      }
    })().catch(e => console.error(e.stack))
});


/**
 * put api/stemtell/
 * Description: UPDATES the info for a STEMtell that has been edited 
 * Returns 204
 */
router.put('/save', rejectUnauthenticated, (req, res) => {
   const newStemtell = req.body;
   const user = req.user;
   const stemtellId = req.body.id;

   (async () => {
     const client = await pool.connect();
     try {
         await client.query('BEGIN');
         const queryTextAddStemtell = `
         UPDATE "stemtell" SET "class_id" = $1, "user_id" = $2, "title" = $3, "body_text" = $4, "media_url" = $5 WHERE "id" = $6`;
         const response = await client.query(queryTextAddStemtell, [newStemtell.class_id, user.id, newStemtell.title, newStemtell.body_text, newStemtell.media_url, stemtellId]);

         const queryTextDeleteExistingTags = `
         DELETE
         FROM "stemtell_tag"
         WHERE stemtell_id = $1;
         `
         await client.query(queryTextDeleteExistingTags, [stemtellId]);

         const queryTextAddTag = `
         INSERT INTO stemtell_tag ("tag_id", "stemtell_id")
         VALUES ($1, $2)
         `;

         for (let id of newStemtell.tag_ids) {
             await client.query(queryTextAddTag, [id, stemtellId]);
         }
 
         await client.query('COMMIT');
         
     } catch (err) {
         await client.query('ROLLBACK');
         throw err;
     } finally {
       client.release();
     }
   })().catch(e => console.error(e.stack))
});

router.get('/userstemtells', (req, res) => {
   const profilePageID = req.query.profileID;
   const qText = `SELECT * FROM "stemtell" WHERE "user_id" = $1`
   pool
     .query(qText, [profilePageID])
     .then((result) => {
       res.send(result.rows);
     })
     .catch((err) => {
       console.log("Error getting user STEMtells", err);
       res.sendStatus(500);
     });
 });


 router.get('/getstemtell', (req, res) => {
   const stemtellID = req.query.stemtellID;
   const user = req.user.id
   const query = `SELECT * FROM "stemtell" WHERE "id" = $1 AND "user_id" = $2`;
   pool
     .query(query, [stemtellID, user])
     .then(result => {
       res.send(result.rows);
     })
     .catch(error => {
       console.log("Error getting STEMtell to edit", error);
       res.sendStatus(500);
     });
 });

 router.get('/details/:id', (req, res) => {
    const stemtellId= req.params.id;
    const query = `SELECT "user".name , "user".id as author_id, "stemtell".id, "stemtell".title, "stemtell".media_url, "stemtell".body_text, "user".profile_picture_url, "stemtell".date_published, "class".name AS class_name
    FROM "stemtell"
    JOIN "user" ON "stemtell".user_id = "user".id
    JOIN "class" ON "stemtell".class_id = "class".id
    WHERE "stemtell".id = $1`;
    pool
    .query(query, [stemtellId])
    .then((result) => {
       res.send(result.rows);
    })
     
    .catch((err) => {
      console.log("Error getting all STEMdetails", err);
    });
});

module.exports = router;
