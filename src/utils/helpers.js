export const rand = function(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const hexToRgba = function(hex, a) {
  return `rgba(${hex
    .substr(1)
    .match(/../g)
    .map(x => +`0x${x}`)},${a})`;
};

export const plural = function(n, type = 'year') {
  let text_forms =
    type === 'year' ? ['год', 'года', 'лет'] : ['минута', 'минуты', 'минут'];

  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
};
