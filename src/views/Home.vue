<template>
  <div class="home">
    <gallery :posts="posts" />
  </div>
</template>

<script lang="ts">
import Gallery from "@/components/Gallery.vue";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import { PostState } from "@/types";
export default Vue.extend({
  components: { Gallery },
  name: "Home",
  computed: {
    ...mapGetters("posts", ["getPosts"]),
    name: {
      get(): string {
        return this.$store.state.user.user;
      }
    },
    posts: {
      get(): PostState {
        return this.getPosts;
      }
    }
  },
  created() {
    this.fetchFromDb();
  },
  methods: {
    ...mapActions("posts", ["fetchFromDb"])
  }
});
</script>

<style lang="scss" scoped></style>
