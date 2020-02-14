<template>
  <div class="theme-header" v-if="site">
    <div class="left">
       <a href="/">{{site.title}}</a>
    </div>
    <div class="nav">
      <ul>
        <li v-for="item in config.nav">
          <a :href="item.link">
           {{
            item.text
          }}
          </a>
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