<template>
  <div class="pagination">
    <span class="page page-prev">
      <i class="fa fa-angle-left"></i>
    </span>
    <span
      v-for="page, index of pageNum"
      @click="handlePageClick(index)"
      :class="['page', index===value && 'active']"
    >{{index + 1}}</span>
    <span class="page page-next">
      <i class="fa fa-angle-right"></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    pageNum: {
      type: Number,
    },
    value: {
      type: Number,
    },
  },
  methods: {
    handlePageClick(index) {
      this.$emit("input", index);
    },
  },
};
</script>