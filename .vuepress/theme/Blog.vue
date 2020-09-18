<template>
  <BaseLayout>
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <List :pages="pages" />
        </div>
        <div class="col-lg-4">
          <ListArchives />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../components/BaseLayout";
import List from "../components/List";
import ListArchives from "../components/ListArchives";
export default {
  name: "Blog",
  computed: {
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