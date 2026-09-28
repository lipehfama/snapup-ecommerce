<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <main class="profile-page">
    <section v-if="authStore.user" class="profile-card">
      <header class="profile-header">
        <img
          v-if="authStore.user.image"
          :src="authStore.user.image"
          :alt="authStore.fullName"
          class="profile-avatar"
        />

        <i v-else class="bi bi-person-circle profile-avatar-fallback" aria-hidden="true"></i>

        <div>
          <h1>
            {{ authStore.fullName }}
          </h1>

          <p>@{{ authStore.user.username }}</p>
        </div>
      </header>

      <div class="profile-details">
        <div class="profile-detail">
          <span>Email</span>

          <strong>
            {{ authStore.user.email }}
          </strong>
        </div>

        <div class="profile-detail">
          <span>Username</span>

          <strong>
            {{ authStore.user.username }}
          </strong>
        </div>

        <div class="profile-detail">
          <span>Gender</span>

          <strong>
            {{ authStore.user.gender }}
          </strong>
        </div>
      </div>

      <aside class="profile-notice">This profile uses public DummyJSON demonstration data.</aside>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use "./Profile.scss";
</style>
