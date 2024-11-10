import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// เพิ่มการกำหนดค่า feature flags
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ion-') // หรือเงื่อนไขอื่นๆ ตามที่ต้องการ
}

app.use(router)
app.mount('#app')