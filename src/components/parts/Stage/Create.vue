<template>
  <section class="stage-form">
    <div class="hr-title stage-form__hr-title">
      {{ data.name.value || 'Новый шаблон' }}
    </div>
    <div class="inline-buttons stage-form__inline-buttons">
      <el-button
        class="inline-buttons__btn"
        type="primary"
        :disabled="checkError"
        :icon="okLoadIcon"
        @click="onSubmit"
        >Сохранить</el-button
      >
      <a class="inline-buttons__btn" href="/index.php?module=STAGE_Templates">
        <el-button>Закрыть</el-button>
      </a>
    </div>
    <div class="stage-form__inputs">
      <label class="hr-input stage-form__input">
        <span class="hr-input__label">Наименование</span>
        <div class="hr-input__input">
          <el-input
            label="Option A"
            maxlength="35"
            show-word-limit
            v-model="name"
            append="sdfsdffd"
          ></el-input>
          <!-- <span v-if="checkError && name.length === 0" class="hr-input__error"
            >Обязательное поле</span
          >-->
        </div>
      </label>
      <label class="hr-checkbox stage-form__input">
        <span class="hr-checkbox__label">Основной шаблон</span>
        <el-checkbox
          v-model="mainTemplate"
          :checked="mainTemplate === '1'"
        ></el-checkbox>
      </label>
      <label class="hr-checkbox stage-form__input">
        <span class="hr-checkbox__label">Общий доступ</span>
        <el-checkbox
          v-model="generalAccess"
          :checked="generalAccess === '1'"
        ></el-checkbox>
      </label>
    </div>
    <div class="stage-form__dnd">
      <div class="stage-form__dnd-left">
        <div class="stage-form__title">Неиспользуемые этапы</div>
        <draggable class="stage-list" group="stages" :list="listStages">
          <div
            class="stage-list__item"
            v-for="(stage, i) in listStages"
            :key="`${stage.name}_${i}`"
            :style="{ background: stage.color }"
          >
            {{ stage.name }}
          </div>
        </draggable>
      </div>
      <div class="stage-form__dnd-right">
        <div class="stage-form__title">Используемые этапы</div>
        <div class="stage-list">
          <div
            class="stage-list__item stage-list__item_fixed"
            v-for="(stage, i) in topStages"
            :key="`${stage.name}_${i}`"
            :style="{ background: stage.color }"
          >
            <i class="el-icon-circle-check"></i>
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
            class="stage-list__item stage-list__item_fixed"
            v-for="(stage, i) in bottomStages"
            :key="`${stage.name}_${i}`"
            :style="{ background: stage.color }"
          >
            <i class="el-icon-circle-check"></i>
            {{ stage.name }}
          </div>
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
    },
    detail: {
      type: Array
    }
  },
  data() {
    return {
      name: this.data.name.value || '',
      nameError: false,
      isStartPost: false,
      okLoadIcon: '',
      mainTemplate:
        this.data.main_template.value || this.data.main_template.default,
      generalAccess:
        this.data.general_access.value || this.data.general_access.default,
      stageHeight: null,
      listStages: [],
      customStages: [],
      allSelectStages: [],
      postData: {}
    };
  },
  mounted() {
    this.defineStages();
  },
  computed: {
    detailStages() {
      let stages = this.detail.filter(
        stage => stage.required_position === null
      );
      if (stages.length > 0) {
        stages.sort((prev, next) => prev.sort - next.sort);
      } else {
        stages = [];
      }
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
    },
    checkError() {
      return this.name ? false : true;
    }
  },
  methods: {
    onSubmit() {
      if (this.isStartPost) {
        return;
      }
      this.isStartPost = true;
      this.okLoadIcon = 'el-icon-loading';
      Object.defineProperties(this.postData, {
        name: {
          value: this.name,
          writable: true,
          enumerable: true
        },
        record: {
          value: this.data.id.value,
          writable: true,
          enumerable: true
        },
        select_stage_data: {
          value: this.selectStages,
          writable: true,
          enumerable: true
        },
        assigned_user_name: {
          value: this.data.assigned_user_name.value,
          writable: true,
          enumerable: true
        },
        assigned_user_id: {
          value: this.data.assigned_user_id.value,
          writable: true,
          enumerable: true
        },
        general_access: {
          value: this.generalAccess ? 1 : 0,
          writable: true,
          enumerable: true
        },
        main_template: {
          value: this.mainTemplate ? 1 : 0,
          writable: true,
          enumerable: true
        }
      });

      this.$axios
        .post(
          '/index.php?module=STAGE_Templates&action=custom_save&to_pdf=true' +
            '&data=' +
            JSON.stringify(this.postData),
          {}
        )
        .then(res => {
          if (res.statusText === 'OK') {
            this.okLoadIcon = 'el-icon-check';
            location = '/index.php?module=STAGE_Templates';
          }
        });
    },
    handleStages(stages) {
      let handleStages = [];
      stages.forEach((stage, key) => {
        handleStages.push({
          id: stage.id,
          sort: key + 1
        });
      });
      return handleStages;
    },
    defineStages() {
      this.customStages = this.detailStages;
      let stages = this.stages.filter(
        stage => stage.required_position === null
      );
      let cnt = stages.length;
      stages = stages.filter(stage => {
        return (
          this.customStages.map(custom => custom.id).indexOf(stage.id) === -1
        );
      });
      this.listStages = stages;
      setTimeout(() => {
        let stageEl = document.querySelector('.stage-list__item');
        this.stageHeight = (stageEl.offsetHeight + 8) * cnt + 8;
      }, 0);
    }
  }
};
</script>
