import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { OutgoingHttpHeaders } from 'http'

import { getHeadersFromBuffer } from './FileSystemHandler'

export async function apiHandle (req: Request, res: Response, operation: any, next: NextFunction, resolveHeaders: boolean = false) {
  try {
    const operationResult: any = await operation() || 'OK'
    if (resolveHeaders) {
      const headers : OutgoingHttpHeaders = await getHeadersFromBuffer(operationResult)
      res.writeHead(200, headers)
      res.end(operationResult)
    } else {
      res.status(200)
      res.send(operationResult)
    }
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
