<template>
  <div class="s-card__tab">
    <div class="label-value candidate-fields__label-value">
      <span class="label-value__label">Дата и время обновления</span>
      <span class="label-value__value">
        {{ candidate.resume_date_upd.value }}
      </span>
    </div>
    <div class="label-value">
      <span class="label-value__label">Ссылка на резюме</span>
      <el-link
        :href="candidate.resume_url.value"
        target="_blank"
        :underline="false"
        class="label-value__value label-value__value_wrap_normal"
      >
        {{ candidate.resume_url.value }}
      </el-link>
    </div>
    <div class="resume-description">
      <div class="label-value resume-description__title">
        <span class="label-value__label">Резюме</span>
      </div>
      <div class="resume-description__text" v-html="formatHtml"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    candidate: {
      type: Object
    }
  },
  computed: {
    formatHtml() {
      return this.candidate.resume_text.value
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<');
    }
  }
};
</script>
