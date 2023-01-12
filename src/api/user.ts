import { request } from '@/utils/request'
import type { LoginResult, UserInfo } from './model/userModel'

const Api = {
  Login: '/login',
  UserInfo: '/getUserInfo'
}

export function login(data: Recordable) {
  return request.post<LoginResult>({
    url: Api.Login,
    data
  })
}

export function getUserInfo() {
  return request.get<UserInfo>({
    url: Api.UserInfo
  })
}
