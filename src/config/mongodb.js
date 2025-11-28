import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

const MONGODB_URI = env.MONGODB_URI
const DB_NAME = env.DATABASE_NAME

// khởi tạo một instance ban đầu là null vì chưa có kết nối
let trelloDatabaseInstance = null

// khởi tạo một đối tượng Mongo Client Instance để kết nối tới MongoDB
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  // Lưu ý: serverApi có từ version 5.0 trở đi, có thể ko cần dùng,
  // còn nếu dùng thì sẽ chỉ định  1 stable api của mongodb
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

// kết nối tới MongoDB
export const CONNECT_DB = async () => {
  // Gọi kết nối tới mongodb atlas với uri đã khai báo trong mongoClientInstance
  await mongoClientInstance.connect()

  // nếu kết nối thành công, gán db_name vào trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DB_NAME)
}

// Kiểm tra kết tới DB
// Chỉ gọi khi connect thành công
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Connect DB Failed')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await trelloDatabaseInstance.close()
}
