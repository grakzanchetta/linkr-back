import joi from "joi";

const postSchema = joi.object({
  postUrl: joi.string().uri().required(),
  postText: joi.string().allow(null, "")
});

export default postSchema;
