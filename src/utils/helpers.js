export const rand = function(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const hexToRgba = function(hex, a) {
  return `rgba(${hex
    .substr(1)
    .match(/../g)
    .map(x => +`0x${x}`)},${a})`;
};
