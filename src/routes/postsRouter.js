import { Router } from "express";
import postSchema from "../schemas/postSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import {
  createPost,
  getPosts,
  deletePost
} from "../controllers/postController.js";

const postsRouter = Router();

postsRouter.get("/posts", tokenValidator, getPosts);

postsRouter.delete("/posts/:id", tokenValidator, deletePost);

postsRouter.post(
  "/posts",
  validateSchema(postSchema),
  tokenValidator,
  createPost
);

export default postsRouter;
