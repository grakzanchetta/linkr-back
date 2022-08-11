import db from "../databases/database.js";

function createPost(postUrl, postText, userId) {
  return db.query(
    `INSERT INTO posts ("postUrl", "postText", "userId") VALUES ($1, $2, $3)`,
    [postUrl, postText, userId]
  );
}

function getPosts(userId) {
  return db.query(
    `SELECT p.id, username, "pictureUrl", "postUrl", "postText", 
      CASE WHEN p."userId" = $1 THEN TRUE ELSE FALSE END AS "isAuthor",
      COUNT(l.id)::INTEGER AS likes,
      CASE WHEN l."userId" = $1 THEN TRUE ELSE FALSE END AS "userLike"
    FROM posts p
    LEFT JOIN users u ON u.id = p."userId"
    LEFT JOIN likes l ON p.id = l."postId"
    GROUP BY p.id, u.id, l."userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20`,
    [userId]
  );
}

export default { createPost, getPosts };
