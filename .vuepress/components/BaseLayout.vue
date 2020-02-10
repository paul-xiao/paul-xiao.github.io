<template>
<div class="theme-container">
 <Header :site="site" :config="config"/>
 <div class="theme-content">
   <slot></slot>
 </div>
 <Footer />
</div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
 export default {
   name: 'BaseLayout',
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