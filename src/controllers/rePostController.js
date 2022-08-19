import rePostsRepositories from "../repositories/rePostsRepositories.js";

export async function create(req, res) {
  const { userId } = res.locals;
  const { postId } = req.body;

  try {
    await rePostsRepositories.insert(userId, postId);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
