<template>
  <BaseLayout>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 main">
          <div class="content__default__wrap container">
            <div class="content_default-banner">
              <img :src="page.frontmatter.thumbnail" />
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
                  <!-- id 将作为查询条件 -->
                  <span
                    :id="page.path"
                    class="leancloud_visitors"
                    :data-flag-title="page.title"
                  >
                    <i class="leancloud-visitors-count">0</i>
                  </span>
                </span>
                <span class="gutter"></span>
                <span>
                  <i class="fa fa-comment-o"></i>
                  <span
                    class="valine-comment-count"
                    :data-xid="page.path"
                  ></span>
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
            <div id="vcomments" ref="comment"></div>
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
import Valine from "valine";
// import "gitalk/dist/gitalk.css";
// import Gitalk from "gitalk";
export default {
  data() {
    return {
      show: true,
      valine: null,
    };
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
  watch: {
    $route(to, from) {
      if (from.path != to.path) {
        try {
          this.initComment();
          console.log(this.valine);
          console.log(to.path);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  mounted() {
    this.initComment();
  },
  methods: {
    initComment() {
      console.log("init");
      let vm = this;
      vm.$nextTick(() => {
        vm.valine = new Valine({
          el: "#vcomments",
          appId: "DL6xLRPiyl7jbfePYNNM2mFv-gzGzoHsz",
          appKey: "tJQrcE9KKCzYS8NFr4NokDzN",
          visitor: true,
          path: vm.$route.path,
        });

        console.log(vm.valine);
      });
    },
    publishDate(publishDate) {
      return publishDate && moment(publishDate).date;
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