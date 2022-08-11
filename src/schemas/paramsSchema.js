import joi from "joi";

const paramsSchema = joi.object({
  id: joi.number().greater(0).required()
});

export default paramsSchema;
