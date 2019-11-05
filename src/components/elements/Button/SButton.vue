<template>
  <div :class="btnClass" @click="clickBtn($event)">
    <slot></slot>
  </div>
</template>

<script>
import 'Elements/Button/button.scss';
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
    btnClass() {
      if (process.env.NODE_ENV === 'development') {
        // console.log(this);
      }
      return {
        [`${this.color}-button`]: !this.empty,
        [`${this.color}-button-empty`]: this.empty,
        'border-radius-round': this.round,
        'is-disabled': this.disabled
      };
    }
  },
  methods: {
    clickBtn(e) {
      if (this.disabled) {
        return;
      }
      this.$emit('click', e);
    }
  }
};
</script>
