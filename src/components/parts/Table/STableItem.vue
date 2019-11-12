<template>
  <section class="s-table-item">
    <div class="s-table-item__left">
      <div class="s-table-item__title">
        <el-link
          :type="'primary'"
          :href="
            `index.php?module=HRPAC_VACANCY&action=DetailView&record=${data.header.title.props.id}`
          "
          >{{ data.header.title.name }}</el-link
        >
        <el-tag :size="'mini'">{{ data.header.amount.name }}</el-tag>
      </div>
      <div class="s-table-item__status">
        <el-tag
          v-if="data.header.status.name"
          :type="colorStatus"
          :effect="effect"
          >{{ data.header.status.name }}</el-tag
        >
      </div>
      <div class="s-table-item__location">
        <el-link
          :href="
            `index.php?module=${data.header.location.props.module}&action=DetailView&record=${data.header.location.props.id}`
          "
          >{{ data.header.location.name }}</el-link
        >
      </div>
      <div class="s-table-item__date">{{ `21.02.1998` }}</div>
    </div>
    <div class="s-table-item__medium">
      <div
        class="s-table-item__value"
        v-for="(item, k) in data.body"
        :key="`${k + item}`"
      >
        <span class="s-table-item__value-name">
          <s-link
            :route="
              `index.php?module=${item.module}&action=DetailView&record=${item.id}`
            "
            >{{ k }}</s-link
          >
        </span>
      </div>
    </div>
    <div class="s-table-item__right">
      <el-progress
        :text-inside="true"
        :stroke-width="25"
        :percentage="percentage"
        :color="customColors"
      ></el-progress>
    </div>
  </section>
</template>

<script>
import SLink from 'Elements/Link/SLink.vue';
// import SBadge from 'Elements/Badge/SBadge.vue';
const statuses = {
  Открыта: 'success',
  Отменена: 'info',
  'На паузе': 'warning',
  Закрыта: 'danger',
  Новая: 'info'
};
export default {
  name: 'STableItem',
  components: {
    SLink
    // SBadge
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      percentage: Math.ceil(Math.random() * 100),
      customColors: [
        { color: '#F56C6C', percentage: 30 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#e6a23c', percentage: 60 },
        { color: '#409EFF', percentage: 80 },
        { color: '#67C23A', percentage: 100 }
      ]
    };
  },
  computed: {
    colorStatus() {
      console.log(this.data);
      let status = this.data.header.status.name;
      status = Object.keys(statuses).find(i => i === status);
      return statuses[status];
    },
    effect() {
      if (this.data.header.status.name === 'Новая') {
        return 'plain';
      } else {
        return 'dark';
      }
    }
  }
};
</script>
