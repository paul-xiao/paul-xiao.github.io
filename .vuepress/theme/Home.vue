<template>
  <BaseLayout>
    <section class="banner">
      <div class="banner-intro">
        <div class="h2-bold text-white">
          Bootstrap 4 Blog - A free template by Bootstrap Temple
        </div>
        <div class="link">
          <router-link to="/blog.html">Discover More</router-link>
        </div>
      </div>
    </section>
    <section class="container">
      <!-- intro -->
      <div class="intro row">
        <div class="col-lg-6">
          <div class="h2-bold">intro</div>
          <div class="text-big">recod coding skills and issues</div>
        </div>
      </div>
      <!-- TOP 3 POSTS start -->
      <div
        class="row top3"
        v-for="(post, index) of top3Posts"
        :key="post.title"
        :class="{ reverse: index % 2 !== 0 }"
      >
        <div class="col-lg-7">
          <div class="pd-15">
            <div class="h4-bold">{{ post.frontmatter.category }}</div>
            <div class="h2-bold">{{ post.frontmatter.title }}</div>
            <div v-html="post.excerpt" class="text-big"></div>
            <div class="footer">
              <div class="date">
                <i class="fa fa-clock-o"></i>
                <span>{{ publishDate(post.frontmatter.date) }}</span>
              </div>
              <!-- <div class="comments">
                <i class="fa fa-comment-o"></i>
                <span>{{ post.comments }}</span>
              </div> -->
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <img :src="post.frontmatter.thumbnail" alt />
        </div>
      </div>
      <!-- TOP 3 POSTS  end -->
    </section>
    <!-- divider banner -->
    <section
      class="banner"
      :style="{ 'background-image': `url(/divider-bg.jpg)` }"
    >
      <div class="banner-intro">
        <div class="h2-bold text-white">
          gallery: collection of awesome projects
        </div>
        <div class="link">Discover More</div>
      </div>
    </section>
    <!-- divider banner -->
    <!-- latest posts -->
    <section class="latest">
      <div class="container">
        <div class="h2-bold">Latest Posts</div>
        <div class="text-big">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <div class="row">
          <div
            class="col-lg-3"
            v-for="(post, index) of latestPosts"
            :key="post.title"
          >
            <div class="container">
              <div class="img">
                <img :src="post.frontmatter.thumbnail" alt width="100%" />
              </div>
              <div class="space-between text pdv-15">
                <div class="date">
                  <i class="fa fa-clock-o"></i>
                  <span>{{ publishDate(post.frontmatter.date) }}</span>
                </div>
                <!-- <div class="comments">
                  <i class="fa fa-comment-o"></i>
                  <span>{{ post.comments }}</span>
                </div> -->
              </div>
              <div class="h2-bold">{{ post.frontmatter.title }}</div>
              <div v-html="post.excerpt" class="text-big"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- latest post end -->
    <!-- gallery -->
    <section class="gallery">
      <div class="container-fluid">
        <div class="row">
          <div
            class="mix col-lg-3"
            v-for="(item, index) of gallery"
            :key="index"
          >
            <img :src="item.url" alt width="100%" />
          </div>
        </div>
      </div>
    </section>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../components/BaseLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import List from "../components/List";
import moment from "../utils/moment";
export default {
  components: {
    [BaseLayout.name]: BaseLayout,
    [List.name]: List,
  },
  data() {
    return {
      filter: "",
      currentPage: 1,
      pageNum: 1,
      gallery: [
        {
          url: require("../public/gallery-1.jpg"),
        },
        {
          url: require("../public/gallery-2.jpg"),
        },
        {
          url: require("../public/gallery-3.jpg"),
        },
        {
          url: require("../public/gallery-4.jpg"),
        },
      ],
    };
  },
  watch: {
    $route() {
      if (!this.$route.query.filter) {
        this.filter = "";
      }
    },
  },
  mounted() {
    const { filter } = this.$route.query;
    this.filter = filter ? filter : "";
  },
  computed: {
    site() {
      return this.$site;
    },
    config() {
      return this.$themeConfig;
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
    top3Posts() {
      console.log(this.pages);
      return this.pages.filter((e) => e.frontmatter.stick);
    },
    latestPosts() {
      return this.pages.filter((e, index) => index < 4);
    },
  },
  methods: {
    publishDate(publishDate) {
      return moment(publishDate).date;
    },
    handleFilter(filter) {
      this.filter = filter;
      this.$router.push({
        query: {
          filter: filter,
        },
      });
    },
  },
};
</script>