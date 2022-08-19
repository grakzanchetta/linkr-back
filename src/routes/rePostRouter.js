import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import idSchema from "../schemas/idSchema.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import { create } from "../controllers/rePostController.js";

const route = Router();

route.post("/rePosts", validateSchema(idSchema), tokenValidator, create);

export default route;
