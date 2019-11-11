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
      titleKeys: {
        title: 'NAME_ID',
        location: 'LOCATION_ID',
        status: 'STATUS_ID'
      },
      dataKeys: [
        'BUSINESS_UNIT_ID',
        'DEPARTMENT_ID',
        'PROJECT_LINK_ID',
        'SUPERVISOR_ID'
      ]
    };
  },
  components: {
    STableItem
  },
  computed: {
    parseTableData() {
      let tableData = [];
      // this.defineKeys();
      console.log(this.data.columns);
      if (this.data.data) {
        this.data.data.forEach(item => {
          let result = {};
          Object.defineProperties(result, {
            header: {
              value: this.getTitles(item),
              writable: true
            },
            body: {
              value: this.getBody(item),
              writable: true
            }
          });
          tableData.push(result);
        });
        if (process.env.NODE_ENV === 'development') {
          console.log(tableData);
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
    getTitles(data) {
      let titles = {};
      for (let [key, value] of Object.entries(this.titleKeys)) {
        Object.defineProperty(titles, key, {
          value: {
            name: this.data.columns[value] ? data[value] : '',
            props: this.data.columns[value]
              ? this.getColumnParams(this.data.columns[value], data)
              : {}
          },
          writable: true
        });
      }
      return titles;
    },
    getBody(data) {
      let body = {};
      this.dataKeys.forEach(column => {
        body[data[column]] = this.getColumnParams(
          this.data.columns[column],
          data
        );
      });
      return body;
    },
    getColumnParams(column, data) {
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
