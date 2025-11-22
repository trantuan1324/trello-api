import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNewBoard = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (source: rabbyte)',
      'string.empty': 'Title is not allowed to be empty (source: rabbyte)',
      'string.min': 'Title min 3 chars (source: rabbyte)',
      'string.max': 'Title max 50 chars (source: rabbyte)',
      'string.trim': 'Title must not have leading or trailing whitespace (source: rabbyte)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict(),
  })

  try {
    // aboutEarly: false, trả về tất cả lỗi, mặc định sẽ là true (52)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'New board' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNewBoard
}