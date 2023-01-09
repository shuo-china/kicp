import type { ServerResponse } from 'http'

export function response(res: ServerResponse, statusCode: number, data: Record<string, any>) {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = statusCode
  res.end(JSON.stringify(data))
}
