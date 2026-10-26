<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import Button from '@/components/Button.vue'
  import EnterIcon from '@/components/icons/EnterIcon.vue'

  const router = useRouter()

  const onClickEnter = () => {
    router.push({ name: 'home' })
  }
</script>

<template>
  <div class="auth">
    <h1 class="auth__title">Bookmarkly</h1>
    <Button @click="onClickEnter">
      <template #icon>
        <EnterIcon color="var(--color-fg)" />
      </template>
      Enter
    </Button>
  </div>
</template>

<style scoped lang="scss">
  .auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    &__title {
      margin: 30px;
      font-size: 48px;
      font-weight: 600;
    }
  }
</style>
