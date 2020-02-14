<template>
  <el-upload
    :name="name"
    :class="[
      'candidate-form__upload',
      name == 'photo_file' && uploaded ? 'uploaded' : ''
    ]"
    ref="upload"
    :action="''"
    :auto-upload="false"
    :list-type="listType"
    drag
    :accept="accept"
    :file-list="file"
    :limit="1"
    :on-change="changeFile"
    :on-remove="removeFile"
  >
    <div class="el-upload__text">{{ uploadText }}</div>
  </el-upload>
</template>

<script>
export default {
  props: {
    candidateId: {
      type: String
    },
    accept: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'text'
    },
    uploadText: {
      type: String
    },
    file: {
      type: Array
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      uploaded: false
    };
  },
  methods: {
    changeFile() {
      if (!this.file.length) {
        this.$refs.upload.uploadFiles[0];
        this.uploaded = true;
        if (this.name === 'filename_file') {
          this.$emit('upload-resume');
        }
      }
    },
    removeFile() {
      this.file.pop();
      this.uploaded = false;
    }
  }
};
</script>
