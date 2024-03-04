import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ApiPlugin from './plugins/api'
import { store } from './store'
import router from './routers/router'
import * as constants from "./constants";

const app = createApp(App);

app.config.globalProperties.$constants = constants

app.use(router)     // Подключаем Router Vue
app.use(store)      // Подкулючаем Vuex
app.use(ApiPlugin)  // Подключаем созданный плагин api
app.mount('#app');