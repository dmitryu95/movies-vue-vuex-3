import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ApiPlugin from './plugins/api'
import { store } from './store'
import router from './routers/router'

/* Способ импортировать глобально $constants

import * as constants from "./constants";
app.config.globalProperties.$constants = constants

*/

const app = createApp(App);

app.use(router)     // Подключаем Router Vue
app.use(store)      // Подкулючаем Vuex
app.use(ApiPlugin)  // Подключаем созданный плагин api
app.mount('#app');
