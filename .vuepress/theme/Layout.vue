<template>
  <BaseLayout>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 main">
          <div class="content__default__wrap container">
            <div class="content_default-banner">
              <img :src="page.frontmatter.thunbnail || '/blog-1.jpg'" alt="" />
            </div>
            <div class="page-category">
              <span
                class="categories"
                v-for="category in page.frontmatter.categories"
              >
                <span class="small" @click="handleClick(category)">{{
                  `${category}`
                }}</span>
              </span>
            </div>
            <div class="h2-bold">{{ page.title }}</div>
            <div>
              <span class="small">
                <span>
                  <i class="fa fa-clock-o"></i>
                  <span>{{ publishDate(page.frontmatter.date) }}</span>
                </span>
                <span class="gutter"></span>
                <span>
                  <i class="fa fa-eye"></i>
                  <span>12</span>
                </span>
                <span class="gutter"></span>
                <span>
                  <i class="fa fa-comment-o"></i>
                  <span>12</span>
                </span>
              </span>
            </div>
            <Content />
            <div class="content_default-foot">
              <div class="tags">
                <span
                  class="small"
                  v-for="tag in page.frontmatter.tags"
                  @click="handleClick(tag)"
                >
                  {{ `#${tag}` }}
                </span>
              </div>
              <div class="">
                <div class="row">
                  <div class="col-lg-6" v-if="prev">
                    <router-link :to="prev.path" class="prev">
                      <div class="arrow"><i class="fa fa-angle-left"></i></div>
                      <div>
                        <div class="small">previous post</div>
                        <div class="h4">{{ prev.title }}</div>
                      </div>
                    </router-link>
                  </div>
                  <div class="col-lg-6" v-if="next">
                    <router-link :to="next.path" class="next">
                      <div>
                        <div class="small">next post</div>
                        <div class="h4">{{ next.title }}</div>
                      </div>
                      <div class="arrow"><i class="fa fa-angle-right"></i></div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div id="gitalk-container"></div>
          </div>
        </div>
        <div class="col-lg-4 aside">
          <ListArchives :pages="pages" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<script>
import moment from "../utils/moment";
import ListArchives from "../components/ListArchives";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
export default {
  mounted() {
    // console.log('this.$page')
    // console.log(this.$page)
  },
  computed: {
    site() {
      return this.$site;
    },
    config() {
      return this.$themeConfig;
    },
    page() {
      return this.$page;
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
    prev() {
      const current = this.pages.findIndex((e) => e.title === this.page.title);
      return this.pages[current - 1];
    },
    next() {
      const current = this.pages.findIndex((e) => e.title === this.page.title);
      return this.pages[current + 1];
    },
  },

  // https://api.github.com/repos/paul-xiao/paul-xiao.github.io/issues?per_page=100&sort=comments 获取所有评论
  // https://api.github.com/repos/paul-xiao/paul-xiao.github.io/issues/1/comments  获取评论数
  // http://www.bubuko.com/infodetail-3195459.html 参考
  mounted() {
    console.log(this.page);
    console.log(this.pages);
    this.$nextTick(() => {
      const gitalk = new Gitalk({
        clientID: "7bf19641bb93106024b9",
        clientSecret: "c7d431c1bd1ed93cb4d0cd22e3b7ab62ede1a93c",
        repo: "paul-xiao.github.io", // The repository of store comments,
        owner: "paul-xiao",
        admin: ["paul-xiao"],
        id: location.pathname, // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
      });

      setTimeout(() => {
        gitalk.render("gitalk-container");
      }, 500);
    });
  },
  methods: {
    publishDate(publishDate) {
      return moment(publishDate).date;
    },
    handleClick(filter) {
      this.$router.push({
        path: "/",
        query: {
          filter: filter,
        },
      });
    },
  },
};
</script>