import db from "../databases/database.js";

function createPost(postUrl, postText, userId) {
  return db.query(
    `INSERT INTO posts ("postUrl", "postText", "userId") VALUES ($1, $2, $3)`,
    [postUrl, postText, userId]
  );
}

function getPosts(userId) {
  return db.query(
    `SELECT 
      p.id, p."userId", u.username, u."pictureUrl" ,p."postUrl", p."postText", 
      COALESCE(tl.likes, '[]') AS likes,
      CASE WHEN p."userId" = $1 THEN TRUE ELSE FALSE END AS "isAuthor"
    FROM posts p
    JOIN users u ON u.id = p."userId"
    FULL JOIN 
      (SELECT
        "postId", JSON_AGG(JSON_BUILD_OBJECT('id', "userId", 'username', username)) AS likes
      FROM likes l 
      JOIN users u ON u.id = "userId" 
      GROUP BY "postId") tl 
    ON tl."postId" = p.id
    ORDER BY p.id DESC
	  LIMIT 20`,
    [userId]
  );
}

function deletePost(id) {
  return db.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

function updatePost(postText, postId) {
  return db.query(`UPDATE posts SET "postText" = $1 WHERE id = $2`, [
    postText,
    postId
  ]);
}

function getPost(postUrl,postText,userId) {
  return db.query(
    `SELECT id FROM posts WHERE "postUrl" = $1 AND "postText" = $2 AND "userId" = $3` ,
    [postUrl,postText,userId]
  );
}

export default { createPost, getPosts, getPost, deletePost, updatePost };

