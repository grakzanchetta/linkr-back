import { Router } from "express";

import usersRouter from "./usersRouter.js";

import hashtagRouter from "./hashtagRouter.js";
import postsRouter from "./postsRouter.js";
import likesRouter from "./likesRouter.js";
import relationshipsRouter from "./relationshipsRouter.js";
import commentsRouter from "./commentRouter.js";
import rePostRouter from "./rePostRouter.js";

const router = Router();

router.use(usersRouter);

router.use(hashtagRouter);

router.use(postsRouter);

router.use(likesRouter);

router.use(relationshipsRouter);

router.use(commentsRouter);

router.use(rePostRouter);

export default router;
