<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import BookmarkCard from '@/components/BookmarkCard.vue'
  import Button from '@/components/Button.vue'
  import CancelIcon from '@/components/icons/CancelIcon.vue'
  import DeleteIcon from '@/components/icons/DeleteIcon.vue'
  import EditIcon from '@/components/icons/EditIcon.vue'
  import SaveIcon from '@/components/icons/SaveIcon.vue'
  import InputDefault from '@/components/InputDefault.vue'
  import LoadingSpinner from '@/components/LoadingSpinner.vue'
  import PopupConfirm from '@/components/PopupConfirm.vue'
  import { useBookmarksStore } from '@/stores/bookmarks.store'
  import { useCategoriesStore } from '@/stores/categories.store'

  const route = useRoute()
  const router = useRouter()
  const categoriesStore = useCategoriesStore()
  const bookmarksStore = useBookmarksStore()
  const isEditMode = ref(false)
  const isDeleteConfirmOpen = ref(false)
  const form = ref<string>('')

  const category = computed(() => categoriesStore.getCategoryByAlias(route.params.alias))
  const bookmarksCount = computed(() => bookmarksStore.bookmarks.length)
  const bookmarksCountLabel = computed(
    () => `${bookmarksCount.value} ${bookmarksCount.value === 1 ? 'bookmark' : 'bookmarks'}`,
  )

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
          <Button @click="isDeleteConfirmOpen = true">
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
    <PopupConfirm
      v-model:open="isDeleteConfirmOpen"
      title="Delete category?"
      confirm-text="Delete"
      @confirm="onClickDelete"
    >
      Category <b>{{ category?.name }}</b> and its bookmarks will be deleted.
    </PopupConfirm>
    <section class="bookmarks">
      <div class="bookmarks__header">
        <h3 class="bookmarks__title">Bookmarks</h3>
        <span v-if="!bookmarksStore.isLoading" class="bookmarks__count">{{
          bookmarksCountLabel
        }}</span>
      </div>
      <LoadingSpinner v-if="bookmarksStore.isLoading" size="38"></LoadingSpinner>
      <p v-else-if="!bookmarksCount" class="bookmarks__empty">No bookmarks in this category yet</p>
      <TransitionGroup
        v-else
        tag="ul"
        name="bookmark"
        class="bookmarks__list"
        :class="{ 'bookmarks__list--few': bookmarksCount < 3 }"
      >
        <li v-for="item in bookmarksStore.bookmarks" :key="item.id" class="bookmarks__item">
          <BookmarkCard v-bind="item" />
        </li>
      </TransitionGroup>
    </section>
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
  .bookmarks {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
    &__header {
      display: flex;
      align-items: baseline;
      gap: 10px;
      width: 100%;
    }
    &__title {
      font-size: 18px;
      font-weight: 500;
    }
    &__count {
      padding: 2px 10px;
      border-radius: 20px;
      background: var(--color-bg-hover);
      color: var(--color-fg-hover);
      font-size: 12px;
    }
    &__empty {
      width: 100%;
      padding: 40px 20px;
      border: 2px dashed var(--color-bg-hover);
      border-radius: 20px;
      color: var(--color-inactive);
      text-align: center;
    }
    &__list {
      width: 100%;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      // With 1–2 bookmarks don't stretch cards across the whole row
      &--few {
        grid-template-columns: repeat(auto-fill, minmax(260px, 340px));
      }
    }
    &__item {
      display: flex;
      flex-direction: column;
      > * {
        flex: 1;
      }
    }
  }

  .bookmark-enter-active,
  .bookmark-leave-active {
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }
  .bookmark-enter-from,
  .bookmark-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
