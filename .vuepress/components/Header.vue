<template>
  <div class="theme-header" v-if="site">
    <div class="left">
       <router-link to="/">{{site.title}}</router-link>
    </div>
    <div class="nav">
      <div class="search-box" v-click-outside="clearSearchVal">
        <input type="text" @keyup.prevent="handleKeyUp" v-model="searchVal">
        <SearchResult :result="result"/>
      </div>
      <ul>
        <li v-for="item in config.nav">
          <router-link :to="item.link">
           {{item.text}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SearchResult from '../components/SearchResult'
export default {
  name: 'Header',
  data() {
    return {
      result: [],
      searchVal: ''
    }
  },
  props: {
   site: {
     type: Object
   },
   config: {
     type: Object
   }
  },
  mounted() {
    document.addEventListener('keyup', this.clearSearchVal)
  },
  computed:{
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
    handleKeyUp(e) {
     const { value } = e.target
     this.result = value.length > 2 ? this.pages.filter(e => e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) : []
    },
    clearSearchVal(e){
      if(!e.key || e.key === 'Escape'){
        this.searchVal = ""
        this.result = []
      }
    }
  },
  beforeDestory() {
    document.removeEventListener('keyup', this.clearSearchVal)
  }
}
</script>