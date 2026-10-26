<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import { getProfile } from './api/services.ts'
  import ProfileView from './components/ProfileView.vue'
  import type { IProfile } from './interfaces/profile'

  const profile = ref<IProfile>()

  onMounted(async () => {
    profile.value = await getProfile()
  })
</script>

<template>
  <div class="app">
    <nav class="nav">
      <ProfileView v-if="profile" :name="profile?.name" />
    </nav>
    <main>Section</main>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    display: flex;
    gap: 200px;
    min-height: calc(100vh - 140px);
    min-width: 1450px;
    margin: 140px auto 0 auto;
  }
  .nav {
    min-width: 320px;
  }
  main {
    width: 100%;
  }
</style>
