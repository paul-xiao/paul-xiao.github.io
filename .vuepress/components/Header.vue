<template>
  <div class="theme-header" v-if="site">
    <div class="inner">
      <div class="head">
        <div class="nav-bar" @click="show = !show">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="left">
          <router-link to="/">{{site.title}}</router-link>
        </div>
      </div>
      <div class="nav">
        <ul :class="['nav-list', show ? 'show' : '']">
          <li v-for="item in config.nav" class="nav-list-item">
            <router-link
              :to="item.link"
              :class="{'active': $route.path.split('.')[0] === item.link }"
            >{{item.text}}</router-link>
          </li>
          <li class="nav-list-item">
            <i class="fa fa-search"></i> | EN | CN
          </li>
        </ul>
        <!-- <div class="search-box" v-click-outside="clearSearchVal">
          <input type="text" @keyup.prevent="handleKeyUp" v-model="searchVal" placeholder="Search">
          <SearchResult :result="result"/>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import SearchResult from "../components/SearchResult";
export default {
  name: "Header",
  data() {
    return {
      result: [],
      searchVal: "",
      show: false,
    };
  },
  props: {
    site: {
      type: Object,
    },
    config: {
      type: Object,
    },
  },
  watch: {
    $route() {
      this.show = false;
    },
    show() {
      // console.log(1)
    },
  },
  mounted() {
    console.log(this.$route.path);

    document.addEventListener("keyup", this.clearSearchVal);
  },
  computed: {
    pages() {
      const blogs = this.$site.pages
        .filter((e) => e.id === "post")
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

      if (this.filter) {
        return blogs.filter(
          (e) =>
            (e.frontmatter.tags && e.frontmatter.tags.includes(this.filter)) ||
            (e.frontmatter.categories &&
              e.frontmatter.categories.includes(this.filter))
        );
      } else {
        return blogs;
      }
    },
  },
  methods: {
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
    document.removeEventListener("keyup", this.clearSearchVal);
  },
};
</script>