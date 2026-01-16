import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNewCard = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createdCard = await cardService.createNew(req.body)

    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    // đẩy về nơi xử lý lỗi tập trung (54)
    next(error)
  }
}

export const cardController = {
  createNewCard
}
