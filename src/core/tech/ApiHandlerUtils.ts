import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
// import { OutgoingHttpHeaders } from 'http'

export async function apiHandle (req: Request, res: Response, operation: any, next: NextFunction) {
  try {
    const operationResult: any = await operation() || 'OK'
    res.status(200).send(operationResult)
  } catch (e) {
    let status: number = 500
    switch (e.name) {
      case 'SequelizeDatabaseError':
        status = 422
        break
      default:
        status = 500
    }
    res.sendStatus(status)
    console.error(e.message)
    next(createError(status, e.message))
  }
}
