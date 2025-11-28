/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'

const handleCreateNewBoard = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lý bản ghi newBoard vào database

    // Trả về bản ghi vừa được tạo, trong service luôn phải có return
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  handleCreateNewBoard
}
