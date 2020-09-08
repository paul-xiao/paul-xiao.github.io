<template>
  <div class="theme-footer">
    <div class="inner flex">
      <div class="contact">
        <div class="contact-item">
          <div class="h4">Paulxiaooo</div>
          <div class="addr">Base: 四川,成都</div>
          <div class="tel">Phone: 18980822098</div>
          <div class="tel">Email: paulxiaooo@gmail.com</div>
          <span>
            <i class="fa fa-wechat"></i>
            <i class="fa fa-github"></i>
          </span>
        </div>
      </div>
      <div class="nav">
        <ul>
          <li>Blog</li>
          <li>Gallery</li>
          <li>About</li>
        </ul>
      </div>
      <div class="latest-posts">
        <ul class="bottom-posts">
          <li>
            <div class="img">
              <img src alt />
            </div>
            <div class="desc">
              <div class="h4">Hotels For All Budgets</div>
              <div class="date">October 26, 2020</div>
            </div>
          </li>
          <li>
            <div class="img">
              <img src alt />
            </div>
            <div class="desc">
              <div class="h4">Hotels For All Budgets</div>
              <div class="date">October 26, 2020</div>
            </div>
          </li>
          <li>
            <div class="img">
              <img src alt />
            </div>
            <div class="desc">
              <div class="h4">Hotels For All Budgets</div>
              <div class="date">October 26, 2020</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="copyright">
      copyright &copy; 2020
      <span>{{$themeConfig.companyName}}</span> All rights reserved
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  computed: {
    companyName() {
      return this.$themeConfig.companyName;
    },
  },
};
</script>