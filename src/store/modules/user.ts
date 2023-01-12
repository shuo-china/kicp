import { defineStore } from 'pinia'
import { isEmpty } from 'lodash'
import { store } from '@/store'
import { login as fetchLogin, getUserInfo as fetchUserInfo } from '@/api/user'
import type { UserInfo } from '@/api/model/userModel'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {} as UserInfo
  }),
  getters: {
    hasUserInfo: state => !isEmpty(state.userInfo)
  },
  actions: {
    async login(userInfo: Recordable) {
      const res = await fetchLogin(userInfo)
      this.token = res.access_token
      return res
    },
    async getUserInfo() {
      const res = await fetchUserInfo()
      this.userInfo = res
      return res
    },
    async logout() {
      this.$reset()
    }
  },
  persist: {
    paths: ['token']
  }
})

export function getUserStore() {
  return useUserStore(store)
}
