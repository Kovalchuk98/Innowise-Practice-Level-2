<template>
  <div class="gallery_wrapper">
    <gallery-item v-for="(item, index) in 8" :key="index" />
    <button>Load more</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GalleryItem from "@/components/GalleryItem.vue";

export default Vue.extend({
  components: { GalleryItem }
});
</script>

<style lang="scss" scoped>
.gallery_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}
</style>
