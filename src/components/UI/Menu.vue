<template>
  <transition name="fade">
    <div class="menuWrapper">
      <button @click="$emit('hide')" class="menuWrapper__close">X</button>
      <div v-if="user.uid" class="user_wrapper">
        <img
          class="user_img"
          :src="user.photoURL || require('../../assets/noimg.png')"
          alt="Avatar"
          width="34px"
          height="34px"
        />
        <span class="user_name">{{ user.displayName || user.email }}</span>
      </div>
      <div class="btn_wrapper" v-if="!user.uid">
        <button @click="routeEvent('signin')">
          Sign In
        </button>
        <button @click="routeEvent('register')">Sign Up</button>
      </div>
      <div v-else class="btn_wrapper">
        <button @click="signOut" class="button_out">
          Sign Out
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    ...mapActions("user", ["logOut"]),
    signOut(): void {
      this.logOut().then(() => {
        this.routeEvent("signin");
      });
    },
    routeEvent(value: string): void {
      this.$router.push({ name: value });
      this.$emit("hide");
    }
  }
});
</script>

<style lang="scss">
.menuWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f39201 !important;
  .user_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    .user_img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    .user_name {
      color: #fff;
      font-size: 1.2rem;
      margin-top: 10px;
    }
  }
  .btn_wrapper,
  .button_out {
    margin-top: 10px;
    width: 100%;
  }
  .btn_wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    button {
      cursor: pointer;
      padding: 12px 0;
      color: #fff;
      border-radius: 10px;
      border: 1px solid #ffffff;
      background-color: transparent;
      &:last-of-type {
        margin-top: 5px;
      }
    }
  }
  .menuWrapper__close {
    cursor: pointer;
    width: 40px;
    height: 40px;
    align-self: flex-end;
    border-radius: 20px;
    color: #fff;
    background-color: transparent;
    border: 2px solid #ffffff;
    margin: 5px;
  }
}
</style>
