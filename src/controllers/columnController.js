import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNewColumn = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createdColumn = await columnService.createNew(req.body)

    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    // đẩy về nơi xử lý lỗi tập trung (54)
    next(error)
  }
}

export const columnController = {
  createNewColumn
}
