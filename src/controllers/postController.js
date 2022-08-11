import postsRepository from "../repositories/postsRepository.js";

export async function createPost(req, res) {
  let { postUrl, postText } = req.body;
  const { userId } = res.locals;

  if (postText.trim() === "") postText = null;

  try {
    await postsRepository.createPost(postUrl, postText, userId);

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

    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
