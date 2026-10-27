<script setup lang="ts">
  import Button from '@/components/Button.vue'
  import PopupBase from '@/components/PopupBase.vue'

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

  const confirm = () => {
    isOpen.value = false
    emit('confirm')
  }
</script>

<template>
  <PopupBase v-model:open="isOpen" :title="title" role="alertdialog" @close="emit('cancel')">
    <template #default="{ close }">
      <p v-if="message || $slots.default" class="popup-confirm__message">
        <slot>{{ message }}</slot>
      </p>
      <div class="popup-confirm__actions">
        <Button @click="close">{{ cancelText }}</Button>
        <Button class="popup-confirm__confirm" @click="confirm">{{ confirmText }}</Button>
      </div>
    </template>
  </PopupBase>
</template>

<style scoped lang="scss">
  .popup-confirm {
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
</style>
