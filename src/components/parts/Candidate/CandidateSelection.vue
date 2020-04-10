<template>
  <section class="candidate-sel">
    <Dialog
      v-if="selectedStage"
      :is_visible="is_visible.stage_dialog"
      :title="
        `Вы действительно хотите сменить этап подбора на «${selectedStage.stage.name}»?`
      "
      @ok-callback="confirmStageSelect(selectedStage, 'stage_dialog')"
      @cancel-callback="cancelDialogSelect('stage_dialog', 'selectedStage')"
    >
    </Dialog>
    <el-dialog
      v-if="is_visible.rejection_dialog"
      title="Причина отказа"
      :visible.sync="is_visible.rejection_dialog"
      @close="cancelDialogSelect('rejection_dialog', null, 'rejectionForm')"
    >
      <el-form
        ref="rejectionForm"
        :model="rejectionForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Категория отказа" prop="rejection_categories">
          <el-select
            v-model="rejectionForm.rejection_categories"
            filterable
            no-match-text="Нет результатов поиска"
            placeholder=""
          >
            <el-option
              v-for="item in rejection_categories"
              :key="item.ID"
              :label="item.NAME"
              :value="item.ID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Причина отказа" prop="rejection_reasons">
          <el-select
            v-model="rejectionForm.rejection_reasons"
            filterable
            no-match-text="Нет результатов поиска"
            placeholder=""
            :disabled="!rejectionForm.rejection_categories"
          >
            <el-option
              v-for="item in filteredReasons"
              :key="item.ID"
              :label="item.NAME"
              :value="item.ID"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="confirmRejection">
          Сохранить
        </el-button>
        <el-button
          @click="cancelDialogSelect('rejection_dialog', null, 'rejectionForm')"
        >
          Отмена
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-if="is_visible.no_rejection_dialog"
      title="Причина возврата"
      :visible.sync="is_visible.no_rejection_dialog"
      @close="
        cancelDialogSelect('no_rejection_dialog', null, 'cancelRejectionForm')
      "
    >
      <el-form
        ref="cancelRejectionForm"
        :model="cancelRejectionForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item
          label="Причина возврата"
          prop="return_reason"
          :rules="rules.return_reason"
        >
          <el-input
            type="textarea"
            name="return_reason"
            v-model="cancelRejectionForm.return_reason"
            show-word-limit
            maxlength="500"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="confirmCancelRejection">
          Сохранить
        </el-button>
        <el-button
          @click="
            cancelDialogSelect(
              'no_rejection_dialog',
              null,
              'cancelRejectionForm'
            )
          "
        >
          Отмена
        </el-button>
      </span>
    </el-dialog>
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
          v-model="unselectStageItems"
          :value="`${currentVacancyId}_${stage.id}_${stage.name}`"
          class="stages-panel__input"
        />
      </label>
    </div>
    <candidate-list
      v-if="candidates.length > 0"
      class="candidate-sel__main"
      :candidates="candidates"
      :stages="getStages"
      :mod="data.mod"
      @set-stage="selectStage"
      :is-offer="isOffer"
      :is-preparation="isPreparation"
    ></candidate-list>
    <el-tag v-else :type="'warning'" effect="dark">
      {{ 'Нет кандидатов по заданным параметрам' }}
    </el-tag>
    <div class="vacancy-select candidate-sel__sidebar">
      <div class="vacancy-select__actions">
        <el-button
          size="small"
          class="vacancy-select__actions-item"
          @click="selectAll"
          >Выбрать</el-button
        >
        <el-button
          size="small"
          class="vacancy-select__actions-item"
          @click="resetAll"
          >Очистить</el-button
        >
      </div>
      <el-tooltip
        placement="left-start"
        effect="light"
        v-for="(vacancy, i) in vacancies"
        :key="`${vacancy.name_id}_${i}`"
      >
        <div
          slot="content"
          v-html="
            vacancyInfo(vacancy)
              ? `<h5>${vacancy.name_id}</h5>${vacancyInfo(vacancy)}`
              : `<h5>${vacancy.name_id}</h5>`
          "
        ></div>
        <el-radio
          class="vacancy-select__item"
          v-model="currentVacancyId"
          :label="vacancy.id"
          @change="selectFilter"
        >
          <div class="vacancy-select__item_pos_top">
            <span>{{ vacancy.name_id }}</span>
            <el-tag size="mini">{{ vacancy.candidatesCount }}</el-tag>
          </div>
          <div class="vacancy-select__item_pos_bottom">
            <span v-if="vacancy.stack || vacancy.project_link_id">
              {{ vacancyInfo(vacancy) }}
            </span>
          </div>
        </el-radio>
      </el-tooltip>
    </div>
  </section>
</template>

<script>
import { uniq } from '@/utils/helpers';
import CandidateList from 'Parts/Candidate/CandidateList';
import Dialog from 'Elements/Dialog/Dialog';

export default {
  props: {
    data: [Object, Array]
  },
  data() {
    return {
      vacancies: [],
      unselectStageItems: [],
      rejection_reasons: [],
      rejection_categories: [],
      currentVacancyId: '',
      panelWidth: 0,
      is_visible: {
        stage_dialog: false,
        rejection_dialog: false,
        no_rejection_dialog: false
      },
      selectedStage: null, // only for dialog
      rejectionForm: {
        rejection_categories: '',
        rejection_reasons: ''
      },
      cancelRejectionForm: {
        return_reason: ''
      },
      rules: {
        rejection_categories: [
          {
            required: true,
            message: 'Необходимо указать Категорию отказа',
            trigger: 'change'
          }
        ],
        rejection_reasons: [
          {
            required: true,
            message: 'Необходимо указать Причину отказа',
            trigger: 'change'
          }
        ],
        return_reason: [
          {
            required: true,
            message: 'Необходимо указать Причину возврата',
            trigger: ['blur', 'change']
          }
        ]
      }
    };
  },
  mounted() {
    this.panelWidth = this.$el.offsetWidth;
    this.$axios
      .get('index.php', {
        params: {
          module: 'HRPAC_REJECTION_REASONS',
          action: 'Popup',
          hide_clear_button: true,
          mode: 'MultiSelect',
          create: true,
          jsqon_return: 1,
          to_pdf: true
        }
      })
      .then(resp => (this.rejection_reasons = resp.data.data.data))
      .catch(err => console.log('rejection reason loading error', err));
    this.$axios
      .get('index.php', {
        params: {
          module: 'HRPAC_REJECTION_CATEGORIES',
          action: 'Popup',
          hide_clear_button: true,
          mode: 'MultiSelect',
          create: true,
          jsqon_return: 1,
          to_pdf: true
        }
      })
      .then(resp => (this.rejection_categories = resp.data.data.data))
      .catch(err => console.log('rejection category loading error', err));
  },
  created() {
    const filters = localStorage.getItem('filters');
    this.unselectStageItems = filters
      ? JSON.parse(localStorage.filters).stages
      : [];
    this.vacancies = this.data.data.filter(
      vacancy => vacancy.status_id === 'Открыта'
    );
    this.currentVacancyId = filters
      ? JSON.parse(localStorage.filters).currentVacancyId
      : this.vacancies[0].id;

    if (!this.selectVacancies) {
      this.currentVacancyId = this.vacancies[0].id;
    }

    this.vacancies.forEach(vacancy => {
      vacancy['candidatesCount'] = vacancy.candidates
        ? vacancy.candidates.length
        : 0;

      // временный хардкод для этапов
      for (let key in vacancy.stages) {
        switch (key) {
          case 'da56c3d2-4b84-d4f6-9a52-5dca56f7b688':
            // Оффер
            vacancy.stages[key].isOffer = 1;
            break;

          case 'd9d3cffc-8ec0-9ba4-74a9-5dca56460314':
            // Подготовка к выходу
            vacancy.stages[key].isPreparation = 1;
            break;

          case 'c0520b32-f7ea-858b-4ca6-5dca56388157':
            // Принят
            vacancy.stages[key].isAccept = 1;
            break;

          case 'b91e9eba-efd0-7cd6-1c99-5dca5619aaf8':
            // Отказ
            vacancy.stages[key].isRejection = 1;
            break;

          default:
            break;
        }
      }
    });
  },
  computed: {
    selectVacancies() {
      return this.vacancies.find(
        vacancy => this.currentVacancyId === vacancy.id
      );
    },
    currentStages() {
      return this.selectVacancies.stages;
    },
    candidates() {
      let vacancy = this.selectVacancies;
      let stages = Object.values(vacancy.stages);
      let candidatesIds = this.getCandidateIds(stages, this.unselectStageItems);
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
          background: stage.color,
          color: '#ffffff',
          width: this.stageWidth
        };

        if (
          this.unselectStageItems.find(
            item =>
              item === `${this.currentVacancyId}_${stage.id}_${stage.name}`
          ) !== undefined
        ) {
          style.background = '#ffffff';
          style.color = stage.color;
        }

        stage['style'] = style;
        stage['count'] = stage.candidates_ids
          ? `${stage.candidates_ids.length}`
          : '0';
        stages.push(stage);
      });

      const parsed = JSON.stringify({
        currentVacancyId: this.currentVacancyId,
        stages: this.unselectStageItems
      });
      localStorage.setItem('filters', parsed);

      return stages;
    },
    stageWidth() {
      return this.panelWidth / Object.keys(this.currentStages).length + 'px';
    },
    filteredReasons() {
      if (this.rejectionForm.rejection_categories) {
        const category = this.rejection_categories.find(
          it => it.ID === this.rejectionForm.rejection_categories
        );

        return this.rejection_reasons.filter(
          item => item.CATEGORY_ID === category.NAME
        );
      }
      return this.rejection_reasons;
    }
  },
  methods: {
    vacancyInfo(vacancy) {
      let text = vacancy.stack ? vacancy.stack + ', ' : '';
      text += vacancy.project_link_id ? vacancy.project_link_id : '';
      return text;
    },
    getCandidateIds(stages, unselectStages) {
      let ids = [];
      stages.forEach(stage => {
        if (
          !unselectStages.filter(
            stageItem =>
              stage.name ===
              stageItem.replace(`${this.currentVacancyId}_${stage.id}_`, '')
          ).length
        ) {
          ids = ids.concat(stage.candidates_ids);
        }
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
      // res.sort((a, b) =>
      //   b.date_vacancy_candidates_rel.localeCompare(
      //     a.date_vacancy_candidates_rel
      //   )
      // );
      return res;
    },
    resetAll() {
      this.getStages.forEach(stage => {
        this.unselectStageItems.push(
          `${this.currentVacancyId}_${stage.id}_${stage.name}`
        );
      });
    },
    selectAll() {
      this.unselectStageItems = this.unselectStageItems.filter(stage => {
        return (
          this.getStages
            .map(
              currStage =>
                `${this.currentVacancyId}_${currStage.id}_${currStage.name}`
            )
            .indexOf(stage) === -1
        );
      });
    },
    selectFilter() {
      const parsed = JSON.stringify({
        currentVacancyId: this.currentVacancyId,
        stages: this.unselectStageItems
      });
      localStorage.setItem('filters', parsed);
    },
    selectStage(stage, currentStage, candidateId) {
      const { id: currentStageId, isAccept, isRejection } = currentStage;
      const isLimited =
        this.isOffer(stage, currentStage) ||
        this.isPreparation(stage, currentStage);

      if (stage.id !== currentStageId && !isAccept && !isLimited) {
        this.selectedStage = {
          stage,
          candidateId
        };

        if (!isRejection) {
          if (!stage.isRejection) {
            this.is_visible.stage_dialog = true;
          } else {
            if (!isAccept) {
              // отказ
              this.is_visible.rejection_dialog = true;
            }
          }
        } else {
          // возврат отказа
          this.is_visible.no_rejection_dialog = true;
        }
      }
    },
    confirmStageSelect(
      selected,
      dialog,
      rejectionData = null,
      rejectionCancelData = null
    ) {
      console.log(rejectionCancelData, rejectionCancelData);
      if (selected) {
        this.is_visible[dialog] = false;
        const params = {
          module: 'HRPAC_CANDIDATES',
          action: 'selection_stage',
          candidat_id: selected.candidateId,
          vacancy_id: this.currentVacancyId,
          stage_id: selected.stage.id,
          refresh_page: 1
        };
        if (rejectionData) {
          const { rejection_categories, rejection_reasons } = rejectionData;
          params.rejection_categories = rejection_categories;
          params.rejection_reasons = rejection_reasons;
        }
        // if (rejectionCancelData) {
        //   const { return_reason } = rejectionCancelData;
        //   params.return_reason = return_reason;
        // }

        this.$axios
          .get('index.php', {
            params
          })
          .then(() => window.location.reload())
          .catch(err => console.log('stage select error', err));
      }
    },
    cancelDialogSelect(dialog, param = null, formName) {
      this.is_visible[dialog] = false;
      if (param) {
        this[param] = null;
      }

      if (formName) {
        this.$refs[formName].resetFields();
      }
    },
    confirmRejection() {
      this.$refs.rejectionForm.validate(valid => {
        if (valid) {
          this.confirmStageSelect(
            this.selectedStage,
            'rejection_dialog',
            this.rejectionForm
          );
        } else {
          console.log('Заполните обязательные поля!');
        }
      });
    },
    confirmCancelRejection() {
      this.$refs.cancelRejectionForm.validate(valid => {
        if (valid) {
          this.confirmStageSelect(
            this.selectedStage,
            'no_rejection_dialog',
            null,
            this.cancelRejectionForm
          );
        } else {
          console.log('Заполните обязательные поля!');
        }
      });
    },
    isOffer(stage, currentStage) {
      const lessThanOffer =
        !currentStage.isOffer &&
        Number(stage.sort) > Number(currentStage.sort) &&
        !currentStage.isPreparation;

      if (currentStage.isOffer) {
        return stage.isAccept;
      } else if (lessThanOffer || currentStage.isRejection) {
        return stage.isAccept || stage.isPreparation;
      } else {
        return false;
      }
    },
    isPreparation(stage, currentStage) {
      return (
        !!currentStage.isPreparation &&
        !stage.isAccept &&
        Number(stage.sort) > Number(currentStage.sort) &&
        !stage.isRejection
      );
    }
  },
  components: {
    CandidateList,
    Dialog
  }
};
</script>
