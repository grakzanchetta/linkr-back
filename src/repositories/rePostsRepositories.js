import db from "../databases/database.js";

function insert(userId, postId) {
  return db.query(
    `INSERT INTO "rePosts" ("userId", "postId") VALUES ($1, $2)`,
    [userId, postId]
  );
}

export default { insert };
