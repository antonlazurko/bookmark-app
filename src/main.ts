import './assets/main.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { vFocus } from './directives/focus'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('focus', vFocus)

app.mount('#app')
