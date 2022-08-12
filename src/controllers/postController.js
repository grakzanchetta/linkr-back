import { hash } from "bcrypt";
import postsRepository from "../repositories/postsRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import hashList from "../schemas/hashSchema.js";
import { InputHashtags } from "./hashtagController.js";

export async function createPost(req, res) {
  let { postUrl, postText } = req.body;
  const { userId } = res.locals;

  if (postText.trim() === "") postText = null;

  try {
    await postsRepository.createPost(postUrl, postText, userId);
    console.log("vai para inputhashtag")
    InputHashtags(postUrl, postText, userId, hashList)
    console.log("passou pelo inputhashtag")
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function getPosts(_, res) {
  const { userId } = res.locals;

  try {
    const { rows: posts } = await postsRepository.getPosts(userId);

    let { rows: user } = await usersRepository.getUserById(userId);

    user[0] = { ...user[0], posts };

    return res.status(200).send(user[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const { rowCount } = await postsRepository.deletePost(id);

    if (rowCount === 0) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
