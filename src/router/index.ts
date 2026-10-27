import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { useCategoriesStore } from '@/stores/categories.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/NotFoundView.vue'),
    },
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/IndexView.vue'),
        },
        {
          path: '/main/new',
          name: 'add-category',
          component: () => import('@/views/AddCategoryView.vue'),
        },
        {
          path: ':alias',
          name: 'category',
          component: () => import('@/views/CategoryView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.name !== 'auth' && to.name !== '404') {
    return { name: 'auth' }
  }

  if (authStore.isAuthenticated && to.name === 'auth') {
    return { name: 'home' }
  }

  if (to.name !== 'category') return

  const categoriesStore = useCategoriesStore()

  await categoriesStore.ensureCategories()

  if (categoriesStore.error) return

  if (!categoriesStore.getCategoryByAlias(to.params.alias)) {
    return {
      name: '404',
      params: { pathMatch: to.path.substring(1).split('/') },
      query: to.query,
      hash: to.hash,
    }
  }
})

export default router
