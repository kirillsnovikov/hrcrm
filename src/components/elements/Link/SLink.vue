<template>
  <a :href="route" :class="linkClass" :target="getTarget">
    <slot></slot>
  </a>
</template>

<script>
// import 'Elements/Link/link.scss';

export default {
  props: {
    route: {
      type: String,
      default: 'http://bcvm734.dev.ts/index.php'
    },
    target: {
      type: Boolean,
      default: false
    },
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
      // console.log(process.env.NODE_ENV);
    }
  },
  computed: {
    linkClass() {
      return {
        's-link': !this.type,
        's-link-underline': this.type === 'underline',
        [`${this.activeColor}-link`]: this.activeColor
      };
    },
    getTarget() {
      if (!this.target) return;
      return '_blank';
    }
  }
};
</script>
