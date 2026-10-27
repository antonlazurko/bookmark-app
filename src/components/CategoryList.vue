<script setup lang="ts">
  import { onMounted } from 'vue'
  import { RouterLink } from 'vue-router'

  import { useAuthStore } from '@/stores/auth.store'
  import { useCategoriesStore } from '@/stores/categories.store'

  import EnterIcon from './icons/EnterIcon.vue'
  import PlusIcon from './icons/PlusIcon.vue'
  import LoadingSpinner from './LoadingSpinner.vue'

  const categoriesStore = useCategoriesStore()
  const authStore = useAuthStore()

  onMounted(() => {
    categoriesStore.ensureCategories()
  })
</script>

<template>
  <ul v-if="categoriesStore.categories && !categoriesStore.isLoading" class="categories-list">
    <li
      v-for="category in categoriesStore.categories"
      :key="category.id"
      class="categories-list__item"
    >
      <RouterLink :to="`/main/${category.alias}`">{{ category.name }}</RouterLink>
    </li>
    <li class="categories-list__item">
      <RouterLink :to="`/main/new`">
        New category <PlusIcon :color="'var(--color-fg-hover)'" />
      </RouterLink>
    </li>
    <li class="categories-list__item">
      <RouterLink :to="`/`" @click="authStore.logout">
        Logout <EnterIcon :color="'var(--color-fg-hover)'" style="rotate: 180deg" />
      </RouterLink>
    </li>
  </ul>
  <div v-if="categoriesStore.isLoading" class="categories-list__empty">
    <LoadingSpinner />
  </div>
</template>

<style scoped lang="scss">
  .categories-list {
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    gap: 24px;
    padding-left: 15px;
    font-size: 24px;
    list-style: none;
    &__empty {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 300px;
      min-height: 500px;
    }
    &__item {
      a {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        text-decoration: none;
        color: var(--color-fg);
        transform-origin: left center;
        transition:
          color 0.2s ease-in-out,
          transform 0.2s ease-in-out;
        &:hover {
          color: var(--color-fg-hover);
          transform: scale(1.1);
        }
        &.router-link-active {
          color: var(--color-fg-hover);
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(161, 61, 61, 0.5);
        }
      }
    }
  }
</style>
