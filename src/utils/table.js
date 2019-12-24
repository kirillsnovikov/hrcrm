export const getTableData = function(data, columns) {
  let result = [];

  data.forEach(item => {
    let row = {};
    Object.keys(columns).forEach(col => {
      let column = (row[col.toLowerCase()] = {});
      Object.keys(columns[col]).forEach(colParam => {
        column[colParam] = columns[col][colParam];
      });
      column['value'] = item[col];
    });
    result.push(row);
  });

  return result;
};
