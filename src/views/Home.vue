<template>
  <div class="home">
    <button>Paint</button>
    <gallery />
  </div>
</template>

<script lang="ts">
import Gallery from "@/components/Gallery.vue";
import Vue from "vue";
export default Vue.extend({
  components: { Gallery },
  name: "Home",
  computed: {
    name: {
      get(): string {
        return this.$store.state.user.user;
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
