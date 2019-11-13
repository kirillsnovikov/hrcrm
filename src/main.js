import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import {
  Button,
  Link,
  Badge,
  Icon,
  Progress,
  Tag,
  ButtonGroup,
  Tooltip
} from 'element-ui';

const components = {
  Button,
  Link,
  Badge,
  Icon,
  Progress,
  Tag,
  ButtonGroup,
  Tooltip
};

for (let component of Object.values(components)) {
  Vue.component(component.name, component);
}

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

import '../theme/index.css';
import './assets/scss/main.scss';
// import './assets/scss/variables/element-variables.scss';
// import 'element-ui/lib/theme-chalk/index.css';

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
