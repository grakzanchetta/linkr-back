import likesRepository from "../repositories/likesRepository.js";

export async function createLike(req, res) {
  const { userId } = res.locals;
  const { postId } = req.body;

  try {
    await likesRepository.insertLike(userId, postId);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function dislike(req, res) {
  const { postId } = req.body;
  const { userId } = res.locals;

  try {
    const { rowCount } = await likesRepository.deleteLike(userId, postId);

    if (rowCount === 0) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
