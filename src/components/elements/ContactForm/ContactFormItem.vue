<template>
  <el-form-item label="temp" :rules="rules" :prop="item.id" class="row">
    <span slot="label" class="handle">{{ item.label }}</span>
    <el-input
      v-if="item.value_type !== 'phone'"
      :type="setContactsType(item.value_type)"
      :name="item.id"
      @change="$emit('set-value', item, index, fieldValue)"
      v-model="fieldValue"
      :maxlength="64"
    >
      <i class="el-icon-rank handle" slot="prepend"></i>
    </el-input>
    <div
      class="el-input el-input--medium el-input-group el-input-group--prepend"
      v-else
    >
      <div class="el-input-group__prepend handle">
        <i class="el-icon-rank"></i>
      </div>
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
      <span class="el-input__suffix">
        <span class="el-input__suffix-inner"></span>
        <i :class="['el-input__icon el-input__validateIcon', validAttr]"></i>
      </span>
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
  computed: {
    validAttr() {
      return typeof this.item.valid !== 'undefined' &&
        this.item.valid !== undefined
        ? this.item.valid
          ? 'el-icon-circle-close'
          : 'el-icon-circle-check'
        : '';
    }
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
