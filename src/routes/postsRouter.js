import { Router } from "express";
import postSchema from "../schemas/postSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import { createPost } from "../controllers/postController.js";

const postsRouter = Router();

postsRouter.post(
  "/posts",
  validateSchema(postSchema),
  tokenValidator,
  createPost
);

export default postsRouter;
