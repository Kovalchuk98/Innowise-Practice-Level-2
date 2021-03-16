<template>
  <div class="item_wrapper">
    <img src="../assets/logo.png" alt="" width="160px" height="auto" />
    <div class="bottom_wrapper">
      <span>Created by Aleko</span>
      <span>15.03.2021</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
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
  .bottom_wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
