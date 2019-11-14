import Vue from 'vue';

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
    return str.toFixed();
  }
});
