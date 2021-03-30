<template>
  <div class="gallery_wrapper">
    <h2>Gallery</h2>
    <div class="search_wrapper">
      <input
        type="text"
        placeholder="Search by author"
        @keydown.enter="findAuthor(search)"
        v-model="search"
      />
      <button class="clear_btn" v-if="search" @click="clear">X</button>
      <button class="search_btn" @click="findAuthor">Search</button>
    </div>

    <gallery-item
      v-for="post of searchArray ? searchArray : articles"
      :key="post.tsp"
      :post="post"
      @search="searchByAuthor"
    />
    <button
      class="load_btn"
      v-if="articles.length >= 4 && totalSize <= articles.length && isEmpty"
      @click="loadMore"
    >
      Load more
    </button>
    <h3 v-if="!isEmpty && searchArray.length === 0">No results found</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GalleryItem from "@/components/GalleryItem.vue";
import { mapGetters } from "vuex";
import { Post, PostState } from "@/types";

export default Vue.extend({
  components: { GalleryItem },
  props: {
    posts: {
      type: Array
    }
  },
  data() {
    return {
      searchArray: null,
      search: "",
      totalSize: 4,
      isEmpty: true
    };
  },
  computed: {
    ...mapGetters("posts", ["getPosts"]),
    articles: {
      get(): PostState {
        const articleList = this.getPosts;
        return articleList.slice(0, this.totalSize);
      }
    }
  },

  methods: {
    loadMore(): void {
      this.totalSize *= 2;
    },
    clear(): void {
      this.search = "";
      this.findAuthor();
    },
    searchByAuthor(value: string): void {
      this.search = value;
      this.findAuthor();
    },
    findAuthor(): void {
      if (this.search) {
        this.searchArray = this.getPosts.filter((item: Post) => {
          return item.author.toLowerCase() === this.search.toLowerCase();
        });
        this.isEmpty = false;
      } else {
        this.searchArray = null;
        this.isEmpty = true;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.gallery_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  h2 {
    width: 100%;
    padding: 0;
  }
  .search_wrapper {
    display: flex;
    width: 100%;
    margin: 0 0 20px 0;
    input {
      border: 1px solid black;
      width: 100%;
      padding: 4px;
    }
    .clear_btn,
    .search_btn {
      cursor: pointer;
      margin-left: 4px;
      border: none;
      border-radius: 4px;
    }
    .clear_btn {
      background-color: #fc0d0d;
      color: #fff;
      transition: 0.4s all;
      &:hover,
      :active {
        background-color: #ff6a6a;
      }
    }
    .search_btn {
      background-color: #6b5bff;
      color: #fff;
      transition: 0.4s all;
      &:hover,
      :active {
        background-color: #9388fd;
      }
    }
  }
  .load_btn {
    cursor: pointer;
    margin-bottom: 30px;
    height: 40px;
    width: 100%;
    color: #fff;
    border-radius: 1.2rem;
    border: none;
    background-color: #ec721a;
    transition: 0.4s all;
    &:hover,
    :active {
      background-color: #f1893f;
    }
  }
}

@media (min-width: 540px) {
  .gallery_wrapper {
    width: 60%;
  }
}

@media (min-width: 1024px) {
  .gallery_wrapper {
    width: 40%;
  }
}
</style>
