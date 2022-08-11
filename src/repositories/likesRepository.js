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

export default { insertLike, deleteLike };
