import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import * as ElIcons from '@element-plus/icons-vue'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)

// 统一注册Icon图标
Object.keys(ElIcons).forEach((key) => {
  app.component(key, ElIcons[key as keyof typeof ElIcons])
})
app.use(store)
setupStore()

app.use(router)

app.mount('#app')
