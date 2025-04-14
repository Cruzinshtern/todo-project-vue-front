<script lang="ts" setup>
import type { MenuItem } from '@/interfaces/MenuItem.interface'
import { LocalStorageService } from '@/services/LocalStorageService'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const menuItems = ref<MenuItem[]>([
  { id: 1, title: 'Home', isSelected: true, path: '/' },
  { id: 2, title: 'Create', isSelected: false, path: '/create-todo' },
  { id: 3, title: 'Settings', isSelected: false, path: '/settings' },
])

function select(item: MenuItem) {
  menuItems.value.forEach((menuItem) => (menuItem.isSelected = false))
  item.isSelected = true
}

const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  LocalStorageService.deleteToken()
  router.push('/auth/login')
}

watch(
  () => route.fullPath,
  (newPath) => {
    menuItems.value.forEach((item) => {
      item.isSelected = false
      if (newPath === item.path) item.isSelected = true
    })
  },
)
</script>

<template>
  <div class="p-6 bg-green-500 text-white text-xl flex justify-end gap-6">
    <nav class="">
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
</template>
