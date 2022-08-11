import { Router } from "express";
import idSchema from "../schemas/idSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import { createLike, dislike } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.delete("/likes", validateSchema(idSchema), tokenValidator, dislike);

likesRouter.post(
  "/likes",
  validateSchema(idSchema),
  tokenValidator,
  createLike
);

export default likesRouter;
