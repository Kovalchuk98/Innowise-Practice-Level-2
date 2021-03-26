import Vue from "vue";
import App from "./App.vue";
import { fireAuth } from "./firebase";
import router from "./router";
import store from "./store";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { PluginOptions } from "vue-toastification/dist/types/src/types";

const options: PluginOptions = {
  draggable: false,
  position: POSITION.TOP_CENTER
};

Vue.use(Toast, options);

Vue.config.productionTip = false;

let app: any;
fireAuth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
  if (user) {
    const { uid, email, displayName, photoURL } = user;
    store.commit("user/setUser", {
      uid,
      email,
      displayName,
      photoURL
    });
  }
});
