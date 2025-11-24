import { StatusCodes } from 'http-status-codes'
import ApiError from "~/utils/ApiError";

const createNewBoard = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    console.log('req.query: ', req.query)
    console.log('req.params: ', req.params)
    console.log('req.files: ', req.files)
    console.log('req.cookies: ', req.cookies)
    console.log('req.jwtDecoded: ', req.jwtDecoded)
    // Điều hướng dữ liệu sang tầng Service
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'rabbyte test error')
    // Có kết quả thì trả về Client
    // res.status(StatusCodes.CREATED).json({ message: 'New board was created successfully' })
  } catch (error) { next(error) } // đẩy về nơi xử lý lỗi tập trung (54)
}

export const boardController = {
  createNewBoard
}