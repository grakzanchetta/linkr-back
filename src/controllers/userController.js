import usersRepository from '../repositories/usersRepository.js';

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = usersRepository.getUserByEmail(user.email)
    if (existingUsers.rowCount > 0) {
      return res.status(409).send(error.message); 
    }

    const {username, email, password, pictureUrl} = user;
    await usersRepository.createUser(username, email, password, pictureUrl);

    res.sendStatus(201); 
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message); 
  }
}