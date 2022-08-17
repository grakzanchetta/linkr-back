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

function getPostsByFollow(userId) {
  return db.query(
    `SELECT  r."followerId", uf.username AS "followerName", 
      r."userId", u.username,
      COALESCE(JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', p.id, 'postUrl', p."postUrl", 'postText', p."postText",
          'userId', p."userId", 'username', up.username, 'pictureUrl',  
          up."pictureUrl",'title', p.title, 'image', p.image, 
          'description', p.description, 'userId', p."userId", 'isAuthor', FALSE,
          'likes', COALESCE(tl.likes, '[]')
        )
      ) FILTER (WHERE p.id IS NOT NULL), '[]') AS posts
    FROM relationships r
    FULL JOIN posts p ON r."userId" = p."userId"
    FULL JOIN users up ON up.id = p."userId"
    JOIN users uf ON uf.id = r."followerId"
    JOIN users u ON u.id = r."userId"
    FULL JOIN 
      (SELECT
            "postId", JSON_AGG(JSON_BUILD_OBJECT('id', "userId", 'username', username)) AS likes
        FROM likes l 
        JOIN users u ON u.id = "userId" 
        GROUP BY "postId") tl ON tl."postId" = p.id
    WHERE r."followerId" = $1
    GROUP BY r."userId", r."followerId",uf.username, u.username`,
    [userId]
  );
}

export default { insert, remove, getPostsByFollow };
