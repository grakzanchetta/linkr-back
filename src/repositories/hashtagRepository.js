import db from "../databases/database.js";

async function GetHashtag(hashtag) {
    
    return db.query(`SELECT sub.id, sub."userId", u.username, u."pictureUrl" ,sub."postUrl", sub.title, sub.image, sub.description, sub."postText", 
    COALESCE(tl.likes, '[]') AS likes
    FROM  ( SELECT  p.*, h.name FROM posts p JOIN  hashtags h ON h."postId" = p.id)sub 
    JOIN users u ON u.id = sub."userId" FULL JOIN 
    (SELECT "postId", JSON_AGG(JSON_BUILD_OBJECT('id', "userId", 'username', username)) AS likes
    FROM likes l 
    JOIN users u ON u.id = "userId" 
    GROUP BY "postId") tl ON tl."postId" = sub.id
    WHERE sub.name ILIKE $1`,[`#${hashtag}`])
}

async function InputHashtag( postId, hash) {
    return db.query('INSERT INTO hashtags ("name", "postId") VALUES ($1,$2)',[`#${hash}`,postId]);
}

async function TopHashtag() {
    return db.query('SELECT name, COUNT(id) AS visualizations FROM hashtags GROUP BY (name) ORDER BY visualizations DESC LIMIT 10;')
}

const hashtagRepository = {
    GetHashtag,
    InputHashtag, 
    TopHashtag
};


export default hashtagRepository;