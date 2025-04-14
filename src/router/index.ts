import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      meta: { hideNavbar: true },
      redirect: '/auth/register',
      children: [
        {
          path: 'register',
          component: () => import('@/views/RegisterView.vue'),
        },
        {
          path: 'login',
          component: () => import('@/views/LoginView.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/create-todo',
      name: 'createTodo',
      component: () => import('@/views/CreateTodoView.vue'),
    },
    {
      path: '/edit-todo',
      name: 'editTodo',
      component: () => import('@/views/EditTodoView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/Error404View.vue'),
    },
  ],
})

export default router
