import Vue from 'vue';
import axios from 'axios';

import './utils/filters';

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
  Radio,
  Dropdown,
  DropdownMenu,
  DropdownItem
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
  Radio,
  Dropdown,
  DropdownMenu,
  DropdownItem
};

for (let component of Object.values(components)) {
  Vue.component(component.name, component);
}

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

import '../theme/index.css';
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

// Parts
import STable from 'Parts/Table/STable';
import SCard from 'Parts/Card/SCard';
import StageCreate from 'Parts/Stage/Create';
import StageView from 'Parts/Stage/View';
import Selection from 'Parts/Candidate/Selection';

const parts = {
  STable,
  SCard,
  StageCreate,
  StageView,
  Selection
};

Object.keys(parts).forEach(name => {
  Vue.component(name, parts[name]);
});

export default parts;
