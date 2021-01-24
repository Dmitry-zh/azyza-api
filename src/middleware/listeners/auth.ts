
import express from 'express'
const router = express.Router()

import { Request, Response, NextFunction } from 'express'

const isAuthorised = (token: any) => {
  return !!token
}

router.all('*', async (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    isAuthorised(req.headers.authorization) ? next() : res.sendStatus(401)
  } else {
    next ()
  }
})

export default router
