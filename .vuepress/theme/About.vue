<template>
  <BaseLayout>
    <div class="container main">
      <div class="row">
        <div class="col-lg-5">
          <img src="/blog-1.jpg" alt="" />
        </div>
        <div class="col-lg-7">
            <div class="h2-bold" style="padding-left:20px; ">关于我</div>
            <Content />
            <div style="padding-left:20px; ">
              <span class="text-big">
                <span @click="wechat = !wechat"><i class="fa fa-wechat"></i></span>
                <a href="https://github.com/paul-xiao" target="blank" ><i class="fa fa-github"></i></a>
              </span>
            </div>
            <div class="wechat" :style="{'height': wechat ? '200px' : 0}">
              <img src="/wechat.jpg"alt="">
            </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../components/BaseLayout";
export default {
  name: "About",
  data() {
    return {
      wechat: false
    }
  }
};
</script>