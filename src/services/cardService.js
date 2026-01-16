/* eslint-disable no-useless-catch */
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    // Gọi tới tầng Model để xử lý bản ghi newcard vào database
    const createdCard = await cardModel.createNew(newCard)
    // Lấy ra bản ghi đó
    const dataFromDB = await cardModel.findOneById(createdCard.insertedId)
    if (dataFromDB) {
      await columnModel.pushCardOrderIds(dataFromDB)
    }
    // Trả về bản ghi vừa được tạo, trong service luôn phải có return
    return dataFromDB
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
