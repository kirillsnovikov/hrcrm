<template>
  <section class="s-card">
    <div class="s-card__title">{{ 'TITLE' }}</div>
    <s-table-item :type="'card'" :data="data" :wide="true" :id="data.id.value"></s-table-item>
  </section>
</template>

<script>
import STableItem from 'Parts/Table/STableItem';
export default {
  components: {
    STableItem
  },
  props: {
    data: {
      type: Object
    }
  }
};
</script>
