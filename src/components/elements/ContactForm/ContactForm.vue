<template>
  <div class="contact-form" v-if="list.length">
    <draggable
      v-model="list"
      @change="$emit('set-list', list)"
      handle=".handle"
    >
      <div
        v-for="(item, index) in list"
        :key="`${item.id}_${index}`"
        class="contact-form__item"
      >
        <contact-form-item
          :item="item"
          :key="`${index}_${item.id}`"
          :index="index"
          @delete-contact="deleteContact"
          @set-value="setValue"
        ></contact-form-item>
      </div>
    </draggable>
  </div>
</template>

<script>
import ContactFormItem from 'Elements/ContactForm/ContactFormItem.vue';
import draggable from 'vuedraggable';
export default {
  props: {
    contacts: {
      type: Array
    }
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.list = this.contacts;
  },
  methods: {
    setValue(item, idx, val) {
      this.$emit('set-value', item.id, idx, val);
    },
    deleteContact(item, idx) {
      this.$emit('delete-contact', item, idx);
    }
  },
  components: { draggable, ContactFormItem }
};
</script>
