import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
import '@/styles/app.css'
import '@/assets/styles/styles.scss'

const app = createApp(App)

app.use(createPinia())
// app.use(router)
app.mount('#app')
