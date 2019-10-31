<template>
  <div id="app">
    <s-table :data="tableData"></s-table>
  </div>
</template>

<script>
import STable from 'Parts/Table/STable';
import tableData from 'Parts/Table/mockTable';
export default {
  components: {
    STable
  },
  data() {
    return {
      tableData: tableData
    };
  }
};
</script>
