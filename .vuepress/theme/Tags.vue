<template>
  <BaseLayout>
    <div class="tags">
        <h1>Tags</h1>
        <div class="group-by-tags">
          <h4>group by tags :</h4>
            <span v-for="tag in tags" class="tag" @click="handleClick(tag[0])">{{`${tag[0]}  ${tag[1]}`}}</span>
        </div>
        <div class="group-by-categories">
         <h4> group by categories :</h4>
            <span v-for="category in categories" class="category" @click="handleClick(category[0])">{{`${category[0]}  ${category[1]}`}}</span>
        </div>
    </div>
  </BaseLayout>
</template>
<script>
  import BaseLayout from '../components/BaseLayout'
  import moment from "../utils/moment";
  export default {
      name: 'Tags',
      data() {
        return {
          monthly: null
        }
      },
      computed: {
        pages() {
         return this.$site.pages.filter(e => e.path.match(/^\/blog\//))
        },
        date() {
          const map = new Map()
          this.pages.forEach(e => {
            const moments = moment(e.publishDate)
            if(map.has(moments.date)){
              map.set(moments.date, map.get(moments.date) + 1)
            }else {
              map.set(moments.date, 1)
            }
          })
          return map
        },
        tags() {
          const map = new Map()
          this.pages.forEach(e => {
            const tags = e.frontmatter.tags
            
            if(tags){
              for(const tag of tags) {
                if(map.has(tag)){
                  map.set(tag, map.get(tag) + 1)
                }else {
                  map.set(tag, 1)
                }
              }
            }
          })
          return map
        },
        categories() {
          const map = new Map()
          this.pages.forEach(e => {
            const categories = e.frontmatter.categories
            if(categories){
              for(const tag of categories) {
                if(map.has(tag)){
                  map.set(tag, map.get(tag) + 1)
                }else {
                  map.set(tag, 1)
                }
              }
            }
          })
          return map
        }
      },
      methods: {
        handleClick(filter) {
          this.$router.push({
            path: '/',
            query: {
              filter: filter
            }
          })
        }
      }
  }
</script>