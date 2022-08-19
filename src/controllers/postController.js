import { hash } from "bcrypt";
import urlMetadata from "url-metadata";
import postsRepository from "../repositories/postsRepository.js";
import usersRepository from "../repositories/usersRepository.js";
import commentsRepository from "../repositories/commentsRepository.js";
import likesRepository from "../repositories/likesRepository.js";
import hashList from "../schemas/hashSchema.js";
import { InputHashtags } from "./hashtagController.js";

export async function createPost(req, res) {
  let { postUrl, postText } = req.body;
  const { userId } = res.locals;

  if (postText.trim() === "" || postText === null) postText = "";

  try {
    let { title, image, description } = await urlMetadata(postUrl);

    if (title === null) title = "";
    if (image === null) image = "";
    if (description === null) description = "";

    await postsRepository.createPost(
      postUrl,
      postText,
      title,
      image,
      description,
      userId
    );
    console.log("vai para inputhashtag");
    InputHashtags(postUrl, postText, userId, hashList);
    console.log("passou pelo inputhashtag");
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

export async function editPost(req, res) {
  const { postId, postText } = req.body;

  if (postText.trim() === "") postText = null;

  try {
    const { rowCount } = postsRepository.updatePost(postText, postId);

    if (rowCount === 0) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function getPostsByUser(req, res) {
  const { userId } = res.locals;
  const { id } = req.params;

  try {
    const { rows: posts } = await postsRepository.getPosts(userId, id);

    if (posts.length === 0) return res.status(200).send(posts);

    const { rows: comments } = await commentsRepository.getAll(userId);

    const { rows: likes } = await likesRepository.getAll();

    let teste = posts.map(post => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === post.id)
          return (post = { ...post, comments: comments[i].comments });
      }
    });

    teste = teste.map(post => {
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].id === post.id)
          return (post = { ...post, likes: likes[i].likes });
      }
    });

    return res.status(200).send(teste);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
