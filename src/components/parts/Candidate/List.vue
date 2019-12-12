<template>
  <section class="candidate-list">
    <candidate-item
      v-for="(candidate, i) in candidates"
      :key="`_${i}`"
      :candidate="candidate"
      :mod="mod"
    ></candidate-item>
  </section>
</template>

<script>
import CandidateItem from 'Parts/Candidate/Item';

export default {
  props: {
    candidates: {
      type: Array
    },
    mod: {
      type: Object
    }
  },
  components: {
    CandidateItem
  }
};
</script>
