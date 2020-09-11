<template>
  <BaseLayout>
    <div class="banner">
      <div class="banner-intro">
        <div class="h2-bold text-white">Bootstrap 4 Blog - A free template by Bootstrap Temple</div>
        <div class="link">Discover More</div>
      </div>
    </div>
    <div class="container">
      <div class="intro row">
        <div class="col-md-6">
          <div class="h2-bold">Some great intro here</div>
          <div
            class="text-big"
          >Place a nice introduction here to catch reader's attention. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderi.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5">
          <img src="../public/featured-pic-1.jpeg" alt />
        </div>
        <div class="col-lg-7">
          <div class="pd-15">
            <div class="h2-bold">BUSINESSTECHNOLOGY</div>
            <div class="text-big">
              Alberto Savoia Can Teach You About Interior
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod tempor incididunt.
            </div>
          </div>
        </div>
      </div>
    </div>
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