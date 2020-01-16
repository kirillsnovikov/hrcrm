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
  Col
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
  Col
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
import VacancyTable from 'Parts/Vacancy/VacancyTable';
import VacancyView from 'Parts/Vacancy/VacancyView';
import StageCreate from 'Parts/Stage/Create';
import StageView from 'Parts/Stage/View';
import CandidateSelection from 'Parts/Candidate/CandidateSelection';
import CandidateList from 'Parts/Candidate/CandidateList';
import CandidateView from 'Parts/Candidate/CandidateView';
import CandidateEdit from 'Parts/Candidate/CandidateEdit';

const parts = {
  VacancyTable,
  VacancyView,
  StageCreate,
  StageView,
  CandidateSelection,
  CandidateList,
  CandidateView,
  CandidateEdit
};

Object.keys(parts).forEach(name => {
  Vue.component(name, parts[name]);
});

export default parts;
export * from './utils/table';
