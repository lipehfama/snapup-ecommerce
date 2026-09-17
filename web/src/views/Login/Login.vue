<template>
  <main class="auth-page">
    <form class="auth-panel" aria-labelledby="login-title">
      <header class="auth-panel__heading">
        <h1 id="login-title">Welcome back</h1>
        <p>Log in to your SnapUp account</p>
      </header>

      <label class="auth-field">
        <span>Username</span>
        <span class="auth-input"
          ><i class="bi bi-person" aria-hidden="true"></i
          ><input type="text" placeholder="Enter your username" autocomplete="username"
        /></span>
      </label>
      <label class="auth-field">
        <span>Password</span>
        <span class="auth-input"
          ><i class="bi bi-lock" aria-hidden="true"></i
          ><input
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password" /><i class="bi bi-eye" aria-hidden="true"></i
        ></span>
      </label>

      <button type="button" class="auth-submit">Log in</button>
      <p class="auth-divider">or</p>
      <p class="auth-switch">
        Don't have an account?<router-link to="/register">Register here</router-link>
      </p>
      <aside class="auth-notice">
        Demo interface — authentication will be connected with DummyJSON API soon.
      </aside>
    </form>
  </main>
</template>

<style scoped lang="scss">
@use "./Login.scss";
</style>
