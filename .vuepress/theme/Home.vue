<template>
  <BaseLayout>
    <section class="banner">
      <div class="banner-intro">
        <div class="h2-bold text-white">Bootstrap 4 Blog - A free template by Bootstrap Temple</div>
        <div class="link">Discover More</div>
      </div>
    </section>
    <section class="container">
      <!-- intro -->
      <div class="intro row">
        <div class="col-lg-6">
          <div class="h2-bold">Some great intro here</div>
          <div
            class="text-big"
          >Place a nice introduction here to catch reader's attention. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderi.</div>
        </div>
      </div>
      <!-- TOP 3 POSTS start -->
      <div
        class="row top3"
        v-for="(post, index) of top3Posts"
        :key="post.title"
        :class="{'reverse': index % 2 !== 0}"
      >
        <div class="col-lg-7">
          <div class="pd-15">
            <div class="h4-bold">{{post.category}}</div>
            <div class="h2-bold">{{post.title}}</div>
            <div class="text">{{post.desc}}</div>
            <div class="footer">
              <div class="date">
                <i class="fa fa-clock-o"></i>
                <span>{{post.date}}</span>
              </div>
              <div class="comments">
                <i class="fa fa-comment-o"></i>
                <span>{{post.comments}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <img :src="post.pic" alt />
        </div>
      </div>
      <!-- TOP 3 POSTS  end -->
    </section>
    <!-- divider banner -->
    <section class="banner" :style="{'background-image': `url(/divider-bg.jpg)`}">
      <div class="banner-intro">
        <div
          class="h2-bold text-white"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
        <div class="link">Discover More</div>
      </div>
    </section>
    <!-- divider banner -->
    <!-- latest posts -->
    <section class="latest-posts">
      <div class="container">
        <div class="h2-bold">Latest Posts</div>
        <div class="text-big">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
        <div class="row">
          <div class="col-lg-3" v-for="(post, index) of latestPosts" :key="post.title">
            <div class="container">
              <div class="img">
                <img :src="post.pic" alt width="100%" />
              </div>
              <div class="space-between text pdv-15">
                <div class="date">
                  <i class="fa fa-clock-o"></i>
                  <span>{{post.date}}</span>
                </div>
                <div class="comments">
                  <i class="fa fa-comment-o"></i>
                  <span>{{post.comments}}</span>
                </div>
              </div>
              <div class="h2-bold">{{post.title}}</div>
              <div class="text">{{post.desc}}</div>
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
          <div class="mix col-lg-3" v-for="(item, index) of gallery" :key="index">
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
      top3Posts: [
        {
          category: "BUSINESS TECHNOLOGY",
          title: "Alberto Savoia Can Teach You About Interior",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
          date: "2020-10-1",
          comments: "12",
          pic: require("../public/blog-1.jpg"),
        },
        {
          category: "BUSINESS TECHNOLOGY",
          title: "Alberto Savoia Can Teach You About Interior",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
          date: "2020-10-1",
          comments: "12",
          pic: require("../public/blog-2.jpg"),
        },
        {
          category: "BUSINESS TECHNOLOGY",
          title: "Alberto Savoia Can Teach You About Interior",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
          date: "2020-10-1",
          comments: "12",
          pic: require("../public/blog-3.jpg"),
        },
      ],
      latestPosts: [
        {
          category: "BUSINESS TECHNOLOGY",
          title: "Alberto Savoia Can Teach You About Interior",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
          date: "2020-10-1",
          comments: "12",
          pic: require("../public/blog-1.jpg"),
        },
        {
          category: "BUSINESS TECHNOLOGY",
          title: "Alberto Savoia Can Teach You About Interior",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
          date: "2020-10-1",
          comments: "12",
          pic: require("../public/blog-2.jpg"),
        },
        {
          category: "BUSINESS TECHNOLOGY",
          title: "Alberto Savoia Can Teach You About Interior",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
          date: "2020-10-1",
          comments: "12",
          pic: require("../public/blog-3.jpg"),
        },
        {
          category: "BUSINESS TECHNOLOGY",
          title: "Alberto Savoia Can Teach You About Interior",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
          date: "2020-10-1",
          comments: "12",
          pic: require("../public/blog-3.jpg"),
        },
      ],
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
  },
  methods: {
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