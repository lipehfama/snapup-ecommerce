<script setup lang="ts">
import { useRouter } from "vue-router";

import Navbar from "../Navbar/Navbar.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  authStore.logout();

  await router.push("/");
};
</script>

<template>
  <header class="header text-white">
    <nav class="container">
      <div class="header-cnt">
        <section class="header-cnt-top fs-5 py-3 d-flex align-items-center justify-content-between">
          <aside class="header-cnt-top-l">
            <ul class="d-flex top-links align-items-center">
              <li>
                <router-link to="/"> Seller Center </router-link>
              </li>

              <li class="vert-line"></li>

              <li>
                <router-link to="/download"> Download </router-link>
              </li>

              <li class="vert-line"></li>

              <li class="d-flex align-items-center">
                <span class="fs-5"> Follow us on </span>

                <ul class="social-links d-flex align-items-center">
                  <li class="mx-2">
                    <a
                      aria-label="facebook"
                      href="www.facebook.com"
                      class="fs-5 p-2 d-inline-flex align-items-center justify-content-center"
                    >
                      <i class="bi bi-facebook"></i>
                    </a>
                  </li>

                  <li class="mx-2">
                    <a
                      aria-label="instagram"
                      href="www.instagram.com"
                      class="fs-5 p-2 d-inline-flex align-items-center justify-content-center"
                    >
                      <i class="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>

          <aside class="header-cnt-top-r">
            <ul class="top-links d-flex align-items-center">
              <li>
                <router-link to="/support" class="top-link-itm">
                  <span class="top-link-itm-ico mx-2">
                    <i class="bi bi-question-circle-fill"></i>
                  </span>

                  <span class="top-link-itm-txt"> Support </span>
                </router-link>
              </li>

              <li class="vert-line"></li>

              <!-- Logged-in user -->
              <template v-if="authStore.isAuthenticated">
                <li>
                  <router-link to="/profile" class="top-link-itm header-user">
                    <img
                      v-if="authStore.user?.image"
                      :src="authStore.user.image"
                      :alt="authStore.fullName"
                      class="header-user-avatar"
                    />

                    <i v-else class="bi bi-person-circle" aria-hidden="true"></i>

                    <span class="top-link-itm-txt">
                      {{ authStore.fullName }}
                    </span>
                  </router-link>
                </li>

                <li class="vert-line"></li>

                <li>
                  <button type="button" class="header-auth-button" @click="handleLogout">
                    Log out
                  </button>
                </li>
              </template>

              <!-- Guest -->
              <template v-else>
                <li>
                  <router-link to="/register">
                    <span class="top-link-itm-txt"> Register </span>
                  </router-link>
                </li>

                <li class="vert-line"></li>

                <li>
                  <router-link to="/login">
                    <span class="top-link-itm-txt"> Log in </span>
                  </router-link>
                </li>
              </template>
            </ul>
          </aside>
        </section>

        <section class="header-cnt-bottom">
          <Navbar />
        </section>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use "./Header.scss";
</style>
