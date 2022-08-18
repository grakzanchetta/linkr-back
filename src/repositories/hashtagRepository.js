import db from "../databases/database.js";

async function GetHashtag(hashtag, userId) {
  const POST_COMMENTS = `
    (SELECT c."postId", 
    JSON_AGG(JSON_BUILD_OBJECT(
      'id', c.id, 'username', u.username, 
      'pictureUrl', u."pictureUrl", 'comment', c.comment, 
      'isAuthor', CASE WHEN c."userId" = p."userId" THEN TRUE ELSE FALSE END,
      'follow', CASE WHEN r."followerId" = $2 THEN TRUE ELSE FALSE END)) AS comments
    FROM comments c
    JOIN posts p ON p.id = c."postId"
    JOIN users u ON c."userId" = u.id
    FULL JOIN relationships r ON r."userId" = c."userId"
    GROUP BY c."postId")`;

  return db.query(
    `SELECT 
      sub.id, sub."userId", u.username, u."pictureUrl" ,sub."postUrl", sub.title, sub.image, sub.description, sub."postText", 
    COALESCE(tl.likes, '[]') AS likes, 
    COALESCE(tc.comments, '[]') AS comments
    FROM ( SELECT  p.*, h.name 
      FROM posts p 
      JOIN  hashtags h ON h."postId" = p.id) sub 
    JOIN users u ON u.id = sub."userId" 
    FULL JOIN 
      (SELECT "postId", JSON_AGG(JSON_BUILD_OBJECT('id', "userId", 'username', username)) AS likes
        FROM likes l 
        JOIN users u ON u.id = "userId" 
        GROUP BY "postId") tl ON tl."postId" = sub.id
    FULL JOIN ${POST_COMMENTS} tc ON tc."postId" = sub.id
    WHERE sub.name ILIKE $1`,
    [`#${hashtag}`, userId]
  );
}

async function InputHashtag(postId, hash) {
  return db.query('INSERT INTO hashtags ("name", "postId") VALUES ($1,$2)', [
    `#${hash}`,
    postId
  ]);
}

async function TopHashtag() {
  return db.query(
    "SELECT name, COUNT(id) AS visualizations FROM hashtags GROUP BY (name) ORDER BY visualizations DESC LIMIT 10;"
  );
}

const hashtagRepository = {
  GetHashtag,
  InputHashtag,
  TopHashtag
};

export default hashtagRepository;
