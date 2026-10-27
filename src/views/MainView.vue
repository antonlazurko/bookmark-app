<script setup lang="ts">
  import CategoryList from '@/components/CategoryList.vue'
  import ProfileView from '@/components/ProfileView.vue'
</script>

<template>
  <div class="app">
    <nav class="nav">
      <ProfileView />
      <CategoryList />
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    display: flex;
    gap: 200px;
    min-height: 100vh;
    padding-top: 30px;
    margin: 0 auto;
  }
  .nav {
    min-width: 320px;
  }
  main {
    width: 100%;
  }
</style>
