<script setup lang="ts">
  import { ref } from 'vue'

  import DeleteIcon from '@/components/icons/DeleteIcon.vue'
  import LinkIcon from '@/components/icons/LinkIcon.vue'
  import type { IBookmark } from '@/interfaces/bookmark.interface'
  import { useBookmarksStore } from '@/stores/bookmarks.store.ts'

  import Button from './Button.vue'
  import PopupConfirm from './PopupConfirm.vue'

  const { title, image, url, id, category_id } = defineProps<IBookmark>()
  const bookmarkStore = useBookmarksStore()
  const isOpened = ref<boolean>(false)

  function openLink() {
    window.open(url, '_blank')
  }

  function deleteBookmark() {
    bookmarkStore.deleteBookmark(id, category_id)
  }
</script>

<template>
  <div class="bookmark-card">
    <div class="bookmark-card__image" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="bookmark-card__title">
      {{ title }}
    </div>
    <div class="bookmark-card__footer">
      <Button @click="isOpened = !isOpened">
        <template #icon>
          <DeleteIcon color="var(--color-volcano)" />
        </template>
      </Button>
      <Button @click="openLink">
        <LinkIcon size="18" color="var(--color-light-blue)" />
      </Button>
    </div>
    <PopupConfirm
      v-model:open="isOpened"
      title="Are you sure you want to delete this bookmark?"
      confirm-text="Delete"
      @confirm="deleteBookmark"
    />
  </div>
</template>

<style scoped>
  .bookmark-card {
    border-radius: 30px;
    background: var(--color-fg);
    box-shadow: 0px 10px 10px 0px rgba(245, 245, 247, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .bookmark-card__image {
    min-height: 160px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
  }
  .bookmark-card__title {
    color: var(--color-bg);
    font-size: 16px;
    font-weight: 500;
  }
  .bookmark-card__footer {
    display: flex;
    justify-content: space-between;
  }
</style>
