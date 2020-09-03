<template>
 <BaseLayout>
  <div class="banner">
    <div class="intro">
      <div class="main">xx</div>
      <div class="sub">sub</div>
    </div>
  </div>
</BaseLayout>
</template>
<script>
import BaseLayout from '../components/BaseLayout'
import Breadcrumbs from '../components/Breadcrumbs'
import List from '../components/List'
import moment from "../utils/moment";
 export default {
   components: {
     [BaseLayout.name]: BaseLayout,
     [List.name]: List,
   },
   data() {
     return {
       filter: '',
       currentPage: 1,
       pageNum: 1
     }
   },
   watch: {
    $route() {
      if(!this.$route.query.filter){
        this.filter = ''
      }
    }
   },
   mounted() {
      const { filter } = this.$route.query
      this.filter =  filter ? filter : ''
   },
   computed: {
     site() {
       return this.$site
     },
     config() {
       return this.$themeConfig
     },
     pages() {
       const data = this.$site.pages.filter(e => e.id === 'post').sort((a,b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
       const sticked = data.filter(e => e.frontmatter.stick)
       const notsticked = data.filter(e => !e.frontmatter.stick)
       const blogs = sticked.concat(notsticked)
        if(this.filter){
           return blogs.filter(e => (e.frontmatter.tags && e.frontmatter.tags.includes(this.filter)) || (e.frontmatter.categories && e.frontmatter.categories.includes(this.filter)) || (e.frontmatter.date && moment(e.frontmatter.date).getMonth().includes(this.filter)))
         } else {
          return blogs
         }
     }
   },
   methods: {
     handleFilter(filter) {
        this.filter = filter
        this.$router.push({
          query: {
            filter: filter
          }
        })
     }
   }
 }
</script>