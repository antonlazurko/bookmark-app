<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import Button from '@/components/Button.vue'
  import PlusIcon from '@/components/icons/PlusIcon.vue'
  import InputDefault from '@/components/InputDefault.vue'
  import LoadingSpinner from '@/components/LoadingSpinner.vue'
  import { useCategoriesStore } from '@/stores/categories.store'

  const router = useRouter()
  const categoriesStore = useCategoriesStore()
  const form = ref<string>('')

  const name = computed(() => form.value.trim())
  const alias = computed(() => name.value.toLowerCase())
  const error = computed(() => {
    if (alias.value === 'new') return 'This name is reserved'
    if (categoriesStore.getCategoryByAlias(alias.value)) return 'Category already exists'
    return undefined
  })

  const onSubmit = async () => {
    if (!name.value || error.value) return
    const created = await categoriesStore.createCategory(name.value)
    if (created) await router.push({ name: 'category', params: { alias: created.alias } })
  }
</script>

<template>
  <div class="add-category">
    <h1 class="add-category__title">New category</h1>
    <LoadingSpinner v-if="categoriesStore.isLoading" size="24" />
    <form v-else class="add-category__form" @submit.prevent="onSubmit">
      <label for="category">Category name:</label>
      <InputDefault id="category" v-model="form" placeholder="Category name" name="category" />
      <Button type="submit" :disabled="!name || !!error">
        <template #icon>
          <PlusIcon color="var(--color-green)" />
        </template>
        Create
      </Button>
    </form>
    <p v-if="error" class="add-category__error">{{ error }}</p>
    <p v-else-if="alias" class="add-category__hint">URL: /main/{{ alias }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .add-category {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    &__title {
      width: 100%;
      font-size: 24px;
      font-weight: 500;
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
    &__hint {
      width: 100%;
      color: var(--color-inactive);
    }
    &__error {
      width: 100%;
      color: var(--color-volcano);
    }
  }
</style>
