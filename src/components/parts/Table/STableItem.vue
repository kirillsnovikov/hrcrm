<template>
  <section class="s-table-item">
    <div class="s-table-item__top" @click.alt="wideInfo = !wideInfo">
      <div class="s-table-item__left">
        <div class="s-table-item__title">
          <el-link
            v-if="id"
            :type="'primary'"
            :href="
              `index.php?module=HRPAC_VACANCY&action=DetailView&record=${id}`
            "
            >{{ data.name_id.value }}</el-link
          >
          <div v-else>{{ data.name_id.value }}</div>
          <el-tag v-if="data.amount" :size="'mini'">{{
            data.amount.value
          }}</el-tag>
        </div>
        <div class="s-table-item__status">
          <el-tag v-if="data.status_id" :type="colorStatus" :effect="effect">{{
            data.status_id.value
          }}</el-tag>
        </div>
        <div class="s-table-item__location">
          <el-link
            v-if="data.location_id"
            :href="
              `index.php?module=${data.location_id.module}&action=DetailView&record=${data.location_id.id}`
            "
            >{{ data.location_id.value }}</el-link
          >
        </div>
        <div class="s-table-item__date">{{ `21.02.1998` }}</div>
      </div>
      <div class="s-table-item__medium">
        <div
          class="s-table-item__medium-value"
          v-for="(item, k) in defineBodyData"
          :key="`${k + item.value}`"
        >
          <!-- <span class="s-table-item__value-name"> -->
          <el-link
            :href="
              `index.php?module=${item.module}&action=DetailView&record=${item.id}`
            "
            >{{ item.value }}</el-link
          >
          <!-- </span> -->
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
      <div class="s-table-item__button-down" @click="wideInfo = !wideInfo">
        <el-button circle :icon="wideIcon" :size="'mini'"></el-button>
      </div>
    </div>
    <div class="s-table-item__bottom" v-if="wideInfo">
      <div class="s-table-item__bottom-main">
        <div class="s-table-item__stack">{{ stack }}</div>
        <div class="s-table-item__salary">
          <div class="s-table-item__salary-min" v-if="data.salary_min">
            {{ data.salary_min.value | salaryFormat }}
          </div>
          <div class="s-table-item__salary-max" v-if="data.salary_max">
            {{ data.salary_max.value | salaryFormat }}
          </div>
          <div class="s-table-item__salary-val" v-if="data.salary_val">
            {{ data.salary_val.value }}
          </div>
        </div>
      </div>
      <div class="s-table-item__peoples">
        <div class="peoples s-table-item__peoples__peoples">
          <div class="peoples__label">{{ 'Бизнес' }}</div>
          <div class="peoples__tags">
            <el-tag
              class="peoples__tag"
              v-for="(people, i) in exchangePeoples"
              effect="plain"
              :key="`${i}_${people}`"
              >{{ people }}</el-tag
            >
          </div>
        </div>
        <div class="peoples s-table-item__peoples__peoples">
          <div class="peoples__label">{{ 'Рекрутеры' }}</div>
          <div class="peoples__tags">
            <el-tag
              class="peoples__tag"
              v-for="(people, i) in recruiterPeoples"
              effect="plain"
              :key="`${i}_${people}`"
              >{{ people }}</el-tag
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import peoplesData from 'Parts/Table/mockPeoples.json';
const statuses = {
  Открыта: 'success',
  Отменена: 'info',
  'На паузе': 'warning',
  Закрыта: 'danger',
  Новая: 'info'
};
const stacks = [
  'Siebel, Open UI, E-script',
  'Front-аналитик, опыт работы в проектах DHW или BI или ETL. Разработчка ТЗ, Проектной документации.'
];
export default {
  name: 'STableItem',
  props: {
    data: {
      type: Object
    },
    wide: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    type: {
      type: String,
      default: 'table'
    }
  },
  data() {
    return {
      wideInfo: this.wide,
      percentage: this.rand(0, 100),
      customColors: [
        { color: '#F56C6C', percentage: 30 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#e6a23c', percentage: 60 },
        { color: '#409EFF', percentage: 80 },
        { color: '#67C23A', percentage: 100 }
      ],
      bodyKeys: [
        'business_unit_id',
        'grade_id',
        'project_link_id',
        'manager_id'
      ],
      //отдел + рекрутер
      stack: stacks[this.rand(0, stacks.length - 1)],
      peoplesData: peoplesData
    };
  },
  computed: {
    colorStatus() {
      let status = this.data.status_id.value;
      status = Object.keys(statuses).find(i => i === status);
      return statuses[status];
    },
    effect() {
      if (this.data.status_id.value === 'Новая') {
        return 'plain';
      } else {
        return 'dark';
      }
    },
    defineBodyData() {
      let body = [];
      let bodyKeys = this.bodyKeys;
      if (this.type === 'card') {
        bodyKeys = this.bodyKeys.concat(['department_id', 'recruiter_id']);
      }
      bodyKeys.forEach(key => {
        body.push(
          this.data[key] ? this.data[key] : { value: 'DEFAULT', props: {} }
        );
      });
      return body;
    },
    wideIcon() {
      return this.wideInfo ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
    },
    exchangePeoples() {
      return this.getPeoples(this.rand(5, 10));
    },
    recruiterPeoples() {
      return this.getPeoples(this.rand(2, 5));
    }
  },
  methods: {
    rand(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    getPeoples(count) {
      let res = [];
      for (let i = 0; i < count; i++) {
        res.push(
          this.peoplesData.peoples[
            this.rand(0, this.peoplesData.peoples.length - 1)
          ]
        );
      }
      return res;
    }
  }
};
</script>
