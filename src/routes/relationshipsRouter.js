import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { createSchema } from "../schemas/relationshipsSchemas.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import { create, unfollow } from "../controllers/relationshipsController.js";

const route = Router();

route.delete("/relationships/:id", tokenValidator, unfollow);

route.post(
  "/relationships",
  validateSchema(createSchema),
  tokenValidator,
  create
);

export default route;
