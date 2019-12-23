export const getTableData = function(data, columns) {
  let tableData = [];
  // Object.keys(columns).forEach(col => {
  //   // console.log(cols);
  //   let cols = {};
  //   cols[col] = columns[col];
  //   data.forEach(item => {
  //     tableData.push(cols);
  //     cols[col]['value'] = item[col];
  //   });
  // });

  // console.log(tableData);

  data.forEach(item => {
    // console.log(item);

    tableData.push(getColumns(columns, item));
  });
  console.log(tableData);

  function getColumns(columns, item) {
    let aaa = {};
    Object.keys(columns).forEach(col => {
      aaa = columns[col];
      aaa['test'] = item[col];
      console.log(aaa);
    });
    return aaa;
  }
  // if (data) {
  //   data.forEach(item => {
  //     // let values = {};
  //     // tableData.push(values);
  //     // console.log(tableData[i]);
  //     console.log(item);
  //     Object.keys(columns).forEach(column => {
  //       tableData.push({
  //         '111': item[column].name
  //       });
  //       // values[column] = item[column];
  //       // Object.defineProperty(tableData[i], columns[column]['name'], {
  //       //   value: columns[column],
  //       //   writable: true,
  //       //   enumerable: true
  //       // });
  //       // tableData[i][columns[column]['name']]['1111'] = item[column];
  //       // console.log(tableData[i], item[column]);
  //     });
  //     // let data = {};
  //     // for (let [key, value] of Object.entries(columns)) {
  //     //   value['123'] = values[key];
  //     //   data[key] = value;
  //     //   console.log(data);
  //     // }
  //     // tableData.push(values);
  //     // parseData(values, columns);
  //   });
  //   console.log(tableData);
  //   // return tableData;
  // }
};

// function parseData(values, columns) {
// }

// function getColumnParams(column, data, columns) {
//   let colData = columns[column];
//   let value = data[column];
//   colData['value'] = value;
//   let columnParams = Object.keys(columns).map(col => col.toLowerCase());
//   let parameters = {};
//   columnParams.forEach(param => {
//     parameters[param] = colData ? data[column] : '';
//   });
//   console.log(parameters);
//   return parameters;
// }
