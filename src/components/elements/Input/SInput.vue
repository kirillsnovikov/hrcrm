<template>
  <input :type="type" />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
};
</script>
