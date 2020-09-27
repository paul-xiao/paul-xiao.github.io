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
      <div class="nav container">
        <ul class="row">
          <li class="col-lg-6">My Account</li>
          <li class="col-lg-6">Gallery</li>
          <li class="col-lg-6">About</li>
          <li class="col-lg-6">Our Partners</li>
          <li class="col-lg-6">Contact</li>
          <li class="col-lg-6">FAQ</li>
          <li class="col-lg-6">How It Works</li>
        </ul>
      </div>
      <div class="latest-posts">
        <ul>
          <li v-for="(post, index) of pages" :key="post.title" v-if="index < 3">
            <router-link :to="post.path" class="latest-post">
              <div class="img">
                <img
                  :src="post.frontmatter.thumbnail || '/blog-1.jpg'"
                  alt=""
                />
              </div>
              <div class="roundup">
                <h4 class="title">{{ post.title }}</h4>
                <span class="text">{{ post.lastUpdated }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="copyright">
      <p id="busuanzi_container_site_pv">
        本站总访问量<span id="busuanzi_value_site_pv">0</span>次
      </p>
      <p>
        copyright &copy; 2020 <span>{{ $themeConfig.companyName }}</span> All
        rights reserved
      </p>
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
    pages() {
      const data = this.$site.pages
        .filter((e) => e.id === "post")
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
      const sticked = data.filter((e) => e.frontmatter.stick);
      const notsticked = data.filter((e) => !e.frontmatter.stick);
      const blogs = sticked.concat(notsticked);
      if (this.filter) {
        return blogs.filter(
          (e) =>
            (e.frontmatter.tags && e.frontmatter.tags.includes(this.filter)) ||
            (e.frontmatter.categories &&
              e.frontmatter.categories.includes(this.filter)) ||
            (e.frontmatter.date &&
              moment(e.frontmatter.date).getMonth().includes(this.filter))
        );
      } else {
        return blogs;
      }
    },
  },
};
</script>