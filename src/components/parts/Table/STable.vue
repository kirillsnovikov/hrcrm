<template>
  <section id="s-table" class="s-table">
    <s-table-item v-for="item in parseTableData" :data="item" :key="item.id"></s-table-item>
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
      columnParams: ['label', 'module', 'id']
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
      Object.keys(this.data.columns).forEach(value => {
        Object.defineProperty(titles, this.data.columns[value]['name'], {
          value: {
            value: this.data.columns[value] ? data[value] : '',
            props: this.data.columns[value]
              ? this.getColumnParams(this.data.columns[value], data)
              : {}
          },
          writable: true
        });
      });
      return titles;
    },
    getColumnParams(column, data) {
      let parameters = {};
      this.columnParams.forEach(param => {
        if (param === 'label') {
          parameters[param] = this.data.mod[column[param]];
        } else if (param === 'module') {
          parameters[param] = column[param];
        } else {
          let colPar;
          if ((colPar = column[param]) === 'HRPAC_VACANCY_NAMES_ID_C') {
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
