import { Request, Response, NextFunction } from 'express'
import express from 'express'
import uploader from 'multer'

import Services from '../services'
import { apiHandle } from '../core/tech/ApiHandlerUtils'
import QueryParams from '../core/db/queryParams'
import GalleryObjectModel from '../models/GalleryObjectModel'

const router = express.Router()
const services = new Services()
const upload = uploader()

interface MulterRequest extends Request {
  files: any;
}

router.get('/:entity', async (req: Request, res: Response, next: NextFunction) => {
  const entity = req.params.entity
  const queryParams = new QueryParams(req.query)
  const entityService = services.getGalleryService(entity)

  apiHandle(req, res, async () => {
    return await entityService.getList(queryParams)
  }, next)
})

router.post('/:entity', upload.any(),  async (req: MulterRequest, res: Response, next: NextFunction) => {
  const entity = req.params.entity
  const entityService = services.getGalleryService(entity)
  const model: GalleryObjectModel = entityService.repository.model.fromObject(req.body)
  const image = req.files?.length && req.files[0]

  apiHandle(req, res, async () => {
    return await entityService.uploadImageAndCreate(model, image)
  }, next)
})

router.put('/:entity', upload.any(),  async (req: MulterRequest, res: Response, next: NextFunction) => {
  const entity = req.params.entity
  const entityService = services.getGalleryService(entity)
  const model: GalleryObjectModel = entityService.repository.model.fromObject(req.body)
  const image = req.files?.length && req.files[0]

  apiHandle(req, res, async () => {
    return image ? await entityService.updateImageAndModel(model, image) : await entityService.update(model)
  }, next)
})

export default router
