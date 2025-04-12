import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTodoView from '@/views/CreateTodoView.vue'
import EditTodoView from '@/views/EditTodoView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create-todo',
      name: 'createTodo',
      component: CreateTodoView,
    },
    {
      path: '/edit-todo',
      name: 'editTodo',
      component: EditTodoView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
