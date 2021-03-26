import { ActionContext, Module, Store } from "vuex";
import { RootState } from "@/types/index";
import { UserState } from "@/types/index";
import { fireAuth, GoogleProvider, fireStorage, fireDb } from "@/firebase";
import Vue from "vue";

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setUser(state, payload: object) {
      state.user = payload;
    }
  },
  actions: {
    async signup(
      context,
      {
        email,
        password,
        displayName
      }: { email: string; password: string; displayName: string }
    ): Promise<void> {
      try {
        await fireAuth.createUserWithEmailAndPassword(email, password);
        const usera: any = fireAuth.currentUser;
        usera.updateProfile({
          displayName
        });
      } catch (e) {
        Vue.$toast.warning(e.message);
      }
    },
    async login(
      context,
      { email, password }: { email: string; password: string }
    ): Promise<void> {
      try {
        await fireAuth.signInWithEmailAndPassword(email, password);
      } catch (e) {
        Vue.$toast.warning(e.message);
      }
    },
    async signInWithGoogle(): Promise<void> {
      try {
        await fireAuth.signInWithPopup(GoogleProvider);
      } catch (e) {
        Vue.$toast.warning(e.message);
      }
    },
    async logout({ commit }): Promise<void> {
      await fireAuth.signOut();
      commit("setUser", {});
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
};
