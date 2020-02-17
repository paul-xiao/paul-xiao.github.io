<template>
  <div class="theme-header" v-if="site">
    <div class="left">
       <router-link to="/">{{site.title}}</router-link>
    </div>
    <div class="nav">
      <div class="search-box">
        <input type="text">
      </div>
      <ul>
        <li v-for="item in config.nav">
          <router-link :to="item.link">
           {{
            item.text
          }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {

    }
  },
  props: {
   site: {
     type: Object
   },
   config: {
     type: Object
   }
  }
}
</script>