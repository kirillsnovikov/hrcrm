<template>
  <a :href="route" :class="linkClass" :target="getTarget">
    <slot></slot>
  </a>
</template>

<script>
import 'Elements/Link/link.scss';

export default {
  props: {
    route: {
      type: String,
      default:
        'http://bcvm734.dev.ts/index.php?module=HRPAC_VACANCY_NAMES&offset=1&stamp=1573205881052983100&return_module=HRPAC_VACANCY_NAMES&action=DetailView&record=143fcd09-dce2-93d1-6ab8-5db0b16666f4'
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
