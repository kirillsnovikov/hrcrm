<template>
  <div class="stages-panel">
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
        v-model="stageItems"
        :value="`${currentVacancy}_${stage.id}_${stage.name}`"
        class="stages-panel__input"
      />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    stages: {
      type: [Object, Array]
    },
    selectStageItems: {
      type: Array
    },
    currentVacancy: {
      type: String
    }
  },
  data() {
    return {
      stageItems: this.selectStageItems,
      panelWidth: 0
    };
  },
  // watch: {
  //   selectStageItems(newVal) {
  //     this.$emit('selectStages', newVal);
  //   }
  // },
  // created() {
  //   this.$eventHub.$on('resetStagePanel', this.reset())
  // },
  mounted() {
    this.panelWidth = this.$el.offsetWidth;
  },
  computed: {
    getStages() {
      Object.values(this.stages).forEach(stage => {
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
      });
      return this.stages;
    },
    stageWidth() {
      return this.panelWidth / Object.keys(this.stages).length + 'px';
    }
  }
};
</script>
