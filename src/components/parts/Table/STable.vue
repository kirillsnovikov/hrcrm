<template>
  <section id="s-table" class="s-table">
    <s-table-item
      v-for="item in parseTableData"
      :data="item"
      :key="item.name_id.id"
      :id="item.name_id.id"
    ></s-table-item>
  </section>
</template>

<script>
import STableItem from 'Parts/Table/STableItem.vue';

export default {
  name: 'STable',
  components: {
    STableItem
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      columnParams: ['label', 'module', 'id', 'value']
    };
  },
  computed: {
    parseTableData() {
      let tableData = [];
      if (this.data.data) {
        this.data.data.forEach(item => {
          tableData.push(this.parseData(item));
        });
        if (process.env.NODE_ENV === 'development') {
          // console.log(tableData);
        }
        return tableData;
      }
      return {};
    }
  },
  methods: {
    defineKeys() {
      this.dataKeys = Object.keys(this.data.columns).filter(
        key => Object.values(this.titleKeys).indexOf(key) === -1
      );
    },
    parseData(data) {
      let titles = {};
      Object.keys(this.data.columns).forEach(column => {
        Object.defineProperty(titles, this.data.columns[column]['name'], {
          value: this.data.columns[column]
            ? this.getColumnParams(column, data)
            : {},
          writable: false
        });
      });
      return titles;
    },
    getColumnParams(column, data) {
      let colData = this.data.columns[column];
      // console.log('data', data);
      let parameters = {};
      this.columnParams.forEach(param => {
        if (param === 'label') {
          parameters[param] = this.data.mod[colData[param]];
        } else if (param === 'module') {
          parameters[param] = colData[param];
        } else if (param === 'value') {
          parameters[param] = colData ? data[column] : '';
        } else {
          let colPar;
          if ((colPar = colData[param]) === 'HRPAC_VACANCY_NAMES_ID_C') {
            parameters[param] = data['ID'];
          } else {
            parameters[param] = data[colPar];
          }
        }
      });
      return parameters;
    }
  }
};
</script>
