<template>
  <div class="candidate-item">
    <div class="candidate-item__top">
      <div class="candidate-item__top-left">
        <div class="candidate-item__avatar">
          <el-avatar
            :size="+candidate.photo.width"
            :src="candidate.photo.value"
            shape="square"
          ></el-avatar>
        </div>
        <div class="candidate-item__stage"></div>
      </div>
      <div class="candidate-item__top-right">
        <div class="candidate-header">
          <div class="candidate-header__main">
            <div class="candidate-header__name">{{ fullName }}</div>
            <div class="candidate-header__age">{{ age }}</div>
            <div class="candidate-header__city"></div>
          </div>
          <div class="candidate-header__actions">
            <div class="candidate-header__actions-item"></div>
            <div class="candidate-header__actions-item"></div>
          </div>
        </div>
        <div class="candidate-item__body">
          <div class="candidate-item__info">
            <div class="candidate-item__vacancy"></div>
            <div class="candidate-item__salary"></div>
            <div class="candidate-item__tel"></div>
            <div class="candidate-item__mail"></div>
          </div>
          <div class="candidate-fields">
            <div class="label-value candidate-fields__label-value">
              <div class="label-value__label"></div>
              <div class="label-value__value"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="candidate-item__button-down" @click="wideInfo = !wideInfo">
        <el-button circle :icon="wideIcon" :size="'mini'"></el-button>
      </div>
    </div>
    <div class="candidate-item__bottom" v-if="wideInfo"></div>
  </div>
</template>

<script>
import { plural } from '@/utils/helpers';

export default {
  props: {
    candidate: {
      type: Object
    }
  },
  data() {
    return {
      wideInfo: false
    };
  },
  computed: {
    wideIcon() {
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
    age() {
      if (this.candidate.age.value !== '') {
        return `${this.candidate.age.value} ${plural(
          this.candidate.age.value,
          'year'
        )}`;
      }
      return '';
    }
  }
};
</script>
