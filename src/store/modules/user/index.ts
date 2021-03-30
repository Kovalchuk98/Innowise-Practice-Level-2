import { Module } from "vuex";
import { RootState, UserState } from "@/types";
import { fireAuth, GoogleProvider } from "@/firebase";
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
    async signUp(
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
    async logIn(
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
    async logOut({ commit }): Promise<void> {
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
