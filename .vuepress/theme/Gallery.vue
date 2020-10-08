<template>
  <BaseLayout>
   <div
        class="banner"
        :style="{ 'baclground-image': `url(${$page.frontmatter.thumbnail})` }"
      >
      <div class="intro container">
        优秀项目与解决方案
      </div>
      </div>
    <div class="container main">
      <Content />
    </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../components/BaseLayout";
export default {
  name: "About"
};
</script>
<style lang="stylus" scoped>
.banner {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: auto;
  .intro{
   padding:200px 30px;   
   font-size:30px;
   font-weight:bold;
   color: #fff;
  }
}
</style>