<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import Button from '@/components/Button.vue'
  import CancelIcon from '@/components/icons/CancelIcon.vue'
  import DeleteIcon from '@/components/icons/DeleteIcon.vue'
  import EditIcon from '@/components/icons/EditIcon.vue'
  import SaveIcon from '@/components/icons/SaveIcon.vue'
  import InputDefault from '@/components/InputDefault.vue'
  import LoadingSpinner from '@/components/LoadingSpinner.vue'
  import { useBookmarksStore } from '@/stores/bookmarks.store'
  import { useCategoriesStore } from '@/stores/categories.store'

  const route = useRoute()
  const router = useRouter()
  const categoriesStore = useCategoriesStore()
  const bookmarksStore = useBookmarksStore()
  const isEditMode = ref(false)
  const form = ref<string>('')

  const category = computed(() => categoriesStore.getCategoryByAlias(route.params.alias))

  const onClickEdit = () => {
    form.value = category.value?.name ?? ''
    isEditMode.value = true
  }
  const onSubmit = async () => {
    if (!form.value) return
    if (category.value?.name === form.value) {
      isEditMode.value = false
      return
    }
    const updated = await categoriesStore.updateCategory(category.value?.id ?? 0, form.value)
    if (updated) await router.replace({ name: 'category', params: { alias: updated.alias } })
    isEditMode.value = false
  }
  const onClickCancel = () => (isEditMode.value = false)

  const onClickDelete = async () => {
    if (!category.value) return
    await categoriesStore.deleteCategory(category.value.id)
    await router.push({ name: 'home' })
  }

  watch(
    category,
    (value) => {
      if (value) {
        bookmarksStore.getBookmarksByCategory(value.id)
        isEditMode.value = false
      }
    },
    { immediate: true },
  )
</script>

<template>
  <div class="category">
    <LoadingSpinner v-if="categoriesStore.isLoading" size="24"></LoadingSpinner>
    <template v-else>
      <div v-if="!isEditMode" class="category__header">
        <h1 class="category__title">{{ category?.name }}</h1>
        <div class="category__action-button">
          <Button @click="onClickDelete">
            <template #icon>
              <DeleteIcon size="18" color="var(--color-volcano)" />
            </template>
          </Button>
          <Button @click="onClickEdit">
            <template #icon>
              <EditIcon size="18" color="var(--color-green)" />
            </template>
          </Button>
        </div>
      </div>
      <form v-else class="category__form" @submit.prevent="onSubmit">
        <label for="category">Change category name:</label>
        <InputDefault v-model="form" placeholder="Category name" name="category" />
        <Button type="button" @click="onClickCancel">
          <template #icon>
            <CancelIcon color="var(--color-volcano)" size="10" />
          </template>
        </Button>
        <Button type="submit">
          <template #icon>
            <SaveIcon size="12" color="var(--color-green)" />
          </template>
        </Button>
      </form>
    </template>
    <ul>
      <li v-for="bookmark in bookmarksStore.bookmarks" :key="bookmark.id">
        <a :href="bookmark.url" target="_blank">{{ bookmark.title ?? bookmark.url }}</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .category {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    &__title {
      font-size: 24px;
      font-weight: 500;
    }
    &__action-button {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
    &__form {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      label {
        white-space: nowrap;
      }
    }
  }
</style>
