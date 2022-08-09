import bcrypt from 'bcrypt';
import db from "../databases/database.js";

async function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

async function createUser(username, email, plainPassword, pictureUrl) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(plainPassword, SALT);
    return db.query(`
      INSERT INTO users (username, email, password, "pictureUrl") 
      VALUES ($1, $2, $3, $4)`, 
      [username, email, passwordHash, pictureUrl]);
  }

const usersRepository = {
    createUser,
    getUserByEmail
};

export default usersRepository;