import postsRepository from "../repositories/postsRepository.js";

export async function createPost(req, res) {
  let { postUrl, postText } = req.body;
  const { userId } = res.locals;

  if (postText.trim() === "") postText = null;

  try {
    await postsRepository.createPost(postUrl, postText, userId);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
