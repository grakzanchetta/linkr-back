import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router ();

userRouter.post('/signup', validateSchema(userSchema));

export default userRouter;