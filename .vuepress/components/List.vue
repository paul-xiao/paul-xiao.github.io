<template>
  <div class="list-wrap">
    <div class="list" v-if="list">
    <div class="list-item" v-for="page in list">
      <div class="list-item-head">
       <router-link :to="page.path" class="title">{{page.title}}</router-link>
         <small>      <span class="publish-date">{{publishDate(page.publishDate)}}</span>
</small>
       </div>
      <div v-html="page.excerpt" class="list-item-excerpt"></div>
      <div class="list-item-head"> <small><span class="tags" v-for="tag in page.frontmatter.tags">
         <span class="tag" @click="handleClick(tag)">
           {{` #${tag}`}}
         </span>
       </span>
       <span class="categories" v-for="category in page.frontmatter.categories">
         <span class="category" @click="handleClick(category)">{{` @${category}`}}</span>
       </span>
       </small></div>
    </div>
  </div>
  <Pagination :pageNum="pageNum" v-model="currentPage"/>
  </div>
</template>
<script>
import moment from '../utils/moment'
import Pagination from "./Pagination";
export default {
  name: 'List',
  data() {
    return {
      defaultNumPerPage: 5,
      currentPage: 0
    }
  },
  props: {
    pages: {
      type: Array
    }
  },
  computed: {
    pageNum() {
      return Math.ceil(this.pages.length / this.defaultNumPerPage )
    },
    list() {
      console.log(this.pages.slice(this.currentPage*this.defaultNumPerPage, (this.currentPage+1) * this.defaultNumPerPage))
      return this.pages.slice(this.currentPage*this.defaultNumPerPage, (this.currentPage+1) * this.defaultNumPerPage)
    }
  },
  methods: {
    publishDate(publishDate) {
      return moment(publishDate).date
    },
    handleClick(filter) {
      this.$emit('filter', filter)
    }
  }
}
</script>