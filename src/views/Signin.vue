<template>
  <div class="wrapper">
    <div class="login_form">
      <div class="input_wrapper">
        <h1>Sign In</h1>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input_wrapper">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="buttons_wrapper">
        <button type="submit" class="signin_btn" @click="signin">
          <span>Sign In</span>
        </button>
        <p class="btn_title">Or Sign In with</p>
        <button @click="signInGoogle" class="google_btn">
          <img
            src="../assets/google.png"
            alt=""
            width="30px"
            height="auto"
          /><span>Sign in with Google</span>
        </button>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link :to="{ name: 'register' }">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import Routes from "@/router/approutes";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions("user", ["logIn", "signInWithGoogle"]),
    signin(): void {
      this.logIn({
        email: this.email,
        password: this.password
      }).then(() => {
        this.email = "";
        this.password = "";
        this.$router.push(Routes.Home);
      });
    },
    signInGoogle(): void {
      this.signInWithGoogle().then(() => {
        this.$router.push(Routes.Home);
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #fff !important;
  width: 100%;
  .login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    .input_wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      width: 80%;
      h1 {
        align-self: flex-start;
      }
      input {
        height: 1.8rem;
      }
    }
    .buttons_wrapper {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      .signin_btn,
      .google_btn {
        width: 100%;
        cursor: pointer;
      }
      .signin_btn {
        padding: 12px 0;
        background-color: #ffa825;
        color: #fff;
        transition: 0.4s ease;
        border: none;
        border-radius: 10px;
        &:hover,
        :active {
          background-color: #fcbf65;
        }
      }
      .btn_title {
        width: 100%;
        text-align: center;
      }
      .google_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        span {
          margin-left: 10px;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .wrapper {
    .login_form {
      width: 70%;
      .input_wrapper,
      .buttons_wrapper {
        width: 70%;
      }
    }
  }
}

@media (min-width: 1024px) {
  .wrapper {
    .login_form {
      width: 60%;
      .input_wrapper,
      .buttons_wrapper {
        width: 60%;
      }
    }
  }
}
</style>
