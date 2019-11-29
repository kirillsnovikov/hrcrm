<template>
  <section class="candidate-sel">
    <div class="stages-panel candidate-sel__header">
      <label
        class="stages-panel__item"
        :style="stageStyle(stage)"
        @click="stageFilter"
        v-for="(stage, i) in currentStages"
        :key="`${stage.name}_${i}`"
      >
        {{ stage.name }}
        <input
          type="checkbox"
          v-model="selectStageItems"
          :value="stage.name"
          class="stages-panel__input"
        />
      </label>
    </div>
    <candidate-list
      class="candidate-sel__main"
      :candidates="selectCandidates"
    ></candidate-list>
    <div class="vacancy-select candidate-sel__sidebar">
      <el-radio
        class="vacancy-select__item"
        v-model="currentVacancy"
        :label="i"
        v-for="(vacancy, i) in data.vacancies"
        :key="`${vacancy.name}_${i}`"
        >{{ vacancy.name }}</el-radio
      >
    </div>
  </section>
</template>

<script>
import CandidateList from 'Parts/Candidate/List';

export default {
  props: {
    data: Object
  },
  components: {
    CandidateList
  },
  data() {
    return {
      selectStageItems: [],
      currentVacancy: 0
    };
  },
  computed: {
    selectCandidates() {
      return this.data.vacancies[this.currentVacancy].candidates;
    },
    currentStages() {
      return this.data.vacancies[this.currentVacancy].stages;
    }
  },
  methods: {
    stageFilter() {},
    stageStyle(stage) {
      // console.log(stage);
      let style = {
        color: stage.color
      };
      if (
        this.selectStageItems.find(item => item === stage.name) !== undefined
      ) {
        console.log(stage.color);
        style.background = stage.color;
        style.color = '#ffffff';
      }
      return style;
    }
  }
};
</script>
