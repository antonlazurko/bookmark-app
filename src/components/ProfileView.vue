<script setup lang="ts">
  type ProfileAvatarProps = {
    name: string
  }
  const { name } = defineProps<ProfileAvatarProps>()
</script>

<template>
  <div class="profile-avatar">
    <img src="/avatar.png" class="profile-avatar__image" alt="User avatar" />
    <div>
      Hello, <strong>{{ name }}</strong>
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
