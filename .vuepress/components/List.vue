<template>
  <div class="list-wrap">
    <div class="container" v-if="list">
      <div class="row">
        <div class="post col-lg-6" v-for="page in list">
          <div class="post-thumbnail">
            <router-link :to="page.path">
              <img :src="page.frontmatter.thumbnail || 'blog-1.jpg'" alt />
            </router-link>
          </div>
          <div class="post-details pdv-15">
            <div class="space-between text">
              <span>
                <span class="date">
                  <span>{{ publishDate(page.frontmatter.date) }}</span>
                </span>
              </span>
              <small>
                <span class="tags" v-for="tag in page.frontmatter.tags">
                  <span class="tag" @click="handleClick(tag)">{{
                    ` #${tag}`
                  }}</span>
                </span>
                <span
                  class="categories"
                  v-for="category in page.frontmatter.categories"
                >
                  <span class="category" @click="handleClick(category)">{{
                    ` @${category}`
                  }}</span>
                </span>
                <span class="sticked" v-if="page.frontmatter.stick"
                  >sticked</span
                >
              </small>
            </div>
            <div class="h2-bold">{{ page.frontmatter.title }}</div>
            <div v-html="page.excerpt" class="text-big"></div>
            <div class="text pdv-15">
              <span>
                <span class="date">
                  <i class="fa fa-clock-o"></i>
                  <span>{{ timeDiff(page.lastUpdated) }}</span>
                </span>
                 <span>
                  <i class="fa fa-eye"></i>
                 <!-- id 将作为查询条件 -->
              <span :id="page.path" class="leancloud_visitors" data-flag-title="Your Article Title">
                  <i class="leancloud-visitors-count">0</i>
              </span>
                </span>
                <span class="comments">
                  <i class="fa fa-comment-o"></i>
                  <span class="valine-comment-count" :data-xid="page.path">0</span>
                </span></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pageNum="pageNum" v-model="currentPage" />
  </div>
</template>
<script>
import moment from "../utils/moment";
import timeDiff from "../utils/timeDiff";
import Pagination from "./Pagination";
import Breadcrumbs from "./Breadcrumbs";
import ListArchives from "./ListArchives";
export default {
  name: "List",
  data() {
    return {
      defaultNumPerPage: 10,
      currentPage: 0,
      timeDiff: timeDiff,
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
    counts() {
      const dom = document.getElementsByClassName('.gt-link-counts')
      console.log(dom)
      const c = dom && dom[0] && dom[0].textContent
      return c || 0
    }
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