<template>
  <span :class="badgeClass">
    <slot></slot>
  </span>
</template>

<script>
import 'Elements/Badge/badge.scss';
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      // console.log(this.color);
    }
  },
  computed: {
    badgeClass() {
      return {
        [`${this.color}-badge-sausage`]: this.type === 'sausage',
        [`${this.color}-badge`]: !this.type
      };
    }
  }
};
</script>
