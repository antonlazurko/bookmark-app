<script setup lang="ts"></script>

<template>
  <div class="index">
    <h1 class="index__header">Welcome to Bookmarkly</h1>
    <p class="index__description">To start using Bookmarkly, please choose a category.</p>
  </div>
</template>

<style lang="scss" scoped>
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    &__header {
      font-size: 24px;
      font-weight: 500;
    }

    &__description {
      margin-top: 20px;
      font-size: 18px;
    }
  }
</style>
