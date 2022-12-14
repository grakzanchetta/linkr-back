import { Router } from "express";
import { addPostSchema } from "../schemas/postSchema.js";
import { editPostSchema } from "../schemas/postSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import {
  createPost,
  getPosts,
  deletePost,
  editPost,
  getPostsByUser
} from "../controllers/postController.js";
import findingHash from "../middlewares/findingHashs.js";
import hashList from "../schemas/hashSchema.js";

const postsRouter = Router();

postsRouter.get("/posts", tokenValidator, getPosts);

postsRouter.delete("/posts/:id", tokenValidator, deletePost);

postsRouter.get("/posts/user/:id", tokenValidator, getPostsByUser);

postsRouter.patch(
  "/posts",
  validateSchema(editPostSchema),
  tokenValidator,
  editPost
);

postsRouter.post(
  "/posts",
  validateSchema(addPostSchema),
  tokenValidator,
  findingHash,
  createPost
);

export default postsRouter;
