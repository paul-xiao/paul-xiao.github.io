<template>
  <BaseLayout>
     <div class="container">
      <div class="row">
        <div class="col-lg-8">
            <div class="content__default__wrap container">
      <div class="content_default-title">
        <router-link :to="page.path" class="title">{{page.title}}</router-link>
        <small>
          <span class="tags" v-for="tag in page.frontmatter.tags">
            <span class="tag" @click="handleClick(tag)">{{` #${tag}`}}</span>
          </span>
          <span class="categories" v-for="category in page.frontmatter.categories">
            <span class="category" @click="handleClick(category)">{{` @${category}`}}</span>
          </span>
        </small>
      </div>
      <Content />
      <div class="content_default-foot">
        <span class="last-update">last updated at: {{$page.lastUpdated}}</span>
      </div>
    </div>
        </div>
        <div class="col-lg-4">
          <ListArchives :pages="pages" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<script>
import moment from "../utils/moment";
import ListArchives from "../components/ListArchives";
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