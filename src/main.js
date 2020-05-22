import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import './utils/filters';
import './utils/directives';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSortAlphaUp, faSortAlphaDown, faRandom } from '@fortawesome/free-solid-svg-icons';
import {
  faTelegram,
  faSkype,
  faWhatsappSquare
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTelegram, faSkype, faWhatsappSquare, faEnvelope, faSortAlphaUp, faSortAlphaDown, faRandom);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import {
  Button,
  Link,
  Badge,
  Icon,
  Progress,
  Tag,
  ButtonGroup,
  Tooltip,
  Tabs,
  TabPane,
  Avatar,
  Input,
  Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  Radio,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Switch,
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  Upload,
  Row,
  Col,
  Loading,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Collapse,
  CollapseItem,
  Popover
  // Carousel,
  // CarouselItem,
} from 'element-ui';

const components = {
  Button,
  Link,
  Badge,
  Icon,
  Progress,
  Tag,
  ButtonGroup,
  Tooltip,
  Tabs,
  TabPane,
  Avatar,
  Input,
  Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  Radio,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Switch,
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  Upload,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Collapse,
  CollapseItem,
  Popover
  // Carousel,
  // CarouselItem,
};

for (let component of Object.values(components)) {
  Vue.component(component.name, component);
}
Vue.use(Loading.directive);

import lang from 'element-ui/lib/locale/lang/ru-RU';
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
