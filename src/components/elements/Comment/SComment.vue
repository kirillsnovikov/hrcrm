<template>
  <div
    class="s-comment"
    @mouseenter="showIcons = true"
    @mouseleave="showIcons = false"
  >
    <div class="s-comment__avatar">
      <el-avatar :src="avatar" :fit="'scale-down'"></el-avatar>
    </div>
    <div class="s-comment__main">
      <div
        class="s-comment__icons"
        v-if="showIcons && user_id === data.user_id"
      >
        <a
          class="el-icon el-icon-delete"
          @click="$emit('delete-comment', data)"
        ></a>
        <a
          class="el-icon el-icon-edit"
          @click="$emit('set-form-visible', { flag: true, comment: data })"
        ></a>
      </div>
      <div class="s-comment__name">
        <el-link
          :type="'primary'"
          :href="userLink"
          target="_blank"
          class="s-comment__name-link"
          >{{ data.name }}</el-link
        >
      </div>
      <div
        ref="comment"
        :class="[
          's-comment__value',
          isFullText ? 's-comment__value_height_full' : ''
        ]"
      >
        <div v-html="data.text"></div>
        <span
          v-if="showIcons && visibleTextElem"
          class="s-comment__link"
          @click="isFullText = true"
        >
          Показать весь текст
        </span>
      </div>
      <div class="s-comment__date">{{ data.date_entered }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user_id: {
      type: String
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      showIcons: false,
      isFullText: false
    };
  },
  computed: {
    avatar() {
      return this.data.avatar
        ? this.data.avatar
        : 'https://www.myautoloan.com/static/img/misc/authors/default.jpg';
    },
    userLink() {
      return this.data.user_id
        ? `/index.php?module=Employees&action=DetailView&record=${this.data.user_id}`
        : '#';
    },
    visibleTextElem() {
      return (
        this.$refs.comment.offsetHeight == 70 &&
        this.data.text.length > 120 &&
        !this.isFullText
      );
    }
  }
};
</script>
