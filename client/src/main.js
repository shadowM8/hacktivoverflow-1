import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import wysiwyg from "vue-wysiwyg";


Vue.use(wysiwyg, {}); // config is optional. more below
Vue.use(Vuetify, {
  theme: {
    primary: '#00ACC1'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
