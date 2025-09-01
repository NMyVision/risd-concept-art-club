import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './packages/router'

import PocketBase from 'pocketbase';
import { useLayouts } from './layouts/useLayouts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(useLayouts)
app.mount('#app')

/*
const pb = new PocketBase( import.meta.env.VITE_POCKETBASE_URL );
pb.authStore.save(import.meta.env.VITE_POCKETBASE_TOKEN);
await pb.collections.getFullList()
*/
