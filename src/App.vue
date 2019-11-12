<template>
  <div id="app">
    <el-badge :value="8" class="item" type="success">
      <el-button type="primary">Default</el-button>
    </el-badge>
    <s-table :data="tableData"></s-table>
  </div>
</template>

<script>
import STable from 'Parts/Table/STable';
import tableData from 'Parts/Table/mockTable3';

export default {
  components: {
    STable
  },
  data() {
    return {
      tableData: tableData,
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      value1: []
    };
  },
  mounted() {
    // const data;
    // this.$axios
    //   .get('https://jsonplaceholder.typicode.com/todos')
    //   .then(response => {
    //     this.tableData = response.data;
    //     console.log(this.tableData);
    //   })
    //   .catch(e => console.error(e));
  },
  methods: {
    clickBtn() {
      // console.log(e);
    }
  }
};
</script>
