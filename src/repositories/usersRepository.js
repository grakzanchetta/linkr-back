import bcrypt from "bcrypt";
import db from "../databases/database.js";

async function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

async function createUser(username, email, plainPassword, pictureUrl) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(plainPassword, SALT);
    return db.query(`
      INSERT INTO users (email, password, username, "pictureUrl") 
      VALUES ($1, $2, $3, $4)`, 
      [email, password, username, pictureUrl]);
}

  async function createSession(token, userId) {
    return db.query(`
     INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId]);
}

const usersRepository = {
    createUser,
    createSession,
    getUserByEmail
};

export default usersRepository;