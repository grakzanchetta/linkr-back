import db from "../databases/database.js";

function createPost(postUrl, postText, userId) {
  return db.query(
    `INSERT INTO posts ("postUrl", "postText", "userId") VALUES ($1, $2, $3)`,
    [postUrl, postText, userId]
  );
}

function getPosts(userId) {
  return db.query(
    `SELECT u.id, username, "pictureUrl", "postUrl", "postText", 
      CASE WHEN "userId" = $1 THEN TRUE ELSE FALSE END AS "isAuthor" 
    FROM posts p
    JOIN users u ON u.id = "userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20`,
    [userId]
  );
}

export default { createPost, getPosts };
