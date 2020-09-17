<template>
  <div class="theme-footer">
    <div class="inner flex">
      <div class="contact">
        <div class="contact-item">
          <div class="h4">Bootstrap</div>
          <div class="addr">53 Broadway, Broklyn, NY 11249</div>
          <div class="tel">Phone: (020) 123 456 789</div>
          <div class="tel">Email: Info@Company.com</div>
          <span>
            <i class="fa fa-wechat"></i>
            <i class="fa fa-github"></i>
          </span>
        </div>
      </div>
      <div class="nav">
        <ul>
          <li>My Account</li>
          <li>Gallery</li>
          <li>About</li>
          <li>Our Partners</li>
          <li>Contact</li>
          <li>FAQ</li>
          <li>How It Works</li>
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