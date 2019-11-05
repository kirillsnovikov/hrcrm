<template>
  <span :class="badgeClass">
    <slot></slot>
  </span>
</template>

<script>
import 'Elements/Badge/badge.scss';
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    round: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    badgeClass() {
      if (process.env.NODE_ENV === 'development') {
        // console.log(this);
      }
      return {
        [`${this.color}-badge`]: !this.empty,
        [`${this.color}-badge-empty`]: this.empty,
        'border-radius-round': this.round,
        'is-disabled': this.disabled
      };
    }
  }
};
</script>
