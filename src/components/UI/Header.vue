<template>
  <div class="header">
    <mobileMenu v-if="isShow" @hide="isShow = !isShow" :user="user" />
    <div class="wrapper_btn">
      <button class="menu_btn" @click="isShow = !isShow">
        <img
          src="../../assets/burger.svg"
          alt="Menu_btn"
          width="20px"
          height="auto"
        />
      </button>
      <router-link to="/" class="header_title">Mini Paint</router-link>
      <button
        v-if="$route.path !== '/picture/create' && user.uid"
        class="create_btn"
        @click="$router.push({ path: '/picture/create' })"
      >
        <img
          src="../../assets/palette.svg"
          alt=""
          width="25px"
          height="auto"
        /><span>Create</span>
      </button>
    </div>
    <div class="wrapper_block" v-if="user.uid">
      <div class="user_wrapper">
        <img
          class="user_img"
          :src="user.photoURL || require('../../assets/noimg.png')"
          alt="Avatar"
          width="34px"
          height="34px"
        />
        <span class="user_name">{{ user.displayName || user.email }}</span>
      </div>
      <button @click="signout" class="signout_btn">Sign Out</button>
    </div>
  </div>
</template>

<script>
import mobileMenu from "@/components/UI/Menu.vue";
import { mapActions } from "vuex";
import Routes from "@/router/approutes";

export default {
  props: {
    user: {
      type: Object,
      require: true
    }
  },
  components: {
    mobileMenu
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),
    signout() {
      this.logout().then(() => {
        this.$router.push({ path: Routes.Signin });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffa825;
  height: 2.4rem;
  padding: 0 2.4rem;
  .menuWrapper {
    position: fixed;
    background-color: rgb(87, 85, 85);
    width: 60%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .wrapper_btn {
    display: flex;
    align-items: center;
    .menu_btn {
      padding: 5px;
      cursor: pointer;
      border: none;
      background-color: transparent;
    }
    .header_title {
      text-decoration: none;
      color: #363636;
      font-size: 1.2rem;
      font-weight: bold;
      margin-left: 1rem;
    }
    .create_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-sizing: border-box;
      margin-left: 1rem;
      border: 1px solid black;
      border-radius: 1.6rem;
      font-size: 14px;
      margin-left: 1rem;
      transition: 0.2s linear;
      &:hover,
      :active {
        background-color: #d3d1ce;
      }
    }
  }

  .user_wrapper {
    display: flex;
    align-items: center;
    .user_img {
      border-radius: 17px;
    }
    .user_name {
      margin-left: 0.3rem;
    }
  }
  .wrapper_block {
    display: none;
    align-items: center;
    .signout_btn {
      cursor: pointer;
      border: none;
      border-radius: 1.6rem;
      color: #fff;
      margin-left: 1rem;
      padding: 6px 12px;
      background-color: #4c00ff;
      transition: 0.2s linear;
      &:hover,
      :active {
        background-color: #7036f7;
      }
    }
  }
  @media (min-width: 768px) {
    .wrapper_block {
      display: flex;
    }
    .menu_btn {
      display: none;
    }
  }
}
</style>
