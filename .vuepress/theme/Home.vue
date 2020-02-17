<template>
 <BaseLayout>
 <List :pages="pages" @filter="handleFilter"/>
</BaseLayout>
</template>
<script>
import BaseLayout from '../components/BaseLayout'
import List from '../components/List'
 export default {
   components: {
     [BaseLayout.name]: BaseLayout,
     [List.name]: List,
   },
   data() {
     return {
       filter: ''
     }
   },
   watch: {
     $route(){
       console.log(this.$route)
     }
   },
   mounted() {
      const { filter } = this.$route.query
      this.filter =  filter ? filter : ''
      console.log(this.$route.query)
   },
   computed: {
     site() {
       return this.$site
     },
     config() {
       return this.$themeConfig
     },
     pages() {
       const blogs = this.$site.pages.filter(e => e.path.match(/^\/blog\//)).sort((a,b) => new Date(b.publishDate) - new Date(a.publishDate))

        if(this.filter){
           return blogs.filter(e => (e.frontmatter.tags && e.frontmatter.tags.includes(this.filter)) || (e.frontmatter.categories && e.frontmatter.categories.includes(this.filter)))
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