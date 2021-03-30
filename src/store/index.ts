import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { user } from "@/store/modules/user";
import { RootState } from "@/types";
import { posts } from "@/store/modules/posts";

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
