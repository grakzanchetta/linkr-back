import bcrypt from "bcrypt";
import db from "../databases/database.js";

async function getAllUsers() {
  return db.query(`SELECT id, username, "pictureUrl" FROM users`);
}

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

function getUserById(id) {
  return db.query(
    `SELECT id, username, "pictureUrl" FROM users WHERE id = $1 LIMIT 1`,
    [id]
  );
}

async function createUser(username, email, plainPassword, pictureUrl) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(plainPassword, SALT);
  return db.query(
    `
      INSERT INTO users (email, password, username, "pictureUrl") 

      VALUES ($1, $2, $3, $4)`,
    [email, passwordHash, username, pictureUrl]
  );
}

async function createSession(token, userId) {
  return db.query(
    `
     INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, userId]
  );
}

const usersRepository = {
  createUser,
  createSession,
  getUserByEmail,
  getUserById,
  getAllUsers
};

export default usersRepository;
