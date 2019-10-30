<template>
  <a href="#" :class="linkClass">
    <slot></slot>
  </a>
</template>

<script>
import 'Elements/Link/link.scss';

export default {
  props: {
    activeColor: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: ''
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env.NODE_ENV);
    }
  },
  computed: {
    linkClass() {
      return {
        's-link': !this.type,
        's-link-underline': this.type === 'underline',
        [`${this.activeColor}-link`]: this.activeColor
      };
    }
  }
};
</script>
