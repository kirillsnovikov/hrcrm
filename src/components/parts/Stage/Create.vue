<template>
  <section class="stage-form">
    <div class="hr-title stage-form__hr-title">
      {{ data.name.value || 'Новый шаблон' }}
    </div>
    <div class="stage-form__buttons">
      <el-button type="primary" @click="onSubmit">Сохранить</el-button>
      <el-button>Закрыть</el-button>
    </div>
    <div class="stage-form__inputs">
      <label class="hr-input stage-form__input">
        <span class="hr-input__label">Наименование</span>
        <el-input
          class="hr-input__input"
          label="Option A"
          maxlength="35"
          show-word-limit
          v-model="name"
        ></el-input>
      </label>
      <label class="hr-checkbox stage-form__input">
        <span class="hr-checkbox__label">Основной шаблон</span>
        <el-checkbox v-model="mainTemplate"></el-checkbox>
      </label>
      <label class="hr-checkbox stage-form__input">
        <span class="hr-checkbox__label">Общий доступ</span>
        <el-checkbox v-model="generalAccess"></el-checkbox>
      </label>
    </div>
    <div class="stage-form__dnd">
      <div class="stage-form__dnd-left">
        <div class="stage-form__title">Неиспользуемые этапы</div>
        <draggable class="stage-list" group="stages" :list="getStages">
          <div
            class="stage-list__item"
            v-for="(stage, i) in getStages"
            :key="`${stage.name}_${i}`"
            :style="{ background: stage.color }"
          >
            {{ stage.name }}
          </div>
        </draggable>
      </div>
      <div class="stage-form__dnd-right">
        <div class="stage-form__title">Используемые этапы</div>
        <div
          class="stage-list__item"
          v-for="(stage, i) in topStages"
          :key="`${stage.name}_${i}`"
          :style="{ background: stage.color }"
        >
          {{ stage.name }}
        </div>
        <draggable
          class="stage-list stage-list_pos_right"
          group="stages"
          :list="customStages"
          :style="{ height: stageHeight + 'px' }"
        >
          <div
            class="stage-list__item"
            v-for="(stage, i) in customStages"
            :key="`${stage.name}_${i}`"
            :style="{ background: stage.color }"
          >
            {{ stage.name }}
          </div>
        </draggable>
        <div
          class="stage-list__item"
          v-for="(stage, i) in bottomStages"
          :key="`${stage.name}_${i}`"
          :style="{ background: stage.color }"
        >
          {{ stage.name }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  props: {
    data: {
      type: Object
    },
    stages: {
      type: Array
    }
  },
  data() {
    return {
      name: null,
      mainTemplate: null,
      generalAccess: null,
      stageHeight: null,
      customStages: [],
      allSelectStages: [],
      postData: {}
    };
  },
  mounted() {
    this.stageHeight = document.querySelector(
      '.stage-form__dnd-left .stage-list'
    ).offsetHeight;
  },
  computed: {
    getStages() {
      let stages = this.stages.filter(
        stage => stage.required_position === null
      );
      return stages;
    },
    topStages() {
      let stages = this.stages.filter(
        stage => stage.required_position === 'required_top'
      );
      stages.sort((prev, next) => prev.position_sort - next.position_sort);
      return stages;
    },
    bottomStages() {
      let stages = this.stages.filter(
        stage => stage.required_position === 'required_bottom'
      );
      stages.sort((prev, next) => prev.position_sort - next.position_sort);
      return stages;
    },
    selectStages() {
      let stages = this.handleStages(
        this.topStages.concat(this.customStages, this.bottomStages)
      );
      return stages;
    }
  },
  methods: {
    onSubmit() {
      Object.defineProperties(this.postData, {
        record: {
          value: this.data.id.value,
          writable: true
        },
        select_stage_data: {
          value: this.selectStages,
          writable: true
        },
        assigned_user_name: {
          value: this.data.assigned_user_name.value,
          writable: true
        },
        assigned_user_id: {
          value: this.data.assigned_user_id.value,
          writable: true
        },
        general_access: {
          value: this.generalAccess ? 1 : 0,
          writable: true
        },
        main_template: {
          value: this.mainTemplate ? 1 : 0,
          writable: true
        }
      });
      this.$axios
        .post(
          'http://crmfront/index.php?module=STAGE_Templates&action=custom_save',
          this.postData
        )
        .then(res => console.log(res));

      //   this.$axios
      //     .post('https://reqres.in/api/users', this.postData)
      //     .then(res => console.log(res));

      console.log(this.postData);
    },
    handleStages(stages) {
      //   console.log(stages);
      let handleStages = [];
      stages.forEach((stage, key) => {
        handleStages.push({
          id: stage.id,
          sort: key
        });
      });
      return handleStages;
    }
  }
};
</script>
