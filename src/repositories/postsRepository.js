import db from "../databases/database.js";

function createPost(postUrl, postText, userId) {
  return db.query(
    `INSERT INTO posts ("postUrl", "postText", "userId") VALUES ($1, $2, $3)`,
    [postUrl, postText, userId]
  );
}

export default { createPost };
