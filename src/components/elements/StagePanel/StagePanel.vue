<template>
  <div class="stages-panel">
    <label
      class="stages-panel__item"
      :style="stage.style"
      v-for="(stage, i) in getStages"
      :key="`${stage.name}_${i}`"
    >
      <span class="stages-panel__label">{{ stage.name }}</span>
      <input
        type="checkbox"
        v-model="selectStageItems"
        :value="`${currentVacancy}_${stage.name}`"
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
    currentVacancy: {
      type: Number
    }
  },
  data() {
    return {
      selectStageItems: [],
      panelWidth: 0
    };
  },
  watch: {
    selectStageItems(newVal) {
      this.$emit('selectStage', newVal);
    }
  },
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
          this.selectStageItems.find(
            item => item === `${this.currentVacancy}_${stage.name}`
          ) !== undefined
        ) {
          style.background = stage.color;
          style.color = '#ffffff';
        }
        stage['style'] = style;
      });
      // console.log(this.stages);
      return this.stages;
    },
    stageWidth() {
      // if (this.$el) {
      // console.log('this.el');
      // }
      // console.log(this.panelWidth / this.stages.length);
      return this.panelWidth / Object.keys(this.stages).length + 'px';
    }
  }
};
</script>
