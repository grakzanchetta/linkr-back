import joi from 'joi'

const createSchema = joi.object({
  id: joi.number().greater(0).required()
})

export { createSchema }
