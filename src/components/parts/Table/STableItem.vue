<template>
  <section class="s-table-item">
    <div class="s-table-item__left">
      <div class="s-table-item__left__title">
        <div class="s-table-item__left__title__name">
          <s-link :type="'underline'" :activeColor="'dark'" target>
            {{ data.header.title }}
          </s-link>
        </div>
        <s-link
          class="s-table-item__left__title__city"
          :type="'underline'"
          :activeColor="'dark'"
          target
          >{{ data.header.location }}</s-link
        >
      </div>
      <s-badge
        class="s-table-item__left__badge"
        :color="colorStatus === 'white' ? 'dark' : colorStatus"
        :empty="colorStatus === 'white'"
        >{{ data.header.status }}</s-badge
      >
    </div>
    <div class="s-table-item__main">
      <div
        class="s-table-item__main__item"
        v-for="(item, k) in data.body"
        :key="`${k + item}`"
      >
        <span class="s-table-item__main__item__name dark-color">{{ k }}</span>
        <span class="s-table-item__main__item__value">
          <s-link target>{{ item }}</s-link>
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
      let status = this.data.header.status;
      status = Object.keys(statuses).find(i => i === status);
      return statuses[status];
    }
  }
};
</script>
