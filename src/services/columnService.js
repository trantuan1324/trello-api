/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    // Gọi tới tầng Model để xử lý bản ghi newcolumn vào database
    const createdColumn = await columnModel.createNew(newColumn)

    // Lấy ra bản ghi đó từ DB
    const dataFromDB = await columnModel.findOneById(createdColumn.insertedId)

    if (dataFromDB) {
      // Xử lý cấu trúc data ở đây trước khi ném response cho client
      dataFromDB.cards = []

      // cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(dataFromDB)
    }
    // Trả về bản ghi vừa được tạo, trong service luôn phải có return
    return dataFromDB
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}
