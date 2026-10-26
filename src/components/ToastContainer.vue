<script setup lang="ts">
  import { useToastStore } from '@/stores/toast.store'

  const toastStore = useToastStore()
</script>

<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="toast" class="toast-container">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="['toast', `toast--${toast.type}`]"
        role="alert"
      >
        <span class="toast__message">{{ toast.message }}</span>
        <button class="toast__close" aria-label="Close" @click="toastStore.remove(toast.id)">
          &times;
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped lang="scss">
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 320px;
  }

  .toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    border-left: 4px solid;
    border-radius: 8px;
    background: var(--color-bg);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    &--success {
      border-color: #22c55e;
    }
    &--warning {
      border-color: #f59e0b;
    }
    &--error {
      border-color: #ef4444;
    }

    &__message {
      flex: 1;
      word-break: break-word;
    }

    &__close {
      padding: 0;
      border: none;
      background: none;
      color: var(--color-inactive);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;

      &:hover {
        color: var(--color-fg);
      }
    }
  }

  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
