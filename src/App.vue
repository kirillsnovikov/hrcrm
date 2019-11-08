<template>
  <div id="app">
    <div class="test">
      <s-button @click="clickBtn" empty>Применить</s-button>
    </div>
    <s-table :data="tableData"></s-table>
    <!-- <s-badge :color="'success'" empty disabled>123</s-badge>
    <s-badge :color="'danger'" empty>123</s-badge>
    <s-badge :color="'info'" empty>123</s-badge>
    <s-badge :color="'dark'" empty>123</s-badge>
    <s-badge :color="'success'">123</s-badge>
    <s-badge :color="'danger'">123</s-badge>
    <s-badge :color="'info'" round disabled>123</s-badge>
    <div @click="clickBtn"></div>-->
  </div>
</template>

<script>
import SButton from 'Elements/Button/SButton';
// import SBadge from 'Elements/Badge/SBadge';
import STable from 'Parts/Table/STable';
import tableData from 'Parts/Table/mockTable3';
export default {
  components: {
    SButton,
    // SBadge,
    STable
  },
  data() {
    return {
      tableData: tableData
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
