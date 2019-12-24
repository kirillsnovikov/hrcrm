<template>
  <div class="s-card__tab">
    <div class="label-value candidate-fields__label-value">
      <span class="label-value__label">Дата и время обновления</span>
      <span class="label-value__value">
        {{ candidate.resume_date_upd.value }}
      </span>
    </div>
    <div class="label-value">
      <input
        type="checkbox"
        name="selfResponse"
        id="selfResponse"
        disabled
        :checked="candidate.self_response.value"
      />
      <label for="selfResponse" class="label-value__value">
        Отклинулся
      </label>
    </div>
    <div class="label-value">
      <span class="label-value__label">Ссылка на резюме</span>
      <span class="label-value__value">
        {{ candidate.resume_url.value }}
      </span>
    </div>
    <div class="resume-description">
      <div class="label-value resume-description__title">
        <span class="label-value__label">Резюме</span>
      </div>
      <div class="resume-description__text">
        {{ candidate.description.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    candidate: {
      type: Object
    }
  }
};
</script>
