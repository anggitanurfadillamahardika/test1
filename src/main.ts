import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
axios.defaults.baseURL = 'https://reqres.in/api'

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

// // import './assets/main.css'

const app = Vue.createApp(App)


app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
