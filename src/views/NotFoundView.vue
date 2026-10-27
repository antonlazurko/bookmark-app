<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import Button from '@/components/Button.vue'
  import EnterIcon from '@/components/icons/EnterIcon.vue'

  const router = useRouter()

  const onClick = () => {
    router.push({ name: 'home' })
  }
</script>

<template>
  <div class="not-found">
    <h1 class="not-found__title">404 Not Found</h1>
    <Button @click="onClick">
      <template #icon>
        <EnterIcon color="var(--color-fg)" />
      </template>
      To Home
    </Button>
  </div>
</template>

<style scoped lang="scss">
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 16px;
    text-align: center;
    &__title {
      margin: 30px;
      font-size: 48px;
      font-weight: 600;
    }
    @media (max-width: 480px) {
      &__title {
        font-size: 32px;
      }
    }
  }
</style>
