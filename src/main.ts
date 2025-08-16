import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './packages/router'


import { useLayouts } from './layouts/useLayouts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(useLayouts)
app.mount('#app')
