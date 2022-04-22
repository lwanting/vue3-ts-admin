import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { RootState, StoreType } from './type'
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
export function useStore(): Store<StoreType> {
  return useVuexStore()
}

export default store
