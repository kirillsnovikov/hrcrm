<template>
  <div id="app">
    <!-- <s-card :data="cardData"></s-card> -->
    <!-- <el-badge :value="8" class="item" type="success">
      <el-button type="primary">Default</el-button>
    </el-badge>-->
    <s-table :data="tableData"></s-table>
    <!-- <selection :data="candidatesData"></selection> -->
    <!-- <stage-view :stages="stagesUpdate" :data="stageData"></stage-view> -->
    <!-- <stage-create
      :stages="stagesCreate"
      :data="stageData"
      :detail="stagesUpdate"
    ></stage-create>-->
  </div>
</template>

<script>
// import StageCreate from 'Parts/Stage/Create';
// import StageView from 'Parts/Stage/View';
// import Selection from 'Parts/Candidate/Selection';
import STable from 'Parts/Table/STable';
// import SCard from 'Parts/Card/SCard';
import candidatesData from 'Parts/Candidate/candidatesMock2';
import stagesUpdate from 'Parts/Stage/stageUpdateMock';
import stagesCreate from 'Parts/Stage/stageCreateMock';
import stageData from 'Parts/Stage/stageDataMock';
import tableData from 'Parts/Table/mockTable3';
import cardData from 'Parts/Card/mockCard';

export default {
  components: {
    // StageCreate
    // StageView,
    // Selection
    // SCard,
    STable
  },
  data() {
    return {
      tableData: tableData,
      stageData: stageData,
      cardData: cardData,
      stagesUpdate: stagesUpdate,
      stagesCreate: stagesCreate,
      candidatesData: candidatesData,
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
    let data = [
      { NAME: 'Alex', AGE: 20 },
      { NAME: 'Bob', AGE: 25 },
      { NAME: 'John', AGE: 30 }
    ];
    let cols = {
      NAME: {
        a: 1,
        b: 2,
        c: 3
      },
      AGE: {
        d: 5,
        e: 6,
        f: 7,
        g: 8
      }
    };

    let result = [];

    data.forEach(item => {
      console.log(item);
      Object.keys(cols).forEach(col => {
        let params = {};
        Object.keys(cols[col]).forEach(colParam => {
          params[colParam] = cols[col][colParam];
          params['test'] = item[col];
        });
        result.push(params);
      });
    });

    console.log(result);
    // const data;
    // this.$axios
    //   .get('https://jsonplaceholder.typicode.com/todos')
    //   .then(response => {
    //     this.tableData = response.data;
    //   })
    //   .catch(e => console.error(e));
  }
};
</script>
