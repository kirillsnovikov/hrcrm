import Vue from 'vue';
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
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification
  // Carousel,
  // CarouselItem,
} from 'element-ui';

const components = {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification
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
import VacancyEdit from 'Parts/Vacancy/VacancyEdit';
import StageCreate from 'Parts/Stage/Create';
import StageView from 'Parts/Stage/View';
import CandidateSelection from 'Parts/Candidate/CandidateSelection';
import CandidateList from 'Parts/Candidate/CandidateList';
import CandidateView from 'Parts/Candidate/CandidateView';
import CandidateEdit from 'Parts/Candidate/CandidateEdit';

const parts = {
  VacancyTable,
  VacancyView,
  VacancyEdit,
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
