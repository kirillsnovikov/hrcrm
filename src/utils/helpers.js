export const rand = function(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const hexToRgba = function(hex, a) {
  return `rgba(${hex
    .substr(1)
    .match(/../g)
    .map(x => +`0x${x}`)},${a})`;
};

export const plural = function(str, type = 'year') {
  let text_forms =
    type === 'year' ? ['год', 'года', 'лет'] : ['минута', 'минуты', 'минут'];

  str = Math.abs(str) % 100;
  var n1 = str % 10;
  if (str > 10 && str < 20) {
    return `${str} ${text_forms[2]}`;
  }
  if (n1 > 1 && n1 < 5) {
    return `${str} ${text_forms[1]}`;
  }
  if (n1 == 1) {
    return `${str} ${text_forms[0]}`;
  }
  return `${str} ${text_forms[2]}`;
};

export const uniq = array => {
  return Array.from(new Set(array));
};

export const formatHtml = text => {
  const replacement = [[/&quot;/g, '"'], [/&gt;/g, '>'], [/&lt;/g, '<']];

  return text
    .replace(...replacement[0])
    .replace(...replacement[1])
    .replace(...replacement[2]);
};

export const scrollToError = (fields, scroll_value) => {
  const firstErrorField = Object.keys(fields)[0];
  const stickyPanel =
    document.querySelector('.inline-buttons').offsetHeight + 15;
  const elem = document
    .querySelector(`input[name=${firstErrorField}]`)
    .closest('.el-form-item.row');

  if (window.scrollY >= scroll_value) {
    window.scroll(0, elem.offsetTop - stickyPanel);
  } else {
    window.scroll(0, elem.offsetTop - stickyPanel * 2);
  }
};
