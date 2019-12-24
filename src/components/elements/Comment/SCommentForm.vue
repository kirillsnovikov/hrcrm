<template>
  <div v-if="formVisible" ref="form" :model="form" class="s-comment-form">
    <el-form name="comment">
      <el-form-item label="Комментарий:">
        <el-input type="textarea" v-model="form.comment" rows="4"></el-input>
      </el-form-item>
      <el-form-item class="control-panel">
        <el-checkbox
          label="Виден только рекрутерам"
          name="type"
          v-model="form.onlyRecruter"
        ></el-checkbox>
        <div class="inline-buttons">
          <el-button type="primary" v-if="edited" @click="saveComment">
            Сохранить
          </el-button>
          <el-button type="primary" v-else @click="addComment">
            Добавить
          </el-button>
          <el-button @click="cancelComment">
            Отмена
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        comment: '',
        onlyRecruter: false
      },
      edited: false
    };
  },
  props: {
    formVisible: Boolean,
    editedData: Object
  },
  created() {
    if (this.editedData && Object.keys(this.editedData).length) {
      this.edited = true;
      this.form = this.editedData;
    }
  },
  methods: {
    cancelComment() {
      this.$emit('set-form-visible', { flag: false });
      this.resetForm();
    },
    saveComment() {
      // send comment data
      this.$emit('set-form-visible', { flag: false, form: this.form });
      this.resetForm();
    },
    addComment() {
      // send comment data
      this.$emit('set-form-visible', { flag: false, form: this.form });
      this.resetForm();
    },
    validateForm() {},
    resetForm() {
      this.edited = false;
      this.form = {
        comment: '',
        onlyRecruter: false
      };
    }
  }
};
</script>
