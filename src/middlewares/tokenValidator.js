import sessionsRepository from "../repositories/sessionsRepository.js";

export default async function tokenValidator(req, res, next) {
  const { authorization } = req.headers;

  if (authorization === undefined) return res.sendStatus(401);

  try {
    const token = authorization?.replace("Bearer ", "");

    const { rows: session } = await sessionsRepository.getSession(token);

    if (session.length === 0) return res.sendStatus(404);

    res.locals.userId = session[0].userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
