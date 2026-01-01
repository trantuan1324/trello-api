import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNewBoard = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (source: rabbyte)',
      'string.empty': 'Title is not allowed to be empty (source: rabbyte)',
      'string.min': 'Title min 3 chars (source: rabbyte)',
      'string.max': 'Title max 50 chars (source: rabbyte)',
      'string.trim':
        'Title must not have leading or trailing whitespace (source: rabbyte)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // aboutEarly: false -> trả về tất cả lỗi, mặc định sẽ là abortEarly: true (52)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu nếu hợp lệ sẽ cho đi tiếp sang controller
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    )
    next(customError)
  }
}

export const boardValidation = {
  createNewBoard
}
