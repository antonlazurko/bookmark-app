<script setup lang="ts">
  import ProfileView from './components/ProfileView.vue'
  import ToastContainer from './components/ToastContainer.vue'
</script>

<template>
  <div class="app">
    <nav class="nav">
      <ProfileView />
    </nav>
    <main>Section</main>
  </div>
  <ToastContainer />
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
