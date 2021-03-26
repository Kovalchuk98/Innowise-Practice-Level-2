<template>
  <div class="item_wrapper">
    <img :src="post.imgUrl" alt="" width="auto" />
    <div class="bottom_wrapper">
      <span
        >Created by
        <span class="name_label" @click="$emit('search', post.author)">{{
          post.author
        }}</span></span
      >
      <span>{{ post.date }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    post: {
      type: Object
    }
  }
});
</script>

<style lang="scss" scoped>
.item_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  margin-bottom: 20px;
  width: 100%;
  img {
    max-width: 100%;
    max-height: 200px;
  }
  .bottom_wrapper {
    background-color: #ffa825;
    display: flex;
    align-items: center;
    padding: 0;
    width: 100%;
    justify-content: space-between;
    span {
      color: #fff;
      padding: 5px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .name_label {
        cursor: pointer;
        font-weight: bolder;
        color: #f82b24;
      }
    }
  }
}

@media (min-width: 768px) {
  .item_wrapper {
    img {
      max-width: 100%;
      max-height: 350px;
    }
  }
}
</style>
