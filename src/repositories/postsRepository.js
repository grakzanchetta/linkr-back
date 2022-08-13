import db from "../databases/database.js";

function createPost(postUrl, postText, title, image, description, userId) {
  return db.query(
    `INSERT INTO 
      posts ("postUrl", "postText", title, image, description, "userId") 
      VALUES ($1, $2, $3, $4, $5, $6)`,
    [postUrl, postText, title, image, description, userId]
  );
}

function getPosts(userId, getByUser = null) {
  const where = getByUser !== null ? 'WHERE p."userId" = $2' : "";

  const limit = getByUser === null ? "LIMIT 20" : "";

  const params = [userId];

  if (getByUser !== null) params.push(getByUser);

  return db.query(
    `SELECT 
      p.id, p."userId", u.username, u."pictureUrl" ,p."postUrl", 
      p.title, p.image, p.description, p."postText", 
      COALESCE(tl.likes, '[]') AS likes,
      CASE WHEN p."userId" = $1 THEN TRUE ELSE FALSE END AS "isAuthor"
    FROM posts p
    JOIN users u ON u.id = p."userId"
    FULL JOIN 
      (SELECT
        "postId", JSON_AGG(JSON_BUILD_OBJECT('id', "userId", 'username', username)) AS likes
      FROM likes l 
      JOIN users u ON u.id = "userId" 
      GROUP BY "postId") tl ON tl."postId" = p.id
    ${where}
    ORDER BY p.id DESC
	  ${limit}`,
    params
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

function getPost(postUrl, postText, userId) {
  return db.query(
    `SELECT id FROM posts WHERE "postUrl" = $1 AND "postText" = $2 AND "userId" = $3`,
    [postUrl, postText, userId]
  );
}

export default { createPost, getPosts, getPost, deletePost, updatePost };
