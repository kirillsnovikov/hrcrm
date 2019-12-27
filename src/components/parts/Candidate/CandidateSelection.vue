<template>
  <section class="candidate-sel">
    <div class="stages-panel candidate-sel__stages-panel">
      <label
        class="stages-panel__item"
        :style="stage.style"
        v-for="(stage, i) in getStages"
        :key="`${stage.name}_${i}`"
      >
        <el-tooltip :content="stage.name" placement="top-start">
          <span class="stages-panel__label">{{ stage.name }}</span>
        </el-tooltip>
        <el-tag size="mini">{{ stage.count }}</el-tag>
        <input
          type="checkbox"
          v-model="selectStageItems"
          :value="`${currentVacancy}_${stage.id}_${stage.name}`"
          class="stages-panel__input"
        />
      </label>
    </div>
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
      <div class="vacancy-select__actions">
        <!-- <el-tooltip :content="'Выбрать все'" placement="top-start"> -->
        <el-button
          size="small"
          class="vacancy-select__actions-item"
          @click="selectAll"
          >Выбрать</el-button
        >
        <!-- </el-tooltip> -->
        <el-button
          size="small"
          class="vacancy-select__actions-item"
          @click="resetAll"
          >Очистить</el-button
        >
      </div>
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
import { uniq } from '@/utils/helpers';
import CandidateList from 'Parts/Candidate/CandidateList';

export default {
  props: {
    data: Object
  },
  data() {
    return {
      vacancies: [],
      selectStageItems: [],
      currentVacancy: '',
      panelWidth: 0
    };
  },
  created() {
    this.vacancies = this.data.data;
    this.currentVacancy = this.vacancies[0].id;
    this.vacancies.forEach(vacancy => {
      this.selectStageItems = this.selectStageItems.concat(
        Object.values(vacancy.stages).map(
          stage => `${vacancy.id}_${stage.id}_${stage.name}`
        )
      );
      vacancy['candidatesCount'] = vacancy.candidates
        ? vacancy.candidates.length
        : 0;
    });
  },
  mounted() {
    this.panelWidth = this.$el.offsetWidth;
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
      let candidatesIds = this.getCandidateIds(stages, this.selectStageItems);
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
    },
    getStages() {
      let stages = [];
      Object.values(this.currentStages).forEach(stage => {
        let style = {
          color: stage.color,
          width: this.stageWidth
        };
        if (
          this.selectStageItems.find(item => {
            return item === `${this.currentVacancy}_${stage.id}_${stage.name}`;
          }) !== undefined
        ) {
          style.background = stage.color;
          style.color = '#ffffff';
        }
        stage['style'] = style;
        stage['count'] = stage.candidates_ids
          ? `${stage.candidates_ids.length}`
          : '0';
        stages.push(stage);
      });
      return stages;
    },
    stageWidth() {
      return this.panelWidth / Object.keys(this.currentStages).length + 'px';
    }
  },
  methods: {
    getCandidateIds(stages, selectStageItems) {
      let ids = [];
      stages.forEach(stage => {
        selectStageItems.forEach(selectStageItem => {
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
    },
    resetAll() {
      this.selectStageItems = this.selectStageItems.filter(stage => {
        return (
          this.getStages
            .map(
              currStage =>
                `${this.currentVacancy}_${currStage.id}_${currStage.name}`
            )
            .indexOf(stage) === -1
        );
      });
    },
    selectAll() {
      this.getStages.forEach(stage => {
        this.selectStageItems.push(
          `${this.currentVacancy}_${stage.id}_${stage.name}`
        );
      });
    }
  },
  components: {
    CandidateList
  }
};
</script>
