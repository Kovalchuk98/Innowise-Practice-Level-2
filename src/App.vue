<template>
  <div id="app">
    <Header :user="user" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/UI/Header.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  components: {
    Header
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    user: {
      get(): object {
        return this.getUser;
      }
    }
  }
});
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter {
  transition: 0.3s ease;
  transform: translateY(-100%);
}
.fade-enter-to {
  transition: 0.3s ease;
  transform: translateX(0%);
}
.fade-leave {
  transition: 0.3s ease;
  transform: translateX(0%);
}
.fade-leave-to {
  transition: 0.3s ease;
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.6s ease;
}
</style>
