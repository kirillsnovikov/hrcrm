<template>
  <section class="candidate-sel">
    <stage-panel
      @selectStages="select"
      :stages="currentStages"
      :selectStageItems="selectStages"
      :currentVacancy="currentVacancy"
      class="candidate-sel__stages-panel"
    ></stage-panel>
    <candidate-list
      v-if="candidates.length > 0"
      class="candidate-sel__main"
      :candidates="candidates"
      :mod="data.mod"
    ></candidate-list>
    <el-tag v-else :type="'warning'" effect="dark">
      {{ 'Нет кандидатов по заданным параметрам' }}
    </el-tag>
    <div class="vacancy-select candidate-sel__sidebar">
      <el-radio
        class="vacancy-select__item"
        v-model="currentVacancy"
        :label="vacancy.id"
        v-for="(vacancy, i) in vacancies"
        :key="`${vacancy.name_id}_${i}`"
      >
        <span>{{ vacancy.name_id }}</span>
        <el-tag size="mini">{{ vacancy.candidatesCount }}</el-tag>
      </el-radio>
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
      vacancies: [],
      selectStages: [],
      currentVacancy: ''
    };
  },
  created() {
    this.vacancies = this.data.data;
    this.currentVacancy = this.vacancies[0].id;
    this.vacancies.forEach(vacancy => {
      this.selectStages = this.selectStages.concat(
        Object.values(vacancy.stages).map(
          stage => `${vacancy.id}_${stage.id}_${stage.name}`
        )
      );
      vacancy['candidatesCount'] = vacancy.candidates
        ? vacancy.candidates.length
        : 0;
    });
  },
  computed: {
    selectVacancies() {
      return this.vacancies.find(vacancy => this.currentVacancy === vacancy.id);
    },
    currentStages() {
      return this.selectVacancies.stages;
    },
    candidates() {
      let vacancy = this.selectVacancies;
      let stages = Object.values(vacancy.stages);
      let candidatesIds = this.getCandidateIds(stages, this.selectStages);
      let filteredCandidates = this.selectCandidatesByIds(
        vacancy.candidates,
        candidatesIds
      );
      filteredCandidates.map(candidate => {
        candidate['vacancy'] = vacancy.name_id;
        candidate['stage'] = stages.find(stage => {
          if (stage.candidates_ids) {
            return stage.candidates_ids.find(id => {
              return id === candidate.id.value;
            });
          }
        });
      });
      return filteredCandidates;
    }
  },
  methods: {
    select(data) {
      this.selectStages = data;
    },
    getCandidateIds(stages, selectStages) {
      let ids = [];
      stages.forEach(stage => {
        selectStages.forEach(selectStageItem => {
          if (
            stage.name ===
            selectStageItem.replace(`${this.currentVacancy}_${stage.id}_`, '')
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
