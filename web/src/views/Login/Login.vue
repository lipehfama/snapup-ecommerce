<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

const handleLogin = async () => {
  const success = await authStore.login({
    username: username.value.trim(),
    password: password.value
  });

  if (!success) {
    return;
  }

  const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";

  await router.push(redirect);
};
</script>

<template>
  <main class="auth-page">
    <form class="auth-panel" aria-labelledby="login-title" @submit.prevent="handleLogin">
      <header class="auth-panel__heading">
        <h1 id="login-title">Welcome back</h1>

        <p>Log in to your SnapUp account</p>
      </header>

      <label class="auth-field">
        <span>Username</span>

        <span class="auth-input">
          <i class="bi bi-person" aria-hidden="true"></i>

          <input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            autocomplete="username"
            required
          />
        </span>
      </label>

      <label class="auth-field">
        <span>Password</span>

        <span class="auth-input">
          <i class="bi bi-lock" aria-hidden="true"></i>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            required
          />
        </span>
      </label>

      <p v-if="authStore.error" class="auth-error" role="alert">
        {{ authStore.error }}
      </p>

      <button type="submit" class="auth-submit" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? "Logging in..." : "Log in" }}
      </button>

      <p class="auth-divider">or</p>

      <p class="auth-switch">
        Don't have an account?

        <router-link to="/register"> Register here </router-link>
      </p>

      <aside class="auth-notice">
        <strong> Public DummyJSON demo account </strong>

        <br />

        Username:
        <code>emilys</code>

        <br />

        Password:
        <code>emilyspass</code>
      </aside>
    </form>
  </main>
</template>

<style scoped lang="scss">
@use "./Login.scss";
</style>
