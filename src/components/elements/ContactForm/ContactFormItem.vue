<template>
  <el-form-item :label="item.label" :rules="rules" :prop="item.id" class="row">
    <el-input
      v-if="item.value_type !== 'phone'"
      :type="setContactsType(item.value_type)"
      :name="item.id"
      @change="$emit('set-value', item, index, fieldValue)"
      v-model="fieldValue"
      :maxlength="64"
    ></el-input>
    <!-- нельзя выделить текст в поле т.к. срабатывает событие drag -->
    <div class="el-input el-input--medium" v-else>
      <the-mask
        :type="setContactsType(item.value_type)"
        :name="item.id"
        @change.native="$emit('set-value', item, index, fieldValue)"
        @blur.native="$emit('set-value', item, index, fieldValue)"
        v-model="fieldValue"
        :masked="false"
        :mask="[
          '# (###) ###-##-##',
          '## (###) ###-##-##',
          '### (###) ###-##-##',
          '#### (###) ###-##-##'
        ]"
        class="el-input__inner"
        required
      ></the-mask>
      <!-- <span class="el-input__suffix">
        <span class="el-input__suffix-inner"></span>
        <i class="el-input__icon el-input__validateIcon"></i>
      </span> -->
    </div>
    <div class="contact-form__panel">
      <el-button
        size="mini"
        icon="el-icon-close"
        @click="$emit('delete-contact', item, index)"
      ></el-button>
      <a :href="setContactsLink(item)">
        <font-awesome-icon v-if="item.value" :icon="item.icon" size="2x">
        </font-awesome-icon>
      </a>
    </div>
  </el-form-item>
</template>

<script>
import { mask, TheMask } from 'vue-the-mask';
export default {
  directives: { mask },
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      fieldValue: '',
      rules: [
        {
          required: true,
          message: 'Необходимо заполнить поле',
          trigger: 'blur'
        },
        this.item.value_type === 'E-mail'
          ? {
              type: 'email',
              message: 'Введенный email указан некорректно',
              trigger: ['blur', 'change']
            }
          : {}
      ]
    };
  },
  mounted() {
    this.fieldValue = this.item.value;
  },
  methods: {
    setContactsType(type) {
      switch (type) {
        case 'phone':
          return 'tel';

        case 'E-mail':
          return 'email';

        default:
          return 'text';
      }
    },
    setContactsLink(item) {
      switch (item.value_type) {
        case 'phone':
          return `https://wa.me/${item.value}`;

        case 'E-mail':
          return `mailto:${item.value}`;

        case 'Skype':
          return `skype:${item.value}?chat`;

        case 'Telegram':
          return `https://t.me/${item.value}`;

        default:
          return '#';
      }
    }
  },
  components: { TheMask }
};
</script>
