import db from "../databases/database.js";

function insertLike(userId, postId) {
  return db.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [
    userId,
    postId
  ]);
}

function deleteLike(userId, postId) {
  return db.query(`DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2`, [
    userId,
    postId
  ]);
}

function getAll() {
  return db.query(`
  SELECT p.id, 
  COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', l."userId", 'username', u.username))
  FILTER (WHERE l."userId" IS NOT NULL), '[]') 
     AS likes
FROM likes l
JOIN users u ON u.id = l."userId"
FULL JOIN posts p ON p.id = l."postId"
GROUP BY p.id`);
}

export default { insertLike, deleteLike, getAll };
