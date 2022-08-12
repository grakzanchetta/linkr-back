import { Router } from "express";
import postSchema from "../schemas/postSchema.js";
import editPostSchema from "../schemas/editPostSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import {
  createPost,
  getPosts,
  deletePost,
  editPost
} from "../controllers/postController.js";

const postsRouter = Router();

postsRouter.get("/posts", tokenValidator, getPosts);

postsRouter.delete("/posts/:id", tokenValidator, deletePost);

postsRouter.patch(
  "/posts",
  validateSchema(editPostSchema),
  tokenValidator,
  editPost
);

postsRouter.post(
  "/posts",
  validateSchema(postSchema),
  tokenValidator,
  createPost
);

export default postsRouter;
