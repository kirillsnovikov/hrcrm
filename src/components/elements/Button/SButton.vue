<template>
  <div class="s-button" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
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
  }
};
</script>
