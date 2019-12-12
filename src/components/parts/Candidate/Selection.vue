<template>
  <section class="candidate-sel">
    <stage-panel
      @selectStage="select"
      :currentVacancy="currentVacancy"
      :stages="currentStages"
      class="candidate-sel__stages-panel"
    ></stage-panel>
    <candidate-list
      class="candidate-sel__main"
      :candidates="candidates"
      :mod="data.mod"
    ></candidate-list>
    <div class="vacancy-select candidate-sel__sidebar">
      <el-radio
        class="vacancy-select__item"
        v-model="currentVacancy"
        :label="i"
        v-for="(vacancy, i) in data.data"
        :key="`${vacancy.name_id}_${i}`"
        >{{ vacancy.name_id }}</el-radio
      >
    </div>
  </section>
</template>

<script>
import StagePanel from 'Elements/StagePanel/StagePanel';
import CandidateList from 'Parts/Candidate/List';
import { uniq } from '@/utils/helpers';

export default {
  props: {
    data: Object
  },
  components: {
    StagePanel,
    CandidateList
  },
  data() {
    return {
      selectStageItems: [],
      currentVacancy: 0
    };
  },
  computed: {
    selectVacancies() {
      return this.data.data[this.currentVacancy];
    },
    currentStages() {
      return this.selectVacancies.stages;
    },
    candidates() {
      let vacancy = this.selectVacancies;
      let stages = Object.values(vacancy.stages);
      // console.log('stages', stages);
      let candidatesIds = this.getCandidateIds(stages, this.selectStageItems);

      let filteredCandidates = this.selectCandidatesByIds(
        vacancy.candidates,
        candidatesIds
      );
      // console.log(filteredCandidates);
      filteredCandidates.map(candidate => {
        candidate['vacancy'] = vacancy.name_id;
        candidate['stage'] = stages.find(stage => {
          // console.log('11', stage.candidates_ids);
          if (stage.candidates_ids) {
            return stage.candidates_ids.find(id => {
              return id === candidate.id.value;
            });
          }
        });
      });
      // console.log(filteredCandidates);
      return filteredCandidates;
    }
  },
  methods: {
    select(data) {
      this.selectStageItems = data;
    },
    getCandidateIds(stages, selectStages) {
      let ids = [];
      stages.forEach(stage => {
        selectStages.forEach(selectStageItem => {
          if (
            stage.name ===
            selectStageItem.replace(`${this.currentVacancy}_`, '')
          ) {
            ids = ids.concat(stage.candidates_ids);
          }
        });
      });
      return uniq(ids);
    },
    selectCandidatesByIds(candidates, ids) {
      let res = [];
      ids.forEach(id => {
        let candidate = candidates
          ? candidates.find(candidate => id === candidate.id.value)
          : false;
        if (candidate) {
          res.push(candidate);
        }
      });
      return res;
    }
  }
};
</script>
