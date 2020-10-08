<template>
  <div class="theme-footer">
    <div class="inner flex">
      <div class="contact">
        <div class="contact-item">
          <div class="h4">Paul's Blog</div>
          <div class="addr">四川.成都</div>
          <div class="tel">Email: paulxiaooo@gmail.com</div>
          <span>
            <span @click="wechat = !wechat"><i class="fa fa-wechat"></i></span>
            <a href="https://github.com/paul-xiao" target="blank" ><i class="fa fa-github"></i></a>
          </span>
          <div class="wechat" :style="{'height': wechat ? '200px' : 0}">
              <img src="/wechat.jpg"alt="">
            </div>
        </div>
      </div>
      <div class="nav container">
        <ul class="row">
          <li class="col-lg-12"><router-link to="/" class="text-white">Home</router-link></li>
          <li class="col-lg-12"><router-link to="/blog.html" class="text-white">Blog</router-link></li>
          <li class="col-lg-12"><router-link to="/gallery.html" class="text-white">Gallery</router-link></li>
          <li class="col-lg-12"><router-link to="/about.html" class="text-white">About</router-link></li>
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
                <span class="text">{{ timeDiff(post.lastUpdated) }}</span>
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
import timeDiff from "../utils/timeDiff";
export default {
  name: "Footer",
  data() {
    return {
      timeDiff: timeDiff,
      wechat: false
    };
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