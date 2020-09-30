<template>
  <div class="search-result" v-if="result.length">
    <div class="search-result-item" v-for="item in result">
      <router-link :to="item.path">{{ item.title }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchResult",
  props: {
    result: {
      type: Array,
      default: [],
    },
  },
};
</script>
<style lang="stylus" scoped>
.search-result {
  text-align: left;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &-item {
    line-height: 35px;
    text-transform: capitalize;
  }
}
</style>