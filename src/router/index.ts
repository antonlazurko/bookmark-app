import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
    },
    {
      path: '/main',
      name: 'home',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/IndexView.vue'),
        },
        {
          path: '/main/new',
          name: 'add-edit-category',
          component: () => import('@/views/AddEditCategoryView.vue'),
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

export default router
