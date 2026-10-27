<script setup lang="ts">
  import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

  import Button from '@/components/Button.vue'

  const {
    title = 'Are you sure?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
  } = defineProps<{
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
  }>()
  const emit = defineEmits<{ confirm: []; cancel: [] }>()
  const isOpen = defineModel<boolean>('open', { default: false })

  const popupRef = ref<HTMLElement>()

  const close = () => {
    isOpen.value = false
    emit('cancel')
  }
  const confirm = () => {
    isOpen.value = false
    emit('confirm')
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  watch(isOpen, async (value) => {
    if (value) {
      document.addEventListener('keydown', onKeydown)
      await nextTick()
      popupRef.value?.focus()
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
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          tabindex="-1"
        >
          <h2 id="popup-title" class="popup__title">{{ title }}</h2>
          <p v-if="message || $slots.default" class="popup__message">
            <slot>{{ message }}</slot>
          </p>
          <div class="popup__actions">
            <Button @click="close">{{ cancelText }}</Button>
            <Button class="popup__confirm" @click="confirm">{{ confirmText }}</Button>
          </div>
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
    &__message {
      color: var(--color-fg-hover);
      line-height: 1.5;
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 8px;
    }
    &__confirm {
      background: var(--color-volcano);
      color: #fff;
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
