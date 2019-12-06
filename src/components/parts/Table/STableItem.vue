<template>
  <section class="s-table-item">
    <div class="s-table-item__top" @click.alt="wideInfo = !wideInfo">
      <div class="s-table-item__left">
        <div class="s-table-item__left-top">
          <div class="s-table-item__title">
            <el-tooltip :content="data.name_id.value" placement="top-start">
              <component
                :is="data.name_id.link ? 'el-link' : 's-text'"
                :type="'primary'"
                :href="data.name_id.link"
                class="s-table-item__title-link"
              >{{ data.name_id.value }}</component>
            </el-tooltip>
            <el-tag
              class="s-table-item__title-tag"
              v-if="data.amount"
              :size="'mini'"
            >{{ data.amount.value }}</el-tag>
          </div>
          <div class="s-table-item__status">
            <el-tag
              v-if="data.status_id"
              :type="colorStatus"
              :effect="effect"
            >{{ data.status_id.value }}</el-tag>
          </div>
        </div>
        <div class="s-table-item__location">
          <component
            v-if="data.location_id"
            :is="data.location_id.link ? 'el-link' : 's-text'"
            :href="data.location_id.link"
          >{{ data.location_id.value }}</component>
        </div>
        <div class="s-table-item__date">{{ `21.02.1998` }}</div>
      </div>
      <div class="s-table-item__medium">
        <div
          class="s-table-item__medium-value"
          v-for="(item, k) in defineBodyData"
          :key="`${k + item.value}`"
        >
          <component
            class="s-table-item__medium-link"
            :is="item.link ? 'el-link' : 's-text'"
            :href="item.link"
          >{{ item.value | grade }}</component>
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
        <div class="s-table-item__stack">{{ data.stack.value }}</div>
        <div class="s-table-item__salary">
          <div class="s-table-item__salary-min" v-if="data.salary_min">
            {{
            data.salary_min.value
            | salaryFormat(data.salary_min.type, data.salary_min.precision)
            }}
          </div>
          <div class="s-table-item__salary-max" v-bind:draggable="''" v-if="data.salary_max">
            {{
            data.salary_max.value
            | salaryFormat(data.salary_min.type, data.salary_min.precision)
            }}
          </div>
          <div class="s-table-item__salary-val" v-if="data.salary_val">{{ data.salary_val.value }}</div>
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
            >{{ people }}</el-tag>
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
            >{{ people }}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SText from 'Elements/Text/SText';
import peoplesData from 'Parts/Table/mockPeoples.json';
import { rand } from '@/utils/helpers';
const statuses = {
  Открыта: 'success',
  Отменена: 'info',
  'На паузе': 'warning',
  Закрыта: 'danger',
  Новая: 'info'
};
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
    type: {
      type: String,
      default: 'table'
    }
  },
  components: {
    SText
  },
  data() {
    return {
      wideInfo: this.wide,
      percentage: rand(0, 100),
      customColors: [
        { color: '#F56C6C', percentage: 30 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#e6a23c', percentage: 60 },
        { color: '#409EFF', percentage: 80 },
        { color: '#67C23A', percentage: 100 }
      ],
      bodyKeys: ['business_unit_id', 'grade', 'project_link_id', 'manager_id'],
      peoplesData: peoplesData
    };
  },
  beforeMount() {
    for (let [key, value] of Object.entries(this.data)) {
      let module = key === 'name_id' ? 'HRPAC_VACANCY' : value.module;
      if (value.id && module) {
        value[
          'link'
        ] = `index.php?module=${module}&action=DetailView&record=${value.id}`;
      }
    }
  },
  mounted() {
    console.log(this.data);
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
      return this.getPeoples(rand(5, 10));
    },
    recruiterPeoples() {
      return this.getPeoples(rand(2, 5));
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
          this.peoplesData.peoples[rand(0, this.peoplesData.peoples.length - 1)]
        );
      }
      return res;
    }
  }
};
</script>
