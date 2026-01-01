import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const BOARD_COLLECTION_NAME = 'boards'

const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(255).trim().strict(),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // kết quả trả về của insertOne() có dạng:
    // {
    //   acknowledged: true, -> cho biết kết quả trả về có được chấp nhận hay không
    //   insertedId: new ObjectId("6929c9dfb6cf03445667c7fe") -> cho biết id của bản ghi vừa được thêm vào
    // }
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

// query tổng hợp (aggregation) để lấy toàn bộ columns và cards thuộc về board
const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails
}
