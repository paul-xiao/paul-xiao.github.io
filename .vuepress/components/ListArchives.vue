<template>
  <div class="side-archives">
    <div class="widget search">
      <div class="h4-bold">Search Post</div>
      <div class="form-group" v-click-outside="clearSearchVal">
        <input
          type="search"
          @keyup.prevent="handleKeyUp"
          v-model="searchVal"
          placeholder="What are you looking for?"
        />
        <span class="submit">
          <i class="fa fa-search"></i>
        </span>
      </div>
      <SearchResult :result="result" />
    </div>
    <div class="widget group-by-month">
      <div class="h4-bold">Latest Posts</div>
      <div class="latest-posts">
        <div v-for="(post, index) of pages" :key="post.title" v-if="index < 3">
          <router-link :to="post.path" class="latest-post">
            <div class="img">
              <img :src="post.frontmatter.thumbnail || '/blog-1.jpg'" alt="" />
            </div>
            <div class="roundup">
              <h4 class="title">{{ post.title }}</h4>
              <span class="small"
                ><i class="fa fa-clock-o"></i> {{ lastUpdated(post) }}</span
              >
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
      >
        <span class="text-dark">{{ `${category[0]} ` }}</span>
        <span>{{ `${category[1]}` }}</span>
      </div>
    </div>
    <div class="widget group-by-tags">
      <h4>Tags :</h4>
      <span v-for="tag in tags" class="tag" @click="handleClick(tag[0])">{{
        `#${tag[0]}`
      }}</span>
    </div>
  </div>
</template>

<script>
import moment from "../utils/moment";
import timeDiff from "../utils/timeDiff";
export default {
  name: "ListArchives",
  data() {
    return {
      monthly: null,
      searchVal: null,
      result: [],
    };
  },
  props: {
    pages: {
      type: Array,
    },
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
  methods: {
    handleClick(filter) {
      this.$router.push({
        path: "/blog.html",
        query: {
          filter: filter,
        },
      });
    },
    lastUpdated(post) {
      return timeDiff(post.lastUpdated);
    },
    handleMoment(date) {
      return moment(date).date;
    },
    handleKeyUp(e) {
      const { value } = e.target;
      this.result =
        value.length > 2
          ? this.pages.filter((e) =>
              e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            )
          : [];
    },
    clearSearchVal(e) {
      if (!e.key || e.key === "Escape") {
        this.searchVal = "";
        this.result = [];
      }
    },
  },
  beforeDestory() {
    this.searchVal = "";
    this.result = [];
  },
};
</script>