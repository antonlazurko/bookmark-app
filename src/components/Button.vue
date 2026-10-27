<script setup lang="ts">
  defineOptions({ inheritAttrs: false })
  const props = defineProps<{ onClick?: (event: MouseEvent) => void }>()
</script>

<template>
  <button
    class="button"
    type="button"
    v-bind="$attrs"
    :class="$attrs.disabled ? 'disabled' : ''"
    @click="props.onClick"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  .button {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
    color: var(--color-fg);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }
  @media (hover: hover) {
    .button:hover {
      transform: scale(1.1);
    }
  }
  .button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
