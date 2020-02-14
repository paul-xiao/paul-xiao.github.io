<template>
  <div class="list" v-if="pages">
    <div class="list-item" v-for="page in pages">
      <div class="list-item-head">
       <a :href="page.path" class="title">{{page.title}}</a>
       <small><span class="tags" v-for="tag in page.frontmatter.tags">
         <span class="tag" @click="handleClick(tag)">
           {{` #${tag}`}}
         </span>
       </span>
       <span class="categories" v-for="category in page.frontmatter.categories">
         <span class="category" @click="handleClick(category)">{{` @${category}`}}</span>
       </span>
       <span class="publish-date">{{publishDate(page.publishDate)}}</span>
       </small>
      </div>
      <div v-html="page.excerpt" class="list-item-excerpt"></div>
    </div>
  </div>
</template>
<script>
import moment from '../utils/moment'
export default {
  name: 'List',
  props: {
    pages: {
      type: Array
    }
  },
  methods: {
    publishDate(publishDate) {
      return Object.values(moment(publishDate)).join(' ')
    },
    handleClick(filter) {
      this.$emit('filter', filter)
    }
  }
}
</script>