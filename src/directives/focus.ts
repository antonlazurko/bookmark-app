import type { Directive } from 'vue'

// Focuses the element when it is mounted: <InputDefault v-focus />
export const vFocus: Directive<HTMLElement> = {
  mounted(el) {
    el.focus()
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vFocus: typeof vFocus
  }
}
