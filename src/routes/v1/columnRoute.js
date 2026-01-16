import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/').post(
  columnValidation.createNewColumn,
  columnController.createNewColumn
)

export const columnRoute = Router
