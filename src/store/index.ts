import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";
import { user } from "@/store/modules/user/index";
import { RootState } from "@/types/index";
import { posts } from "@/store/modules/posts/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0"
  },
  modules: {
    user,
    posts
  }
};

export default new Vuex.Store<RootState>(store);
