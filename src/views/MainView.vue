<script setup lang="ts">
  import { onBeforeUnmount, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import CategoryList from '@/components/CategoryList.vue'
  import ProfileView from '@/components/ProfileView.vue'

  const route = useRoute()
  // Mobile only: the nav becomes a drawer opened by the burger button
  const isMenuOpen = ref(false)

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') isMenuOpen.value = false
  }

  watch(
    () => route.fullPath,
    () => (isMenuOpen.value = false),
  )
  watch(isMenuOpen, (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
    if (value) document.addEventListener('keydown', onKeydown)
    else document.removeEventListener('keydown', onKeydown)
  })
  onBeforeUnmount(() => {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
  })
</script>

<template>
  <div class="app">
    <header class="mobile-header">
      <button
        type="button"
        class="burger"
        :class="{ 'burger--open': isMenuOpen }"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMenuOpen"
        aria-controls="main-nav"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <span class="mobile-header__title">Bookmarkly</span>
    </header>
    <Transition name="fade">
      <div v-if="isMenuOpen" class="nav-overlay" @click="isMenuOpen = false"></div>
    </Transition>
    <nav id="main-nav" class="nav" :class="{ 'nav--open': isMenuOpen }">
      <ProfileView />
      <CategoryList />
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    display: flex;
    gap: 20px;
    min-height: 100vh;
    padding-top: 30px;
    margin: 0 auto;
  }
  .nav {
    flex-shrink: 0;
    min-width: 320px;
  }
  main {
    width: 100%;
    min-width: 0;
  }
  .mobile-header,
  .nav-overlay {
    display: none;
  }

  @media (max-width: 768px) {
    .app {
      flex-direction: column;
      gap: 0;
      padding-top: 0;
    }
    .mobile-header {
      position: sticky;
      top: 0;
      z-index: 800;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--color-bg);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      &__title {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .nav-overlay {
      position: fixed;
      inset: 0;
      z-index: 899;
      display: block;
      background: rgba(28, 28, 28, 0.35);
      backdrop-filter: blur(2px);
    }
    .nav {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 900;
      width: min(300px, 85vw);
      min-width: 0;
      padding: 20px 0;
      overflow-y: auto;
      background: var(--color-bg);
      box-shadow: 8px 0 32px rgba(0, 0, 0, 0.18);
      transform: translateX(-100%);
      visibility: hidden;
      transition:
        transform 0.25s ease,
        visibility 0.25s;
      &--open {
        transform: translateX(0);
        visibility: visible;
      }
    }
  }

  .burger {
    position: relative;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 10px;
    background: transparent;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    span {
      position: absolute;
      left: 10px;
      width: 20px;
      height: 2px;
      border-radius: 2px;
      background: var(--color-fg);
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;
      &:nth-child(1) {
        top: 13px;
      }
      &:nth-child(2) {
        top: 19px;
      }
      &:nth-child(3) {
        top: 25px;
      }
    }
    &--open span {
      &:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
