import db from "../databases/database.js";

function insert(postId, userId, comment) {
  return db.query(
    `INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3)`,
    [postId, userId, comment]
  );
}

export default { insert };
