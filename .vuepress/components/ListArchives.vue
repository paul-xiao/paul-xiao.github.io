<template>
  <div class="side-archives">
    <div class="widget search">
      <div class="h4-bold">Search Post</div>
      <div class="form-group">
        <input type="search" placeholder="What are you looking for?" />
        <span class="submit">
          <i class="fa fa-search"></i>
        </span>
      </div>
    </div>
    <div class="widget group-by-month">
      <div class="h4-bold">Latest Posts</div>
      <div class="latest-posts">
        <div v-for="(post, index) of pages" :key="post.title" v-if="index < 3">  
         <router-link :to="post.path" class="latest-post">
           <div class="img">
           <img :src="post.frontmatter.thumbnail || '/blog-1.jpg'" alt="">
         </div>
         <div class="roundup">
           <h4 class="title">{{post.title}}</h4>
           <span class="text"><i class="fa fa-eye"></i> 12</span> 
           <span class="text"><i class="fa fa-comment-o"></i> 12</span>
         </div>
         </router-link>
        </div>
      </div>
    </div>

    
    <div class="widget group-by-categories">
      <h4>Categories :</h4>
      <div
        v-for="category in categories"
        class="category"
        @click="handleClick(category[0])"
      ><span class="text-dark">{{`${category[0]} `}}</span>
      <span>{{`${category[1]}`}}</span></div>
    </div>
    <div class="widget group-by-tags">
      <h4>Tags :</h4>
      <span v-for="tag in tags" class="tag" @click="handleClick(tag[0])">{{`#${tag[0]}`}}</span>
    </div>
  </div>
</template>

<script>
import moment from "../utils/moment";
export default {
  name: "ListArchives",
  data() {
    return {
      monthly: null,
    };
  },
  props: {
    pages: {
      type:Array
    }
  },
  computed: {
    monthes() {
      const map = new Map();
      this.pages.forEach((e) => {
        const Month = moment(e.frontmatter.date).getMonth();
        if (map.has(Month)) {
          map.set(Month, [...map.get(Month), e]);
        } else {
          map.set(Month, [].concat(e));
        }
      });
      return map;
    },
    tags() {
      const map = new Map();
      this.pages.forEach((e) => {
        const tags = e.frontmatter.tags;

        if (tags) {
          for (const tag of tags) {
            if (map.has(tag)) {
              map.set(tag, map.get(tag) + 1);
            } else {
              map.set(tag, 1);
            }
          }
        }
      });
      return map;
    },
    categories() {
      const map = new Map();
      this.pages.forEach((e) => {
        const categories = e.frontmatter.categories;
        if (categories) {
          for (const tag of categories) {
            if (map.has(tag)) {
              map.set(tag, map.get(tag) + 1);
            } else {
              map.set(tag, 1);
            }
          }
        }
      });
      return map;
    },
  },
  mounted() {
    console.log(this.pages)
  },
  methods: {
    handleClick(filter) {
      this.$router.push({
        path: "/",
        query: {
          filter: filter,
        },
      });
    },
    handleMoment(date) {
      return moment(date).date;
    },
  },
};
</script>