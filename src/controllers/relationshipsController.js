import relationshipsRepository from "../repositories/relationshipsRepository.js";

export async function create(req, res) {
  const { id } = req.body;
  const { userId } = res.locals;

  try {
    await relationshipsRepository.insert(userId, id);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function unfollow(req, res) {
  const { userId } = res.locals;
  const { id } = req.params;

  try {
    await relationshipsRepository.remove(userId, id);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
