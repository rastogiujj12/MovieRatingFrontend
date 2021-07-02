// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSwal from 'vue-swal'
import store from './store'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)

Vue.use(VueSwal)
Vue.use(Buefy)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
