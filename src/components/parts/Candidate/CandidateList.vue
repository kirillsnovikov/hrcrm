<template>
  <section class="candidate-list">
    <candidate-list-item
      v-for="(candidate, i) in candidates"
      :key="`_${i}`"
      :candidate="candidate"
      :mod="mod"
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
    }
  },
  components: {
    CandidateListItem
  },
  mounted() {
    console.log(this.candidates);
  }
};
</script>
