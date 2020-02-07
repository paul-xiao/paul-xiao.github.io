<template>
<div class="theme-container">
 <Header :site="site" :config="config"/>
 <Content />
 <Footer />
</div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
 export default {
   components: {
     [Header.name]: Header,
     [Footer.name]: Footer,
   },
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
 }
</script>