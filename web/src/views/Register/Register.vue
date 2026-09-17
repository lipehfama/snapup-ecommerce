<template>
  <main class="auth-page">
    <form class="auth-panel auth-panel--register" aria-labelledby="register-title">
      <header class="auth-panel__heading">
        <h1 id="register-title">Create your account</h1>
        <p>Join SnapUp and start exploring</p>
      </header>

      <label class="auth-field"
        ><span>First name</span
        ><span class="auth-input"
          ><i class="bi bi-person" aria-hidden="true"></i
          ><input type="text" placeholder="Enter your first name" autocomplete="given-name" /></span
      ></label>
      <label class="auth-field"
        ><span>Last name</span
        ><span class="auth-input"
          ><i class="bi bi-person" aria-hidden="true"></i
          ><input type="text" placeholder="Enter your last name" autocomplete="family-name" /></span
      ></label>
      <label class="auth-field"
        ><span>Email</span
        ><span class="auth-input"
          ><i class="bi bi-envelope" aria-hidden="true"></i
          ><input type="email" placeholder="Enter your email" autocomplete="email" /></span
      ></label>
      <label class="auth-field"
        ><span>Username</span
        ><span class="auth-input"
          ><i class="bi bi-person" aria-hidden="true"></i
          ><input type="text" placeholder="Choose a username" autocomplete="username" /></span
      ></label>
      <label class="auth-field"
        ><span>Password</span
        ><span class="auth-input"
          ><i class="bi bi-lock" aria-hidden="true"></i
          ><input type="password" placeholder="Create a password" autocomplete="new-password" /><i
            class="bi bi-eye"
            aria-hidden="true"
          ></i></span
      ></label>
      <label class="auth-field"
        ><span>Confirm password</span
        ><span class="auth-input"
          ><i class="bi bi-lock" aria-hidden="true"></i
          ><input
            type="password"
            placeholder="Confirm your password"
            autocomplete="new-password" /><i class="bi bi-eye" aria-hidden="true"></i></span
      ></label>

      <button type="button" class="auth-submit">Create account</button>
      <p class="auth-switch">
        Already have an account?<router-link to="/login">Log in here</router-link>
      </p>
      <aside class="auth-notice">
        Demo interface — authentication will be connected with DummyJSON API soon.
      </aside>
    </form>
  </main>
</template>

<style scoped lang="scss">
@use "../Login/Login.scss";
</style>
