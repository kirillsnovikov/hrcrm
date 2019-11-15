<template>
  <div class="s-comment">
    <div class="s-comment__avatar">
      <el-avatar :src="avatar" :fit="'scale-down'"></el-avatar>
    </div>
    <div class="s-comment__main">
      <div class="s-comment__name">
        <el-link
          :type="'primary'"
          :href="data.nameLink ? data.nameLink : '#'"
          class="s-comment__name-link"
          >{{ data.name }}</el-link
        >
      </div>
      <div class="s-comment__value">{{ data.value }}</div>
      <div class="s-comment__date">{{ data.date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    avatar() {
      return this.data.avatar
        ? this.data.avatar
        : 'https://www.myautoloan.com/static/img/misc/authors/default.jpg';
    }
  }
};
</script>
