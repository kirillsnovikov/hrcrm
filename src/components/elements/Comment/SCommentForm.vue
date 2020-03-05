<template>
  <el-form
    v-if="formVisible"
    ref="form"
    :model="form"
    :rules="rules"
    class="s-comment-form"
  >
    <el-form-item label="Комментарий:" prop="text">
      <el-input
        type="textarea"
        v-model="form.text"
        name="text"
        rows="4"
        maxlength="500"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item class="control-panel" prop="to_recruits">
      <el-checkbox
        label="Виден только рекрутерам"
        name="to_recruits"
        :checked="Number(form.to_recruits)"
        v-model="form.to_recruits"
      ></el-checkbox>
      <div class="inline-buttons" v-loading="loader">
        <el-button type="primary" v-if="edited" @click="saveComment()">
          Сохранить
        </el-button>
        <el-button type="primary" v-else @click="saveComment()">
          Добавить
        </el-button>
        <el-button @click="cancelComment()">
          Отмена
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formVisible: {
      type: Boolean
    },
    editedData: {
      type: Object
    },
    loader: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        text: '',
        to_recruits: false
      },
      rules: {
        text: [
          {
            required: true,
            message: 'Необходимо указать сообщение',
            trigger: 'change'
          }
        ]
      },
      edited: false
    };
  },
  methods: {
    cancelComment() {
      this.$emit('set-form-visible', { flag: false });
      this.resetForm();
    },
    saveComment() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('save-comment-form', this.form, this.edited);
        } else {
          console.log('Поля невалидные!');
        }
      });
    },
    validateForm() {},
    resetForm() {
      this.edited = false;
      this.$refs.form.resetFields();
      this.form = {
        comment: '',
        onlyRecruter: false
      };
    }
  },
  watch: {
    editedData: function() {
      if (this.editedData && Object.keys(this.editedData).length) {
        this.edited = true;
        this.form = Object.assign({}, this.editedData);
      }
    }
  }
};
</script>
