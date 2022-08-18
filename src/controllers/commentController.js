import commentsRepository from "../repositories/commentsRepository.js";

export async function createComment(req, res) {
  const { userId } = res.locals;
  const { postId, comment } = req.body;

  try {
    await commentsRepository.insert(postId, userId, comment);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
