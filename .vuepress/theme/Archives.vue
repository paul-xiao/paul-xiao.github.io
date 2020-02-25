<template>
  <BaseLayout>
    <div class="archives">
        <h1 class="title">Archives</h1>
        <div class="total">
          total blogs : {{pages.length}}
        </div>
        <div v-for="archive in archives" class="archive">
          <h2 class="archive-title">{{archive[0]}}</h2>
          <router-link v-for="item in archive[1]" :to="item.path" class="archive-item">{{`${item.title} -- ${handleMoment(item.frontmatter.date)}`}}</router-link>
        </div>
    </div>
  </BaseLayout>
</template>

<script>
  import BaseLayout from '../components/BaseLayout'
  import moment from "../utils/moment";
  export default {
      name: 'Archives',
      data() {
        return {
          monthly: null
        }
      },
      computed: {
        pages() {
          console.log(this.$site.pages.filter(e => e.path.match(/^\/blog\//)))
         return this.$site.pages.filter(e => e.path.match(/^\/blog\//)).sort((a,b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
        },
        archives() {
          const map = new Map()
          this.pages.forEach(e => {
            const Month = moment(e.frontmatter.date).getMonth()
            if(map.has(Month)){
              map.set(Month, [
                ...map.get(Month),
                e
              ])
            }else {
              map.set(Month, [].concat(e))
            }
          })
          console.log(map)
          return map
        },
      },
      methods: {
        handleClick(e) {
          console.log(e)
          // this.$router.push('/')
        },
        handleMoment(date) {
          return moment(date).date
        }
      }
  }
</script>