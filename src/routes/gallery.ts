import { Request, Response, NextFunction } from 'express'
import express from 'express'
import uploader from 'multer'

import Services from '../services'
import Model from '../models/Model'
import { apiHandle } from '../core/tech/ApiHandlerUtils'

const router = express.Router()
const services = new Services()
const upload = uploader()

interface MulterRequest extends Request {
  files: any;
}

router.get('/:entity', upload.any(),  async (req: MulterRequest, res: Response, next: NextFunction) => {
  const entity = req.params.entity
  const entityService = services.getService(entity)

  entityService.getByParams()
  // let id
  // if (req.query && req.query.id) {
  //   id = req.query.id
  //   const product = await productService.get(Number(id))
  //   return res.status(200).send(product)
  // } else {
  //   const products = await productService.getAll()
  //   return res.status(200).send(products)
  // }
})

router.post('/:entity', async (req: Request, res: Response, next: NextFunction) => {
  const entity = req.params.entity
  const entityService = services.getService(entity)
  const model: Model = entityService.repository.model.fromObject(req.body)

  apiHandle(req, res, async () => {
    return await entityService.create(model)
  }, next)
})

// router.post('/', async (req: Request, res: Response, next: NextFunction) => {
//   const product = req.body
//   if (!product || !product.title) {
//     return res.status(500).send('Request body is required')
//   }
//   const newProduct = await productService.create(product)
//   if (!newProduct) {
//     return res.status(500).send('Product can\'t created')
//   } else {
//     return res.status(200).send(newProduct)
//   }
// })
//
// router.put('/', async (req: Request, res: Response, next: NextFunction) => {
//   const product = req.body
//   if (!product || !product.id) {
//     return res.status(500).send('Request body is required')
//   }
//   productService.update(product).then((result) => {
//     res.status(200).send(result)
//   })
// })
//
// router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
//   const product = req.body
//   if (!product || !product.id) {
//     return res.status(500).send('Request body is required')
//   }
//   productService.delete(product).then((result) => {
//     res.status(204).send(`Deleted ${result} products`)
//   })
// })

export default router
