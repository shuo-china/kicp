import type { MockMethod } from 'vite-plugin-mock'
import { send, getToken } from './utils'

const users = {
  admin: {
    token: 'admin-token',
    info: {
      nickname: 'Super Admin',
      roles: ['visitor', 'passage', 'traffic']
    }
  },
  normal: {
    token: 'normal-token',
    info: {
      nickname: 'Normal User',
      roles: ['visitor']
    }
  }
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

      const token = users[username]?.token

      if (token) {
        send(res, 201, {
          access_token: token,
          token_type: 'Bearer',
          expires_in: 60 * 60 * 24
        })
      } else {
        send(res, 403, {
          code: 'LOGIN_FAIL',
          message: '用户名或密码不正确'
        })
      }
    }
  },
  {
    url: '/api/getUserInfo',
    method: 'get',
    rawResponse: (req, res) => {
      const token = getToken(req)

      if (token) {
        const userInfo = Object.values(users).find(i => i.token === token)?.info
        if (userInfo) {
          send(res, 200, userInfo)
          return
        }
      }

      send(res, 401, {
        code: 'TOKEN_INVALID',
        message: '令牌无效'
      })
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
