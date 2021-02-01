import { Request, Response, NextFunction } from 'express'
import express from 'express'

import { resolveImageFromStatic } from '../core/tech/FileSystemHandler'
import uploader from 'multer'

import Services from '../services'
import { apiHandle } from '../core/tech/ApiHandlerUtils'
import QueryParams from '../core/db/queryParams'
import GalleryObjectModel from '../models/GalleryObjectModel'

const router = express.Router()


router.get('/:fileName', async (req: Request, res: Response, next: NextFunction) => {
  const imageFilename = req.params.fileName

  apiHandle(req, res, async () => {

    return await resolveImageFromStatic(imageFilename)
  }, next, true)
})

export default router
