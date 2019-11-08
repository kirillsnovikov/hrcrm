import Vue from 'vue';
// import App from './App.vue';
import axios from 'axios';

import STable from 'Parts/Table/STable.vue';
import SLink from 'Elements/Link/SLink.vue';
import SButton from 'Elements/Button/SButton.vue';
import SBadge from 'Elements/Badge/SBadge.vue';

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

const components = {
  STable,
  SLink,
  SButton,
  SBadge
};

Object.keys(components).forEach(name => {
  Vue.component(name, components[name]);
});

export default components;
