import express from 'express'
const router = express.Router()

import { Request, Response, NextFunction } from 'express'
import gallery from './gallery'
import images from './images'

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('It\'s base API endpoint')
})

router.use('/gallery', gallery)
router.use('/images', images)

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send()
})

export default router
