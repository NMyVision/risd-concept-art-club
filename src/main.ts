import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './packages/router'

import AppHeader from './components/Header.vue'
import { useLayouts } from './layouts/useLayouts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(useLayouts)
app.component('AppHeader', AppHeader)
app.mount('#app')
