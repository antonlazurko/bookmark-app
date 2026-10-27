<script setup lang="ts">
  import { onMounted } from 'vue'

  import LoadingSpinner from '@/components/LoadingSpinner.vue'
  import { useProfileStore } from '@/stores/profile.store'

  const profileStore = useProfileStore()
  const avatarSrc = `${import.meta.env.BASE_URL}avatar.png`

  onMounted(() => {
    profileStore.fetchProfile()
  })
</script>

<template>
  <div class="profile-avatar">
    <img :src="avatarSrc" class="profile-avatar__image" alt="User avatar" />
    <LoadingSpinner v-if="profileStore.isLoading" size="18"></LoadingSpinner>
    <div v-else-if="profileStore.error">{{ profileStore.error }}</div>
    <div v-else-if="profileStore.profile">
      Hello, <strong>{{ profileStore.profile.name }}</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .profile-avatar {
    display: flex;
    align-items: center;
    box-sizing: content-box;
    padding-left: 15px;
    gap: 20px;
    font-size: 18px;
    &__image {
      width: 60px;
      height: 60px;
    }
    @media (max-width: 768px) {
      gap: 14px;
      font-size: 16px;
      &__image {
        width: 48px;
        height: 48px;
      }
    }
  }
</style>
