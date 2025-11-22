import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.use('/v1', APIs_V1)

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hi ${env.AUTHOR}, Your back-end is running at http://${hostname}:${port}/`)
  })

  exitHook(() => {
    console.log('\n3. Disconnecting from MongoDB')
    CLOSE_DB()
    console.log('4. Disconnected from MongoDB')
  })
}

(async () => {
  try {
    console.log('1. Connecting to the DB Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to the DB Atlas...')

    // Chạy server sau khi connect đc với DB
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log(`Connected to DB Atlas`))
//   .then(() => START_SERVER())
//   .catch((err) => {
//     // bắt đc lỗi thì tắt máy đi ngủ
//     console.error(err)
//     process.exit(0)
//   })

