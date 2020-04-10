<template>
  <section class="candidate-list">
    <candidate-list-item
      v-for="(candidate, i) in candidates"
      :key="`_${i}`"
      :stages="stages"
      :candidate="candidate"
      :mod="mod"
      @set-stage="selectStage"
      :is-offer="isOffer"
      :is-preparation="isPreparation"
    ></candidate-list-item>
  </section>
</template>

<script>
import CandidateListItem from 'Parts/Candidate/CandidateListItem';

export default {
  props: {
    candidates: {
      type: Array
    },
    mod: {
      type: Object
    },
    stages: {
      type: [Object, Array]
    },
    isOffer: {
      type: Function
    },
    isPreparation: {
      type: Function
    }
  },
  components: {
    CandidateListItem
  },
  methods: {
    selectStage(stage, currentStage, candidateId) {
      this.$emit('set-stage', stage, currentStage, candidateId);
    }
  }
};
</script>
