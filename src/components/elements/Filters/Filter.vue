<template>
  <div>
    <!-- Если слот image не будет передан, то будет использоваться значение по умолчанию -->
    <slot name="image">
      <!-- Значение по умолчанию -->
      <a :href="url" class="snippet__image">
        <img :src="image" />
      </a>
    </slot>
    <slot name="title">
      <a :href="url" class="snippet__title">{{ title }}</a>
    </slot>
    <div
      v-if="!inCart"
      @click="add"
      :class="{ 'snippet__buy--load': load }"
      class="snippet__control"
    >
      <slot name="button">
        <div class="snippet__button">Купить это</div>
      </slot>
    </div>
    <div v-if="inCart" class="snippet__control">
      <div class="snippet__button">Добавлен</div>
    </div>
    <div v-if="load" class="snippet__load">Грузится</div>
  </div>
</template>

<script>
// Подключим vuex для получения состояния корзины
// import { mapState, mapActions } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    url: {
      type: String
    },
    image: {
      type: String
    },
    title: {
      type: String
    },
    cartItems: Array
  },
  data() {
    return {
      // Статус загрузки
      load: false,
      // Статус добавлен в корзину
      inCart: false
    };
  },
  // computed: {
  //   ...mapState({
  //     // Получаем товары из корзины
  //     cartItems: ({ cart }) => cart.items
  //   })
  // },
  mounted() {
    this.$nextTick(() => {
      // Передаем статус нахождения в корзине
      this.inCart = this.cartItems.some(item => item.id === this.id);
    });
  },
  methods: {
    // ...mapActions([
    //   // Метод добавления в корзину
    //   'addToCart'
    // ]),
    add() {
      // Включаем статус загрузки
      this.load = true;
      // Делаем запрос
      this.addToCart({
        id: this.id
      });
    }
  },
  watch: {
    // Смотрим за изменениями в корзине
    cartItems(items) {
      // Выключаем статус загрузки
      this.load = false;
      // Передаем статус нахождения в корзине
      this.inCart = items.some(item => item.id === this.id);
    }
  }
};
</script>
