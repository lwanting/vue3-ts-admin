import { Module } from 'vuex'
import { LoginState } from './type'
import { RootState } from '../type'
import { Account } from '@/network/request/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/network/request/login/login'
import localCache from '@/utils/cache'
import { mapMenuToRouter } from '@/utils/map-menu'
import router from '@/router'

const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenuToRouter(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      console.log(router)
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: Account) {
      // login
      const loginResult = await accountLoginRequest(payload)
      const { token, id } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // get user info
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // get user menus
      const userMenusResult = await requestUserMenusById(id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
