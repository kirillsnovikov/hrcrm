<template>
  <section class="stage-view">
    <div class="hr-title stage-view__hr-title">{{ data.name.value }}</div>
    <div class="stage-view__body">
      <div class="inline-buttons">
        <a
          class="inline-buttons__btn"
          :href="
          `/index.php?module=STAGE_Templates&action=EditView&record=${data.id.value}`
        "
        >
          <el-button type="primary">Править</el-button>
        </a>
        <el-button class="inline-buttons__btn" type="success" disabled>Дублировать</el-button>
        <el-button type="danger" disabled class="inline-buttons__btn">Удалить</el-button>
        <a href="/index.php?module=STAGE_Templates" class="inline-buttons__btn">
          <el-button>Закрыть</el-button>
        </a>
      </div>
      <div class="stage-view__check">
        <div class="stage-view__check-item">
          <span>Основной шаблон</span>
          <i class="el-icon-check stage-view__check-icon" v-if="data.main_template.value === '1'"></i>
        </div>
        <div class="stage-view__check-item">
          <span>Общий доступ</span>
          <i class="el-icon-check stage-view__check-icon" v-if="data.general_access.value === '1'"></i>
        </div>
      </div>
      <div class="stage-list stage-view__stage-list">
        <div
          class="stage-list__item"
          v-for="(stage, i) in sortStages"
          :style="{ background: stage.color }"
          :key="`${stage.name}_${i}`"
        >
          <i class="el-icon-circle-check"></i>
          {{ stage.name }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    stages: {
      type: Array
    },
    data: {
      type: Object
    }
  },
  computed: {
    sortStages() {
      let stages = this.stages;
      stages.sort((prev, next) => prev.sort - next.sort);
      return stages;
    }
  }
};
</script>
