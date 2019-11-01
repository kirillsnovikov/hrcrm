<template>
  <div id="app">
    <!-- <s-table :data="tableData"></s-table> -->
    <s-button @click="clickBtn">Применить</s-button>
    <div @click="clickBtn"></div>
  </div>
</template>

<script>
import SButton from 'Elements/Button/SButton';
// import STable from 'Parts/Table/STable';
// import tableData from 'Parts/Table/mockTable';
export default {
  components: {
    SButton
  },
  data() {
    return {
      tableData: null
    };
  },
  mounted() {
    // const data;
    this.$axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        this.tableData = response.data;
        // console.log(response.data);
        // return response;
        console.log(this.tableData);
      })
      .catch(e => console.error(e));
  },
  methods: {
    clickBtn(e) {
      console.log(e);
      // this.$eventHub.$on('click-btn', true);
    }
  }
};
</script>
