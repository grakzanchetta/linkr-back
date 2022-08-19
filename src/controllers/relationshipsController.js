import relationshipsRepository from "../repositories/relationshipsRepository.js";
import postsRepository from "../repositories/postsRepository.js";
import commentsRepository from "../repositories/commentsRepository.js";
import likesRepository from "../repositories/likesRepository.js";

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

export async function getPostsByFollow(_, res) {
  const { userId } = res.locals;

  try {
    // const { rows: posts } = await relationshipsRepository.getPostsByFollow(
    //   userId
    // );

    const { rows: postsAt } = await postsRepository.getPostsByFollow(userId);

    if (postsAt.length === 0)
      return res
        .status(200)
        .send("You don't follow anyone yet. Search for new friends!");

    if (postsAt[0].id === null)
      return res.status(200).send("No posts found from your friends");

    const { rows: comments } = await commentsRepository.getAll(userId);

    const { rows: likes } = await likesRepository.getAll();

    // if (postsAt.fields[0].tableID === 0) console.log("oi");

    let teste = postsAt.map(post => {
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
    console.log(teste);

    return res.status(200).send(teste);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
