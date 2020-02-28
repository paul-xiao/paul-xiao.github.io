<template>
<BaseLayout>
  <div class="content__default__wrap">
     <div class="content_default-title">
      <router-link :to="page.path" class="title">{{page.title}}</router-link>
        <small><span class="tags" v-for="tag in page.frontmatter.tags">
          <span class="tag" @click="handleClick(tag)">
            {{` #${tag}`}}
          </span>
        </span>
        <span class="categories" v-for="category in page.frontmatter.categories">
          <span class="category" @click="handleClick(category)">{{` @${category}`}}</span>
        </span>
        <span class="publish-date">{{publishDate(page.frontmatter.date)}}</span>
        </small>
    </div>
    <Content />
 </div>
  <ListArchives />
</BaseLayout>
</template>
<script>
import moment from '../utils/moment'
import ListArchives from "../components/ListArchives"
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
    handleClick(filter) {
      this.$router.push({
            path: '/',
            query: {
              filter: filter
            }
          })
    }
   }
 }
</script>