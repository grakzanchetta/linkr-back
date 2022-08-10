import { Router } from "express";
import userSchema from "../schemas/userSchema.js";
import { createUser, loginUser } from "../controllers/userController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import loginSchema from "../schemas/loginSchema.js";

const usersRouter = Router();

usersRouter.post('/signup', validateSchema(userSchema), createUser);
usersRouter.post('/', validateSchema(loginSchema), loginUser);

export default usersRouter;