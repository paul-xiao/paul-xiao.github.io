<template>
  <div class="list-wrap">
    <div class="container" v-if="list">
      <div class="row">
        <div class="post col-lg-6" v-for="page in list">
          <div class="post-thumbnail">
            <router-link :to="page.path">
              <img :src="page.frontmatter.url || 'blog-1.jpg'" alt />
            </router-link>
          </div>
          <div class="post-details pdv-15">
            <div class="space-between text">
              <span>
                <span class="date">
                  <i class="fa fa-clock-o"></i>
                  <span>{{publishDate(page.frontmatter.date)}}</span>
                </span>
                <span class="comments">
                  <i class="fa fa-comment-o"></i>
                  <span>12</span>
                </span>
              </span>
              <small>
                <span class="tags" v-for="tag in page.frontmatter.tags">
                  <span class="tag" @click="handleClick(tag)">{{` #${tag}`}}</span>
                </span>
                <span class="categories" v-for="category in page.frontmatter.categories">
                  <span class="category" @click="handleClick(category)">{{` @${category}`}}</span>
                </span>
                <span class="sticked" v-if="page.frontmatter.stick">sticked</span>
              </small>
            </div>
            <div class="h2-bold">{{page.frontmatter.title}}</div>
            <div v-html="page.excerpt" class="text-big"></div>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pageNum="pageNum" v-model="currentPage" />
  </div>
</template>
<script>
import moment from "../utils/moment";
import Pagination from "./Pagination";
import Breadcrumbs from "./Breadcrumbs";
import ListArchives from "./ListArchives";
export default {
  name: "List",
  data() {
    return {
      defaultNumPerPage: 10,
      currentPage: 0,
    };
  },
  props: {
    pages: {
      type: Array,
    },
  },
  computed: {
    pageNum() {
      return Math.ceil(this.pages.length / this.defaultNumPerPage);
    },
    list() {
      return this.pages.slice(
        this.currentPage * this.defaultNumPerPage,
        (this.currentPage + 1) * this.defaultNumPerPage
      );
    },
  },
  methods: {
    publishDate(publishDate) {
      return moment(publishDate).date;
    },
    handleClick(filter) {
      this.$emit("filter", filter);
    },
  },
};
</script>