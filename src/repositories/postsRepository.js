import db from "../databases/database.js";

function createPost(postUrl, postText, title, image, description, userId) {
  return db.query(
    `INSERT INTO 
      posts ("postUrl", "postText", title, image, description, "userId") 
      VALUES ($1, $2, $3, $4, $5, $6)`,
    [postUrl, postText, title, image, description, userId]
  );
}

function getPosts(userId, id) {
  // const where = getByUser !== null ? 'WHERE p."userId" = $2' : "";

  //const limit = getByUser === null ? "LIMIT 20" : "";

  //const params = [userId];

  //if (getByUser !== null) params.push(getByUser);

  const REPOST_LENGTH = `(
    SELECT p.id, COUNT(p.id) AS count
    FROM "rePosts" rp 
    JOIN posts p ON p.id = rp."postId" 
    GROUP BY p.id)`;

  return db.query(
    `SELECT 
    p.id, "postUrl", "postText", p."userId", username, "pictureUrl",  
    title, image, description, 
    CASE WHEN p."userId" = $2 THEN TRUE ELSE FALSE END AS "isAuthor",
    NULL AS "rePost", COALESCE(trp.count, 0) AS "rePostCount" ,p."createdAt" 
  FROM posts p
  JOIN users u ON u.id = p."userId"
  FULL JOIN ${REPOST_LENGTH} trp ON trp.id = p.id
  WHERE p."userId" = $1
  UNION ALL
  SELECT 
    rp.id, "postUrl", "postText", p."userId", username, "pictureUrl", title, image, 
    description, 
    CASE WHEN p."userId" = $2 THEN TRUE ELSE FALSE END AS "isAuthor",
    rc.username AS "rePost", trp.count AS "rePostCount" ,rp."createdAt" 
  FROM "rePosts" rp
  JOIN posts p ON rp."postId" = p.id
  JOIN users rc ON rp."userId" = rc.id
  JOIN ${REPOST_LENGTH} trp ON trp.id = rp.id
  WHERE rp."userId" = $1
  ORDER BY "createdAt" DESC`,
    [`${id}`, `${userId}`]
  );
}

function getPostsByFollow(userId) {
  const REPOST_LENGTH = `(
    SELECT p.id, COUNT(p.id) AS count
    FROM "rePosts" rp 
    JOIN posts p ON p.id = rp."postId" 
    GROUP BY p.id)`;

  return db.query(
    `SELECT 
      p.id, "postUrl", "postText", p."userId", username, "pictureUrl",  
      title, image,description, 
      CASE WHEN p."userId" = $1 THEN TRUE ELSE FALSE END AS "isAuthor",
      NULL AS "rePost", COALESCE(trp.count, 0) AS "rePostCount" ,p."createdAt" 
    FROM posts p
    JOIN users u ON u.id = p."userId"
    RIGHT JOIN relationships r ON r."userId" = p."userId"
    FULL JOIN ${REPOST_LENGTH} trp ON trp.id = p.id
    WHERE r."followerId" = $1
    UNION ALL
    SELECT 
      rp.id, "postUrl", "postText", p."userId", u.username, u."pictureUrl", title, image, 
      description, 
      CASE WHEN p."userId" = $1 THEN TRUE ELSE FALSE END AS "isAuthor",
      rc.username AS "rePost", trp.count AS "rePostCount" ,rp."createdAt" 
    FROM "rePosts" rp
    JOIN posts p ON rp."postId" = p.id
    JOIN users u ON p."userId" = u.id
    JOIN users rc ON rp."userId" = rc.id
    JOIN relationships r ON r."userId" = rp."userId"
    JOIN ${REPOST_LENGTH} trp ON trp.id = rp.id
    WHERE r."followerId" = $1
    ORDER BY "createdAt" DESC`,
    [userId]
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

export default {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
  getPostsByFollow
};
