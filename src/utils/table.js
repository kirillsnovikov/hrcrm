export const getTableData = function(data, columns) {
  console.log(data, columns);
  let items = [
    { NAME: 'Alex', AGE: 20 },
    { NAME: 'Bob', AGE: 25 },
    { NAME: 'John', AGE: 30 }
  ];
  let cols = {
    NAME: {
      a: 1,
      b: 2,
      c: 3
    },
    AGE: {
      d: 5,
      e: 6,
      f: 7,
      g: 8
    }
  };

  let result = [];

  items.forEach(item => {
    console.log(item);
    Object.keys(cols).forEach(col => {
      let params = {};
      Object.keys(cols[col]).forEach(colParam => {
        params[colParam] = cols[col][colParam];
        params['test'] = item[col];
      });
      result.push(params);
    });
  });

  console.log(result);
};
