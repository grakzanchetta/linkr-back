import db from "../databases/database.js";

async function GetHashtag(hashtag) {
    return db.query('SELECT sub.post AS post, sub."user" as user FROM (SELECT p."postText" AS post, u."username" AS user ,p.id AS id FROM posts p JOIN users u ON u.id=p."userId")sub JOIN hashtags h ON h."postId"=sub.id WHERE h.name ILIKE $1', [`%${hashtag}%`]);
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