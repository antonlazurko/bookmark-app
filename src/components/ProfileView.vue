<script setup lang="ts">
  import { onMounted } from 'vue'

  import { useProfileStore } from '@/stores/profile.store'

  const profileStore = useProfileStore()

  onMounted(() => {
    profileStore.fetchProfile()
  })
</script>

<template>
  <div class="profile-avatar">
    <img src="/avatar.png" class="profile-avatar__image" alt="User avatar" />
    <div v-if="profileStore.isLoading">Loading profile....</div>
    <div v-else-if="profileStore.error">{{ profileStore.error }}</div>
    <div v-else-if="profileStore.profile">
      Hello, <strong>{{ profileStore.profile.name }}</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .profile-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    &__image {
      width: 60px;
      height: 60px;
    }
  }
</style>
