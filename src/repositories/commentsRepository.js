import db from "../databases/database.js";

function insert(postId, userId, comment) {
  return db.query(
    `INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3)`,
    [postId, userId, comment]
  );
}

function getAll(userId) {
  return db.query(
    `SELECT p.id,
	    COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT('id', c.id, 'username', u.username, 
            'pictureUrl', u."pictureUrl", 'comment', c.comment,
		        'isAuthor', CASE WHEN c."userId" = p."userId" THEN TRUE ELSE FALSE END,
		        'follow', CASE WHEN r."followerId" = $1 THEN TRUE ELSE FALSE END
		  )) FILTER (WHERE c.id IS NOT NULL), '[]') AS comments
    FROM posts p
    FULL JOIN comments c ON c."postId" = p.id
    LEFT JOIN users u ON u.id = c."userId"
    LEFT JOIN relationships r ON r."userId" = c."userId"
    GROUP BY p.id`,
    [userId]
  );
}

export default { insert, getAll };
