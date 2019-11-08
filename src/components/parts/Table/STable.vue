<template>
  <section id="s-table" class="s-table">
    <s-table-item
      v-for="item in parseTableData"
      :data="item"
      :key="item.id"
    ></s-table-item>
  </section>
</template>

<script>
import STableItem from 'Parts/Table/STableItem.vue';
export default {
  name: 's-table',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      columnParams: ['label', 'module', 'id'],
      titleKeys: ['NAME_ID', 'LOCATION_ID', 'STATUS_ID']
      // dataKeys: this.getDataKeys()
      // columns: this.data.columns
    };
  },
  components: {
    STableItem
  },
  computed: {
    parseTableData() {
      let tableData = [];
      if (this.data.data) {
        this.data.data.forEach(item => {
          if (process.env.NODE_ENV === 'development') {
            // console.log(item);
          }
          let result = {};
          result['header'] = this.getTitles(item);
          result['body'] = this.getBody(item);
          tableData.push(result);
        });
        // console.log(tableData);
        return tableData;
      }
      return {};
    }
  },
  methods: {
    getDataKeys() {
      let keys = [];
      keys = Object.keys(this.data.columns).forEach(key => {
        this.titleKeys.forEach(titleKey => {
          console.log(titleKey !== key);
          return titleKey !== key;
        });
      });
      console.log(keys);
      return keys;
    },
    getTitles(data) {
      // console.log(data);
      // let keys = ['NAME_ID', 'LOCATION_ID', 'STATUS_ID'];
      let titles = {};
      this.titleKeys.forEach(key => {
        titles[data[key]] = this.getColumnParams(this.data.columns[key], data);
        // delete this.data.columns[key];
      });
      return titles;
    },
    getBody(data) {
      let dataKeys = this.getDataKeys();
      let body = {};
      dataKeys.forEach(column => {
        // console.log(this.data.columns, column);
        body[data[column]] = this.getColumnParams(
          this.data.columns[column],
          data
        );
      });
      return body;
    },
    getColumnParams(column, data) {
      // console.log(column);
      let parameters = {};
      this.columnParams.forEach(param => {
        if (param === 'label') {
          parameters[param] = this.data.mod[column[param]];
        } else if (param === 'module') {
          parameters[param] = column[param];
        } else {
          parameters[param] = data[column[param]];
        }
      });
      return parameters;
    }
  }
};
</script>
