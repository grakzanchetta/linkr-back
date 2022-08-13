import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import usersRepository from "../repositories/usersRepository.js";

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = usersRepository.getUserByEmail(user.email);
    if (existingUsers.rowCount > 0) {
      return res.status(409).send(error.message);
    }

    const { username, email, password, pictureUrl } = user;

    await usersRepository.createUser(username, email, password, pictureUrl);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const { rows: users } = await usersRepository.getUserByEmail(email);
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await usersRepository.createSession(token, user.id);
    return res.send(token);
  }

  res.sendStatus(401);
}

export async function getAllUsers(_, res) {
  try {
    const { rows: users } = await usersRepository.getAllUsers();

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
