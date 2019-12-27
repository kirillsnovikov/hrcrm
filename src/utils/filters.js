import Vue from 'vue';
import { plural } from '@/utils/helpers';

Vue.filter('toupper', str => {
  if (!str) return '';
  str = str.toString();
  return str.toUpperCase();
});

Vue.filter('tolower', str => {
  if (!str) return '';
  str = str.toString();
  return str.toLowerCase();
});

Vue.filter('capitalize', str => {
  if (!str) return '';
  str = str.toString();
  return str.charAt(0).toUpperCase() + str.slice(1);
});

Vue.filter('truncate', (str, length, clamp = '...') => {
  return str.length > length ? str.slice(0, length) + clamp : str;
});

Vue.filter('salaryFormat', (str, type = 'decimal', precision = 2) => {
  if (type === 'decimal') {
    return parseFloat(str).toFixed(precision);
  } else {
    return Number(Number(str).toFixed()).toLocaleString();
  }
});

Vue.filter('grade', str => {
  let grades = str.match(/\^[\w]+\^/g);
  if (grades !== null && grades.length > 0) {
    let mapped = grades.map(grade => {
      return grade.replace(/\^/g, '');
    });
    return mapped.join(', ');
  }
  return str;
});

Vue.filter('plural', plural);

Vue.filter('route', (module, action, id) => {
  let types = {
    view: 'DetailView',
    edit: 'EditView'
  };
  let searchParams = new URLSearchParams();
  let params = {
    module: module,
    action: types[action]
  };
  if (id) {
    params['record'] = id;
  }

  for (let [key, value] of Object.entries(params)) {
    searchParams.append(key, value);
  }
  return `/index.php?${searchParams}`;
});
