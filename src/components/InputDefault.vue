<script setup lang="ts">
  const model = defineModel<string>()
</script>
<template>
  <input v-model="model" type="text" class="input-default" />
</template>

<style scoped lang="scss">
  .input-default {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &::placeholder {
      color: var(--color-inactive);
    }
  }
</style>
