<template>
  <div
    class="candidate-form__block candidate-form__block_pos_left contact-form"
    v-if="contacts.length"
  >
    <draggable v-model="list" :move="move">
      <div
        v-for="(item, index) in contacts"
        :key="index"
        class="contact-form__item"
      >
        <contact-form-item
          :item="item"
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
    deleteContact(item) {
      this.$emit('delete-contact', item);
    },
    move() {
      this.$emit('set-list', this.list);
    }
  },
  components: { draggable, ContactFormItem }
};
</script>
