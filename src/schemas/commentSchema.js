import joi from "joi";

const create = joi.object({
  postId: joi.number().greater(0).required(),
  comment: joi.string().trim().required()
});

export { create };
