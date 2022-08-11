import { Router } from "express";

import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(usersRouter);
router.use(postsRouter);
router.use(likesRouter);

export default router;
