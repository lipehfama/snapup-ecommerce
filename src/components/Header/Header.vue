<script setup lang="ts">
import Navbar from "../Navbar/Navbar.vue";
</script>

<template>
  <header class="header text-white">
    <nav class="container">
      <div class="header-cnt">
        <section class="header-cnt-top fs-5 py-3 d-flex align-items-center justify-content-between">
          <aside class="header-cnt-top-l">
            <ul class="d-flex top-links align-items-center">
              <li>
                <router-link to="/seller">Seller Center</router-link>
              </li>
              <li class="vert-line"></li>
              <li>
                <router-link to="/download">Download</router-link>
              </li>
              <li class="vert-line"></li>
              <li class="d-flex align-items-center">
                <span class="fs-5">Follow us on</span>
                <ul class="social-links d-flex align-items-center">
                  <li class="mx-2">
                    <a aria-label="facebook" href="www.facebook.com" class="fs-5 p-2 d-inline-flex align-items-center justify-content-center">
                      <i class="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li class="mx-2">
                    <a aria-label="instagram" href="www.instagram.com" class="fs-5 p-2 d-inline-flex align-items-center justify-content-center">
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
                <router-link to="/" class="top-link-itm">
                  <span class="top-link-itm-ico mx-2">
                    <i class="bi bi-question-circle-fill"></i>
                  </span>
                  <span class="top-link-itm-txt">Support</span>
                </router-link>
              </li>
              <li class="vert-line"></li>
              <li>
                <router-link to="/">
                  <span class="top-link-itm-txt">Register</span>
                </router-link>
              </li>
              <li class="vert-line"></li>
              <li>
                <router-link to="/">
                  <span class="top-link-itm-txt">Log in</span>
                </router-link>
              </li>
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
