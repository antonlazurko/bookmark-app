<script setup lang="ts">
  import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'

  // Shared popup shell: overlay, animation, Esc / outside click to close, focus on open.
  const { title, role = 'dialog' } = defineProps<{
    title: string
    role?: 'dialog' | 'alertdialog'
  }>()
  const emit = defineEmits<{ close: [] }>()
  const isOpen = defineModel<boolean>('open', { default: false })

  const popupRef = ref<HTMLElement>()
  const titleId = useId()

  const close = () => {
    isOpen.value = false
    emit('close')
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  watch(isOpen, async (value) => {
    if (value) {
      document.addEventListener('keydown', onKeydown)
      await nextTick()
      // Focus the first field if there is one, otherwise the popup itself
      const field = popupRef.value?.querySelector<HTMLElement>('input, textarea, select')
      ;(field ?? popupRef.value)?.focus()
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  })
  onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isOpen" class="popup-overlay" @click.self="close">
        <div
          ref="popupRef"
          class="popup"
          :role="role"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
        >
          <h2 :id="titleId" class="popup__title">{{ title }}</h2>
          <slot :close="close"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .popup-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(28, 28, 28, 0.35);
    backdrop-filter: blur(4px);
  }
  .popup {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 380px;
    padding: 24px;
    border-radius: 20px;
    background: var(--color-bg);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
    outline: none;
    &__title {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .popup-enter-active,
  .popup-leave-active {
    transition: opacity 0.2s ease;
    .popup {
      transition: transform 0.2s ease;
    }
  }
  .popup-enter-from,
  .popup-leave-to {
    opacity: 0;
    .popup {
      transform: scale(0.95) translateY(8px);
    }
  }
</style>
