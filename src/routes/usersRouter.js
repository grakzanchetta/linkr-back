import { Router } from "express";
import userSchema from "../schemas/userSchema.js";
import { createUser } from "../controllers/userController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";

const usersRouter = Router();

usersRouter.post('/signup', validateSchema(userSchema), createUser);


export default usersRouter;