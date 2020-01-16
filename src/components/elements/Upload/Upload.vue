<template>
  <el-upload
    class="candidate-form__upload"
    ref="upload"
    :action="
      `/index.php?module=HRPAC_CANDIDATES&action=Save&record=${candidateId}
      &relate_to=hrpac_candidates_documents_1&relate_id=${candidateId}
      &parent_id=${candidateId}&parent_type=HRPAC_CANDIDATES&revision=1
      &filename_file=${file.length ? file[0].name : ''}`
    "
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
    }
  },
  methods: {
    changeFile() {
      if (!this.file.length) {
        this.file.push(this.$refs.upload.uploadFiles[0]);
        // this.$refs.upload.submit();
        // window.location.reload();
        this.$axios
          .post('/index.php', {
            params: {
              module: 'HRPAC_CANDIDATES',
              action: 'Save',
              isDuplicate: false,
              return_module: 'HRPAC_CANDIDATES',
              return_action: 'DetailView',
              return_id: this.candidateId,
              record: this.candidateId,
              relate_to: 'hrpac_candidates_documents_1',
              relate_id: this.candidateId,
              parent_id: this.candidateId,
              parent_type: 'HRPAC_CANDIDATES',
              revision: 1,
              filename_old_doctype: 'Sugar',
              filename_file: this.file
            }
          })
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    },
    removeFile() {
      this.file.pop();
    }
  }
};
</script>
