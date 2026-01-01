/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lý bản ghi newBoard vào database
    const createdBoard = await boardModel.createNew(newBoard)
    // Lấy ra bản ghi đó
    // Trả về bản ghi vừa được tạo, trong service luôn phải có return
    return await boardModel.findOneById(createdBoard.insertedId)
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    return board
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}
