import { createStore } from 'vuex'
import { RootState } from './type'
import login from './login/login'

const store = createStore<RootState>({
  state() {
    return {}
  },
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
