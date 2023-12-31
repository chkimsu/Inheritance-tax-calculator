import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vuex from 'vuex'
import store from "./store/storage"
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(BootstrapVue3)
  .use(Vuex)
  .use(store)
  .mount('#app')
