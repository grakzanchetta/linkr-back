import hashtagRepository from "../repositories/hashtagRepository.js";
import postsRepository from "../repositories/postsRepository.js";

export async function GetHashtags(req, res) {
  const { hashtag } = req.params;
  const { userId } = res.locals;

  try {
    const { rows: postsRelated } = await hashtagRepository.GetHashtag(
      hashtag,
      userId
    );

    if (postsRelated.length < 1) {
      return res.send(
        "There is stil no #HASHTAG like this. It's up to you to start a new #HASHTAG. Why don't start now?"
      );
    }
    res.send(postsRelated);
  } catch (error) {
    console.log(error);
    res.send("Somenthing went wrong on your request, please try it again");
  }
}

export async function InputHashtags(postUrl, postText, userId, hashList) {
  console.log("entrou inputhashtag");

  const { rows: postrelated } = await postsRepository.getPost(
    postUrl,
    postText,
    userId
  );

  console.log("vai para passou pela primera query");
  console.log(hashList);
  hashList.map(hash => {
    hashtagRepository.InputHashtag(postrelated[0].id, hash);
  });
  const tamanho = hashList.length;
  hashList.splice(0, tamanho);
  console.log("hashlist final", hashList);

  hashList = [];

  //    colocar um try aqui
}

export async function RankHashtags(req, res) {
  try {
    const { rows: topHashtags } = await hashtagRepository.TopHashtag();

    if (topHashtags.length < 1) {
      return res.send("There is stil no #HASHTAG");
    }
    res.send(topHashtags);
  } catch {
    res.send("Somenthing went wrong on your request, please try it again");
  }
}
