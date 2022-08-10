import db from "../databases/database.js";

function getSession(token) {
  return db.query(`SELECT * FROM sessions WHERE token = $1 LIMIT 1`, [token]);
}

export default { getSession };
