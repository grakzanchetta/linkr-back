import db from "../databases/database.js";

function insert(followerId, userId) {
  return db.query(
    `INSERT INTO relationships ("followerId", "userId") VALUES ($1, $2)`,
    [followerId, userId]
  );
}

function remove(userId, id) {
  return db.query(
    `DELETE FROM relationships WHERE "followerId" = $1 AND "userId" = $2`,
    [userId, id]
  );
}

export default { insert, remove };
