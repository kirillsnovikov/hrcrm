<template>
  <div class="pagination el-pagination is-background">
    <button
      type="button"
      class="btn-prev btn-limit"
      @click="selectPage('startPage')"
      :disabled="offsets.prev == -1"
    >
      <i class="el-icon el-icon-d-arrow-left"></i>
    </button>
    <button
      type="button"
      class="btn-prev"
      @click="selectPage('prevPage')"
      :disabled="offsets.prev == -1"
    >
      <i class="el-icon el-icon-arrow-left"></i>
    </button>
    <span>
      {{ `(${startValue} - ${endValue} из ${offsets.total})` }}
    </span>
    <button
      type="button"
      class="btn-next"
      @click="selectPage('nextPage')"
      :disabled="offsets.next == -1"
    >
      <i class="el-icon el-icon-arrow-right"></i>
    </button>
    <button
      type="button"
      class="btn-next btn-limit"
      @click="selectPage('endPage')"
      :disabled="offsets.next == -1"
    >
      <i class="el-icon el-icon-d-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    urls: {
      type: Object
    },
    offsets: {
      type: Object
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    startValue() {
      return Number(this.offsets.current) + 1;
    },
    endValue() {
      return Number(this.offsets.next) > -1
        ? this.offsets.next
        : this.offsets.total;
    }
  },
  methods: {
    selectPage(url) {
      location.replace(`/${this.urls[url]}`);
    }
  }
};
</script>
