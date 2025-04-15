import { LocalStorageService } from '@/services/LocalStorageService'
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
      path: '/edit-todo/:id',
      name: 'editTodo',
      props: true,
      component: () => import('@/views/EditTodoView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/TodoListView.vue'),
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

const isAuthenticated = () => !!LocalStorageService.getToken()

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth', '/auth/login', '/auth/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isAuthenticated()) {
    return next('/auth/login')
  }

  if ((to.path === '/auth' || publicPages.includes(to.path)) && isAuthenticated()) {
    return next('/')
  }

  next()
})

export default router
