<template>
<BaseLayout>
  <div class="content_default-title">
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
 <Content />
</BaseLayout>
</template>
<script>
import moment from '../utils/moment'
 export default {
   mounted() {
       console.log(this.$page)

   },
   computed: {
     site() {
       console.log(this.$site)
       return this.$site
     },
     config() {
       return this.$themeConfig
     },
     page() {
       return this.$page
     }
   },
   methods: {
     publishDate(publishDate) {
      return moment(publishDate).date
    },
    handleClick() {
      console.log(1)
    }
   }
 }
</script>