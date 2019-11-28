<template>
  <section class="candidate-sel">
    <div class="stages-panel">
      <label
        class="stages-panel__item"
        :style="stageStyle(i)"
        @click="stageFilter"
        v-for="(stage, i) in data.stages"
        :key="`${stage.name}_${i}`"
      >
        {{ stage.name }}
        <input
          type="checkbox"
          v-model="stageItems"
          :value="i"
          class="stages-panel__input"
        />
      </label>
    </div>
    {{ stageItems }}
  </section>
</template>

<script>
// import { hexToRgba } from '@/utils/helpers';

export default {
  props: {
    data: Object
  },
  data() {
    return {
      stageItems: []
    };
  },
  computed: {
    // stageStyle(e) {
    //   console.log(e);
    //   return {
    //     // background:
    //   };
    // }
  },
  methods: {
    stageFilter() {},
    stageStyle(i) {
      let style = {};
      if (this.stageItems.find(item => item === i) !== undefined) {
        console.log(this.data.stages[i].color);
        style.background = this.data.stages[i].color;
        style.color = '#ffffff';
      }
      return style;
    }
  }
};
</script>
