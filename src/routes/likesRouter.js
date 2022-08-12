import { Router } from "express";
import idSchema from "../schemas/idSchema.js";
import paramsSchema from "../schemas/paramsSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import { createLike, dislike } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.post(
  "/likes",
  validateSchema(idSchema),
  tokenValidator,
  createLike
);

likesRouter.delete("/likes/:id", tokenValidator, dislike);

export default likesRouter;
