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
   mounted() {
       console.log(this.$site.pages.filter(e => e.path.match(/^\/blog\//)))
   },
   computed: {
     site() {
       return this.$site
     },
     config() {
       return this.$themeConfig
     },
     pages() {
       const blogs = this.$site.pages.filter(e => e.path.match(/^\/blog\//))
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
        console.log(this.$route)
     }
   }
 }
</script>