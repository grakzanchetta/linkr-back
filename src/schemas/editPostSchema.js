import joi from "joi";

const editPostSchema = joi.object({
  postId: joi.number().greater(0).required(),
  postText: joi.string().allow(null, "").required()
});

export default editPostSchema;
