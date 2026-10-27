<script setup lang="ts">
  import { computed, ref, watch } from 'vue'

  import Button from '@/components/Button.vue'
  import PlusIcon from '@/components/icons/PlusIcon.vue'
  import InputDefault from '@/components/InputDefault.vue'
  import LoadingSpinner from '@/components/LoadingSpinner.vue'
  import PopupBase from '@/components/PopupBase.vue'
  import { useBookmarksStore } from '@/stores/bookmarks.store'

  const { categoryId } = defineProps<{ categoryId: number }>()
  const bookmarksStore = useBookmarksStore()
  const isOpened = ref(false)
  const form = ref({ url: '', title: '', image: '' })
  const isImageBroken = ref(false)

  // Accept "example.com" as well as full links
  const toUrl = (input: string) => {
    const value = input.trim()
    if (!value) return undefined
    try {
      const parsed = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
      return parsed.hostname.includes('.') ? parsed.href : undefined
    } catch {
      return undefined
    }
  }

  const url = computed(() => toUrl(form.value.url))
  const image = computed(() => toUrl(form.value.image))
  const error = computed(() => {
    if (form.value.url.trim() && !url.value) return 'Enter a valid link'
    if (url.value && bookmarksStore.bookmarks.some((b) => b.url === url.value)) {
      return 'This link is already in the category'
    }
    if (form.value.image.trim() && !image.value) return 'Enter a valid image link'
    return undefined
  })

  watch(image, () => (isImageBroken.value = false))

  const onClickOpen = () => {
    form.value = { url: '', title: '', image: '' }
    isOpened.value = true
  }
  const onSubmit = async () => {
    if (!url.value || error.value) return
    const created = await bookmarksStore.createBookmark({
      category_id: categoryId,
      url: url.value,
      title: form.value.title.trim() || undefined,
      image: image.value,
    })
    if (created) isOpened.value = false
  }
</script>

<template>
  <button type="button" class="add-bookmark-card" aria-label="Add bookmark" @click="onClickOpen">
    <PlusIcon size="56" color="var(--color-inactive)" />
  </button>
  <PopupBase v-model:open="isOpened" title="New bookmark">
    <template #default="{ close }">
      <form class="add-bookmark-form" @submit.prevent="onSubmit">
        <label for="bookmark-url">Link:</label>
        <InputDefault
          id="bookmark-url"
          v-model="form.url"
          placeholder="https://example.com"
          name="bookmark-url"
          :disabled="bookmarksStore.isCreating"
        />
        <label for="bookmark-title">Title:</label>
        <InputDefault
          id="bookmark-title"
          v-model="form.title"
          placeholder="From the page"
          name="bookmark-title"
          :disabled="bookmarksStore.isCreating"
        />
        <label for="bookmark-image">Image link:</label>
        <InputDefault
          id="bookmark-image"
          v-model="form.image"
          placeholder="From the page"
          name="bookmark-image"
          :disabled="bookmarksStore.isCreating"
        />
        <div v-if="image && !isImageBroken" class="add-bookmark-form__preview">
          <img :src="image" alt="Image preview" @error="isImageBroken = true" />
        </div>
        <p v-if="error" class="add-bookmark-form__error">{{ error }}</p>
        <p v-else-if="image && isImageBroken" class="add-bookmark-form__error">
          Image can't be loaded, check the link
        </p>
        <p v-else class="add-bookmark-form__hint">
          Leave title or image empty to take them from the page
        </p>
        <div class="add-bookmark-form__actions">
          <LoadingSpinner v-if="bookmarksStore.isCreating" size="24" />
          <Button type="button" @click="close">Cancel</Button>
          <Button
            type="submit"
            class="add-bookmark-form__submit"
            :disabled="!url || !!error || bookmarksStore.isCreating"
          >
            Add
          </Button>
        </div>
      </form>
    </template>
  </PopupBase>
</template>

<style scoped lang="scss">
  .add-bookmark-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 280px;
    border: 2px dashed var(--color-bg-hover);
    border-radius: 30px;
    background: transparent;
    cursor: pointer;
    transition:
      border-color 0.2s ease-in-out,
      transform 0.2s ease-in-out;
    :deep(svg) {
      transition: color 0.2s ease-in-out;
    }
    &:hover,
    &:focus-visible {
      border-color: var(--color-green);
      transform: scale(1.02);
      outline: none;
      :deep(svg) {
        color: var(--color-green) !important;
      }
    }
  }
  .add-bookmark-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__preview {
      height: 140px;
      border-radius: 20px;
      overflow: hidden;
      background: var(--color-bg-hover);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__hint {
      color: var(--color-inactive);
      font-size: 12px;
    }
    &__error {
      color: var(--color-volcano);
      font-size: 12px;
    }
    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 8px;
    }
    &__submit {
      background: var(--color-green);
      color: #fff;
    }
  }
</style>
