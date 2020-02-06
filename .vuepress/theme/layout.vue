<template>
<div class="theme-container">
  <h1>Home</h1>
</div>
</template>
<script>
 export default {
   mounted() {
    console.log(1)
   },
   created() {
    console.log('this')
   }
 }
</script>
<style scoped>
.theme-container{
  background: red
}
</style>