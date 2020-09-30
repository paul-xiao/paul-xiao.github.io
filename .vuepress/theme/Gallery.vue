<template>
  <BaseLayout>
    <div class="container main">
      <div
        class="banner"
        :style="{ 'baclground-image': `url(${$page.frontmatter.thumbnail})` }"
      ></div>
      <Content />
    </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../components/BaseLayout";
export default {
  name: "About",
  mounted() {
    console.log(this.$page);
  },
};
</script>
<style lang="stylus" scoped>
.banner {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 300px;
  width: auto;
  margin-right: -15px;
  margin-left: -15px;
}
</style>