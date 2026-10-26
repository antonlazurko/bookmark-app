<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import Button from '@/components/Button.vue'
  import EnterIcon from '@/components/icons/EnterIcon.vue'
  import InputDefault from '@/components/InputDefault.vue'
  import type { ILoginRequest } from '@/interfaces/auth.interface'
  import { useAuthStore } from '@/stores/auth.store'

  const router = useRouter()
  const authStore = useAuthStore()

  const form = ref<ILoginRequest>({ email: '', password: '' })

  const onSubmit = async () => {
    if (!form.value.email || !form.value.password) return
    const success = await authStore.fetchLogin(form.value)
    if (success) router.push({ name: 'home' })
  }
</script>

<template>
  <div class="auth">
    <h1 class="auth__title">Bookmarkly</h1>
    <span v-if="authStore.isLoading">Loading</span>
    <form v-else class="auth__form" @submit.prevent="onSubmit">
      <InputDefault v-model="form.email" placeholder="Email" type="email" />
      <InputDefault v-model="form.password" placeholder="Password" type="password" />
      <p v-if="authStore.error" class="auth__error">{{ authStore.error }}</p>
      <Button type="submit">
        <template #icon>
          <EnterIcon color="var(--color-fg)" />
        </template>
        Login
      </Button>
    </form>
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
    &__form {
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 30px;
    }
    &__error {
      color: red;
      text-align: center;
    }
  }
</style>
