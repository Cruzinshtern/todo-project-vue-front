import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vue-toastification/dist/index.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

app.use(Toast)
app.use(router)
app.use(i18n)

app.mount('#app')
