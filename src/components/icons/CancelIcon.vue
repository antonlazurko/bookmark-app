<script setup lang="ts">
  defineOptions({ inheritAttrs: false })
  const { size = 24, color = '#000000' } = defineProps<{
    size?: number | string
    color?: string
  }>()
</script>
<template>
  <svg
    :width="size"
    :height="size"
    :style="{ color }"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g
      id="Free-Icons"
      stroke="none"
      stroke-width="1"
      fill="currentColor"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g
        id="Group"
        transform="translate(-157.000000, -158.000000)"
        stroke="currentColor"
        stroke-width="2"
      >
        <g id="Shape" transform="translate(153.000000, 154.000000)">
          <path d="M19,5 L5,19 M19,19 L5,5" fill="currentColor"></path>
        </g>
      </g>
    </g>
  </svg>
</template>
