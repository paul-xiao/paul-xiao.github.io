<template>
 <BaseLayout>
 <List :pages="pages"/>
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
   mounted() {
       console.log(this)

   },
   computed: {
     site() {
       console.log(this.$site)
       return this.$site
     },
     config() {
       console.log(this.$site)
       return this.$themeConfig
     },
     pages() {
       return this.$site.pages
     }
   },
 }
</script>