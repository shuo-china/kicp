import type { MockMethod } from 'vite-plugin-mock'

const tokens = {
  admin: 'admin-token',
  editor: 'editor-token'
}

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    rawResponse: async (req, res) => {
      let reqBody = ''
      const { username } = await new Promise<{ username: string }>(resolve => {
        req.on('data', chunk => {
          reqBody += chunk
        })
        req.on('end', () => {
          resolve(JSON.parse(reqBody))
        })
      })

      const token = tokens[username]

      if (token) {
        const result = {
          access_token: token,
          token_type: 'Bearer',
          expires_in: 60 * 60 * 24
        }

        res.statusCode = 201
        res.end(JSON.stringify(result))
      } else {
        const error = {
          code: 'LOGIN_FAIL',
          message: '用户名或密码不正确'
        }
        res.statusCode = 403
        res.end(JSON.stringify(error))
      }
    }
  },
  {
    url: '/api/expired',
    method: 'get',
    statusCode: 401,
    response: {
      code: 'TOKEN_INVALID',
      message: 'Token已过期'
    }
  }
] as MockMethod[]
