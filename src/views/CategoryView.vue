<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import { useBookmarksStore } from '@/stores/bookmarks.store'
  import { useCategoriesStore } from '@/stores/categories.store'

  const route = useRoute()
  const categoriesStore = useCategoriesStore()
  const bookmarksStore = useBookmarksStore()

  const category = computed(() => categoriesStore.getCategoryByAlias(route.params.alias))

  watch(
    category,
    (value) => {
      if (value) bookmarksStore.getBookmarksByCategory(value.id)
    },
    { immediate: true },
  )
</script>

<template>
  <h1>{{ category?.name }}</h1>
  <ul>
    <li v-for="bookmark in bookmarksStore.bookmarks" :key="bookmark.id">
      <a :href="bookmark.url" target="_blank">{{ bookmark.title ?? bookmark.url }}</a>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
