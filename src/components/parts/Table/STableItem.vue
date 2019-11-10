<template>
  <section class="s-table-item">
    <div class="s-table-item__left">
      <div class="s-table-item__title s-table-item__left__s-table-item__title">
        <s-link :type="'underline'" :activeColor="'dark'" target>{{ data.header.title.name }}</s-link>
      </div>
      <s-link
        class="s-table-item__location s-table-item__left__s-table-item__location"
        :type="'underline'"
        :activeColor="'dark'"
        target
      >{{ data.header.location.name }}</s-link>
      <s-badge
        v-if="data.header.status.name"
        class="s-table-item__status s-table-item__left__s-table-item__status"
        :color="colorStatus === 'white' ? 'dark' : colorStatus"
        :empty="colorStatus === 'white'"
      >{{ data.header.status.name }}</s-badge>
    </div>
    <div class="s-table-item__main">
      <div
        class="s-table-item__value s-table-item__main__s-table-item__value"
        v-for="(item, k) in data.body"
        :key="`${k + item}`"
      >
        <span
          class="s-table-item__value-label s-table-item__value__s-table-item__value-label dark-color"
        >{{ item.label }}</span>
        <span class="s-table-item__value-name">
          <s-link target>{{ k }}</s-link>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import SLink from 'Elements/Link/SLink.vue';
import SBadge from 'Elements/Badge/SBadge.vue';
const statuses = {
  Открыта: 'success',
  Отменена: 'dark',
  'На паузе': 'alert',
  Закрыта: 'info',
  Новая: 'white'
};
export default {
  components: {
    SLink,
    SBadge
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    colorStatus() {
      let status = this.data.header.status.name;
      status = Object.keys(statuses).find(i => i === status);
      return statuses[status];
    }
  }
};
</script>
