<template>
  <div
    class="candidate-form__block candidate-form__block_pos_left contact-form"
    v-if="contacts.length"
  >
    <draggable v-model="contacts" @start="drag = true" @end="drag = false">
      <div v-for="(item, i) in contacts" :key="i">
        <el-form-item
          :label="item.label"
          :rules="[
            {
              required: true,
              message: 'Необходимо заполнить поле',
              trigger: 'blur'
            }
          ]"
          :prop="item.id"
          class="row"
        >
          <el-input
            v-if="item.value_type !== 'phone'"
            :type="setContactsType(item.value_type)"
            :name="item.id"
            @change="setValue(item, i, fieldValue)"
            v-model="fieldValue"
            :maxlength="64"
          ></el-input>
          <!-- @change="form[item.id] = item.value" -->
          <!-- нельзя выделить текст в поле т.к. срабатывает событие drag -->
          <!-- добавить clearable для очистки полей -->
          <div class="el-input el-input--medium" v-else>
            <the-mask
              :type="$emit('set-type', item.value_type)"
              :name="item.value_type"
              v-model.lazy="item.value"
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
          </div>
          <div class="contact-form__panel">
            <el-button
              size="mini"
              icon="el-icon-close"
              @click="$emit('delete-contact', item)"
            ></el-button>
            <a :href="setContactsLink(item)">
              <font-awesome-icon v-if="item.value" :icon="item.icon" size="2x">
              </font-awesome-icon>
            </a>
          </div>
        </el-form-item>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mask, TheMask } from 'vue-the-mask';
import draggable from 'vuedraggable';
export default {
  directives: { mask },
  props: {
    contacts: {
      type: Array
    },
    rules: {
      type: Object
    },
    form: {
      type: Object
    }
  },
  data() {
    return {
      fieldValue: ''
    };
  },
  // mounted() {
  //   console.log('re-render', this.contacts);
  // },
  // created() {
  //   console.log('created', this.contacts);
  // },
  // updated() {
  //   console.log('updated', this.contacts);
  // },
  methods: {
    setValue(item, i, val) {
      this.$emit('set-value', item.id, i, val);
    },
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
  components: { TheMask, draggable }
};
</script>
