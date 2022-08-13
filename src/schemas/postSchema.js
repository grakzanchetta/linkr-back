import joi from "joi";

const addPostSchema = joi.object({
  postUrl: joi.string().uri().required(),
  postText: joi.string().allow(null, "")
});

const editPostSchema = joi.object({
  postId: joi.number().greater(0).required(),
  postText: joi.string().allow(null, "").required()
});

const getPostsByUserSchema = joi.object({
  id: joi.number().greater(0).required()
});

export { addPostSchema, getPostsByUserSchema, editPostSchema };
