import { Request, Response, NextFunction } from 'express'
import express from 'express'
import uploader from 'multer'

import Services from '../services'
import Model from '../models/Model'
import { apiHandle } from '../core/tech/ApiHandlerUtils'
import QueryParams from '../core/db/queryParams'

const router = express.Router()
const services = new Services()
const upload = uploader()

interface MulterRequest extends Request {
  files: any;
}

router.get('/:entity', async (req: Request, res: Response, next: NextFunction) => {
  const entity = req.params.entity
  const queryParams = new QueryParams(req.query)
  const entityService = services.getService(entity)

  apiHandle(req, res, async () => {
    return await entityService.getList(queryParams)
  }, next)
})

router.post('/:entity', upload.any(),  async (req: MulterRequest, res: Response, next: NextFunction) => {
  const entity = req.params.entity
  const entityService = services.getService(entity)
  const model: Model = entityService.repository.model.fromObject(req.body)
  console.log(req.files)

  apiHandle(req, res, async () => {
    return await entityService.create(model)
  }, next)
})

export default router
