<template>
  <div id="app">
    <!-- <s-card :data="cardData"></s-card> -->
    <!-- <el-badge :value="8" class="item" type="success">
      <el-button type="primary">Default</el-button>
    </el-badge> -->
    <!-- <s-table :data="tableData"></s-table> -->
    <!-- <selection :data="candidatesData"></selection> -->
    <candidate-view
      :candidates-data="candidatesData"
      :data="cardData"
    ></candidate-view>
    <!-- <stage-view :stages="stagesUpdate" :data="stageData"></stage-view> -->
    <!-- <stage-create
      :stages="stagesCreate"
      :data="stageData"
      :detail="stagesUpdate"
    ></stage-create> -->
  </div>
</template>

<script>
// import StageCreate from 'Parts/Stage/Create';
// import StageView from 'Parts/Stage/View';
// import Selection from 'Parts/Candidate/CandidateSelection';
// import STable from 'Parts/Table/STable';
// import SCard from 'Parts/Card/SCard';
import CandidateView from 'Parts/Candidate/CandidateView';
import candidatesData from 'Parts/Candidate/candidatesMock2';
import stagesUpdate from 'Parts/Stage/stageUpdateMock';
import stagesCreate from 'Parts/Stage/stageCreateMock';
import stageData from 'Parts/Stage/stageDataMock';
import tableData from 'Parts/Table/mockTable3';
import cardData from 'Parts/Card/mockCard';

export default {
  components: {
    // StageCreate,
    // StageView,
    // Selection,
    // SCard,
    // STable,
    CandidateView
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
