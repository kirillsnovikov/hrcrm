<template>
  <div class="candidate-item">
    <div class="candidate-item__top">
      <div class="candidate-item__top-left">
        <div class="candidate-item__avatar">
          <el-avatar :size="150" :src="avatar" shape="square"></el-avatar>
        </div>
      </div>
      <div class="candidate-item__top-right">
        <div class="candidate-header candidate-item__candidate-header">
          <div class="candidate-header__top">
            <div class="candidate-header__title">
              <el-link
                class="candidate-header__name"
                :underline="false"
                :href="viewRoute"
                type="primary"
              >{{ fullName }}</el-link>
              <div class="candidate-header__age">{{ this.candidate.age.value | plural }}</div>
              <div class="candidate-header__salary">
                {{
                candidate.salary.value
                | salaryFormat(
                candidate.salary.type,
                candidate.salary.precision
                )
                }}
              </div>
            </div>
            <div class="candidate-header__actions">
              <el-link
                :href="whatsapp"
                :underline="false"
                class="candidate-header__actions-item icon-whatsapp"
              ></el-link>
              <el-dropdown trigger="click" class="candidate-header__actions-item">
                <i class="el-dropdown-link el-icon-s-tools"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-link
                      :href="editRoute"
                      :underline="false"
                      icon="el-icon-edit"
                      class="candidate-header__actions-item"
                    >Edit</el-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-link
                      :underline="false"
                      icon="el-icon-delete"
                      class="candidate-header__actions-item"
                    >Remove</el-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="candidate-header__bottom">
            <div class="candidate-header__vacancy">{{ candidate.vacancy }}</div>
            <div
              class="candidate-header__stage"
              :style="{ background: candidate.stage.color }"
            >{{ candidate.stage.name }}</div>
          </div>
        </div>
        <div class="candidate-item__body">
          <div class="candidate-item__info">
            <div class="candidate-item__city candidate-item__info-item">
              <i class="el-icon-location"></i>
              {{ candidate.location_id.value }}
            </div>
            <el-link
              class="candidate-item__tel candidate-item__info-item"
              :href="tel"
              icon="el-icon-phone"
              :underline="false"
              v-if="phone"
            >{{ phone }}</el-link>
            <el-link
              class="candidate-item__mail candidate-item__info-item"
              :href="email"
              :underline="false"
              icon="el-icon-message"
              v-if="candidate.email.value"
            >{{ candidate.email.value }}</el-link>
          </div>
          <div class="candidate-fields">
            <div
              class="label-value candidate-fields__label-value"
              v-for="(item, i) in mainInfo"
              :key="`${item.value}_${i}`"
            >
              <div class="label-value__label">{{ item.label }}</div>
              <div class="label-value__value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="candidate-item__button-down" @click="wideInfo = !wideInfo">
        <el-button :disabled="!candidate.description.value" circle :icon="wideIcon" :size="'mini'"></el-button>
      </div>
    </div>
    <div
      class="candidate-item__bottom"
      v-if="wideInfo && candidate.description.value"
      v-html="candidate.description.value"
    ></div>
  </div>
</template>

<script>
import { rand } from '@/utils/helpers';
// import labels from './candidatesLabels';

export default {
  props: {
    candidate: {
      type: Object
    },
    mod: {
      type: Object
    }
  },
  data() {
    return {
      wideInfo: false,
      bodyKeys: [
        'experience',
        'resume_date_upd',
        'last_work',
        'comments',
        'last_post'
      ]
      // labels: labels
    };
  },
  computed: {
    wideIcon() {
      // console.log(this.candidate);
      return this.wideInfo ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
    },
    fullName() {
      return [
        this.candidate.last_name.value,
        this.candidate.first_name.value,
        this.candidate.middle_name.value
      ]
        .filter(item => item !== '')
        .join(' ');
    },
    avatar() {
      if (process.env.NODE_ENV === 'development') {
        return `https://picsum.photos/id/${rand(10, 100)}/${
          this.candidate.photo.width
        }/${this.candidate.photo.height}`;
      }
      return `index.php?entryPoint=download&id=${this.candidate.id.value}_photo&type=HRPAC_CANDIDATES`;
    },
    phone() {
      return `${this.candidate.phone_mobile_code.value} ${this.candidate.phone_mobile.value}`;
    },
    mainInfo() {
      let res = [];
      this.bodyKeys.forEach(key => {
        res.push({
          label: this.mod[this.candidate[key].vname],
          value: this.candidate[key].value
        });
      });
      console.log('res', res);
      return res;
    },
    whatsapp() {
      let tel = this.phone.replace(/[^\d]/g, '');
      return `https://wa.me/${tel}`;
    },
    email() {
      return `mailto:${this.candidate.email.value}`;
    },
    tel() {
      let tel = this.phone.replace(/[^\d^+]/g, '');
      return `tel:${tel}`;
    },
    viewRoute() {
      return `/index.php?module=HRPAC_SELECT&action=DetailView&record=${this.candidate.id.value}`;
    },
    editRoute() {
      return `/index.php?module=HRPAC_SELECT&action=EditView&record=${this.candidate.id.value}`;
    }
  }
};
</script>
