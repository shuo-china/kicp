import type { IncomingMessage, ServerResponse } from 'http'

export function send(res: ServerResponse, statusCode: number, data: Record<string, any>) {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = statusCode
  res.end(JSON.stringify(data))
}

export function getToken(req: IncomingMessage): string {
  const { authorization } = req.headers

  if (authorization) {
    return authorization.match(/^Bearer\s(\S+)/)?.[1] ?? ''
  }

  return ''
}
