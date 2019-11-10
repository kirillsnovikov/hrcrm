import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import './assets/scss/main.scss';

const libs = {
  axios: axios,
  eventHub: new Vue()
};

Vue.config.productionTip = false;

Object.keys(libs).map(libName => {
  // Vue.prototype[`$${libName}`] = libs[libName];
  Object.defineProperty(Vue.prototype, `$${libName}`, {
    value: libs[libName],
    writable: false
  });
});

if (process.env.NODE_ENV === 'development') {
  new Vue({
    render: h => h(App)
  }).$mount('#app');
} else {
  // Vue.components('vue-app', App);
  new Vue({
    el: '#app',
    components: {
      App
    },
    template: '<App/>'
  });
}
