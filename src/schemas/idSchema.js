import joi from "joi";

const idSchema = joi.object({
  postId: joi.number().greater(0).required()
});

export default idSchema;
