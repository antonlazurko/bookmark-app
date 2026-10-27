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
    viewBox="0 -2 18 18"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g
      id="Free-Icons"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g
        id="Group"
        transform="translate(-452.000000, -85.000000)"
        stroke="currentColor"
        stroke-width="2"
      >
        <g id="Shape" transform="translate(449.000000, 80.000000)">
          <polyline points="4 10.5711735 10.2222222 18 20 6"></polyline>
        </g>
      </g>
    </g>
  </svg>
</template>
