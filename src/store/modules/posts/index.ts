import { Module } from "vuex";
import { Post, RootState, PostState } from "@/types";
import { fireAuth, fireStorage, fireDb } from "@/firebase";
import Vue from "vue";

export const posts: Module<PostState, RootState> = {
  namespaced: true,
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, payload: Array<Post>) {
      state.posts = payload;
    }
  },
  actions: {
    async saveImg({ dispatch }, url: string): Promise<void> {
      try {
        const imgKey = fireDb
          .ref()
          .child("images")
          .push().key;

        const storageRef = await await fireStorage
          .ref("img")
          .child(imgKey as string)
          .putString(url, "data_url");

        let URL = "";
        storageRef.ref
          .getDownloadURL()
          .then(downloadURL => {
            URL = downloadURL;
          })
          .then(() => {
            dispatch("saveData", URL);
          });
      } catch (e) {
        Vue.$toast.warning(e.message);
      }
    },
    async saveData(context, payload: string): Promise<void> {
      try {
        const imgKey = fireDb
          .ref()
          .child("images")
          .push().key;
        const date = new Date();
        const locale = "ru-RU";
        const day = date.toLocaleString(locale, {
          month: "numeric",
          day: "numeric",
          year: "numeric"
        });
        await fireDb
          .ref("images")
          .child(`user_${fireAuth.currentUser?.uid}`)
          .child(imgKey as string)
          .set({
            imgUrl: payload,
            author:
              fireAuth.currentUser?.displayName || fireAuth.currentUser?.email,
            date: day,
            tsp: Date.now()
          });
      } catch (e) {
        Vue.$toast.warning(e.message);
      }
    },
    async fetchFromDb({ commit }): Promise<void> {
      try {
        await fireDb.ref("images").on("value", snap => {
          const data: Array<object> = [];
          snap.forEach(item => {
            item.forEach(it => {
              data.push(it.val());
            });
          });
          data.sort((a: any, b: any) => {
            return b.tsp - a.tsp;
          });
          commit("setPosts", data);
        });
      } catch (e) {
        Vue.$toast.warning(e.message);
      }
    }
  },
  getters: {
    getPosts(state) {
      return state.posts;
    }
  }
};
