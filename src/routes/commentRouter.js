import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import { create } from "../schemas/commentSchema.js";
import { createComment } from "../controllers/commentController.js";

const route = Router();

route.post("/comments", validateSchema(create), tokenValidator, createComment);

export default route;
