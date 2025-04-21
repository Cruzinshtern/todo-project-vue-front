<script lang="ts" setup>
import { environment } from '@/config/environment'
import type { MenuItem } from '@/interfaces/MenuItem.interface'
import { useUserDataStore } from '@/stores/userDataStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const menuItems = ref<MenuItem[]>([
  { id: 1, title: 'Home', isSelected: true, path: '/home' },
  { id: 2, title: 'Create', isSelected: false, path: '/create-todo' },
  { id: 3, title: 'List', isSelected: false, path: '/list' },
  { id: 4, title: 'Favorites', isSelected: false, path: '/favorites' },
  { id: 5, title: 'Settings', isSelected: false, path: '/settings' },
])

const userStore = useUserDataStore()

function select(item: MenuItem) {
  menuItems.value.forEach((menuItem) => (menuItem.isSelected = false))
  item.isSelected = true
}

const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/auth/login')
}

watch(
  () => route.fullPath,
  (newPath) => {
    menuItems.value.forEach((item) => {
      item.isSelected = false
      if (newPath.includes(item.path)) item.isSelected = true
    })
  },
)

onMounted(() => {
  const token = localStorage.getItem(environment.tokenKey)
  if (token) {
    userStore.setUserFromToken(token)
  }
})
</script>

<template>
  <div class="p-6 bg-green-500 text-white text-xl flex justify-between">
    <span>{{ $t('welcome') }}, {{ userStore.name }}</span>

    <div class="flex gap-4">
      <nav>
        <RouterLink
          class="cursor-pointer"
          v-for="item in menuItems"
          :key="item.id"
          :to="item.path"
          :class="{
            'bg-green-900': item.isSelected,
            'hover:bg-green-800': !item.isSelected,
            'p-2 rounded-sm': true,
          }"
          @click="select(item)"
          >{{ item.title }}</RouterLink
        >
      </nav>
      <div class="cursor-pointer" @click="handleLogout">
        <i class="pi pi-sign-out"></i>
      </div>
    </div>
  </div>
</template>
