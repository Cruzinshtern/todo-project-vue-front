<script lang="ts" setup>
import TodoCardComponent from '@/components/TodoCardComponent.vue'
import TodoTableComponent from '@/components/TodoTableComponent.vue'
import type { Todo } from '@/interfaces/Todo.inteface'
import type { ViewTab } from '@/interfaces/ViewTab.interface'
import { TodoService } from '@/services/TodoService'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const tabs: ViewTab[] = [
  { id: 1, title: 'Tiles', isSelected: true, query: 'tiles' },
  { id: 2, title: 'Table', isSelected: false, query: 'table' },
]

const todos = ref<Todo[]>([])
const isLoading = ref(true)
const activeTab = ref<ViewTab>()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const setTab = (query: string) => {
  tabs.forEach((tab: ViewTab) => {
    tab.isSelected = false
    if (tab.query === query) {
      tab.isSelected = true
      activeTab.value = tab
    }
  })
}

watch(
  () => route.query.tab,
  (newTab) => {
    console.log('newTab', newTab)
    if (!newTab) {
      router.replace({ query: { tab: 'tiles' } })
    } else {
      setTab(newTab as string)
    }
  },
  { immediate: true },
)

const handleDeleteTodo = async (id: string) => {
  try {
    await TodoService.deleteTodo(id)
    toast.success('Todo has been succesfully deleted')
    await loadTodos()
  } catch (e: any) {
    toast.error(`Error deleteing the todo: ${e}`)
  }
}
const handleEditTodo = (id: string) => router.push(`/edit-todo/${id}`)

const handleUpdateFavStatus = async (data: { id: string; isFavorite: boolean }) => {
  try {
    await TodoService.updateTodoStatus(data.id, data.isFavorite)
    const idx = todos.value.findIndex((todo: Todo) => todo._id === data.id)
    todos.value[idx].isFavorite = data.isFavorite
    if (data.isFavorite) {
      toast.success('Todo has been added to favorites')
    } else {
      toast.success('Todo has been removed from favorites')
    }
  } catch (e: any) {
    toast.error(`Unable to add to favorites: ${e}`)
  }
}

const loadTodos = async () => {
  isLoading.value = true
  try {
    const response = await TodoService.getAllTodos()
    todos.value = response.data
  } catch (e) {
    console.log('e', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadTodos)
</script>

<template>
  <div class="flex gap-3 p-2 text-lg items-center">
    <div>View:</div>
    <RouterLink
      v-for="tab in tabs"
      :class="{
        'bg-gray-400 text-white': tab.isSelected,
        'hover:bg-gray-200': !tab.isSelected,
        'p-2 cursor-pointer': true,
      }"
      :key="tab.id"
      :to="{ query: { tab: tab.query } }"
      @click="setTab(tab.query)"
    >
      <span>
        {{ tab.title }}
      </span>
    </RouterLink>
  </div>
  <div class="flex gap-4 p-3" v-if="!isLoading && activeTab?.query === 'tiles'">
    <TodoCardComponent
      v-for="todo in todos"
      :key="todo._id"
      :todo="todo"
      class="p-2"
      @delete="handleDeleteTodo"
      @edit="handleEditTodo"
      @update-fav-status="handleUpdateFavStatus"
    />
  </div>
  <div class="flex gap-4 p-3" v-if="!isLoading && activeTab?.query === 'table'">
    <TodoTableComponent
      class="w-full"
      :todos
      @delete="handleDeleteTodo"
      @edit="handleEditTodo"
      @update-fav-status="handleUpdateFavStatus"
    />
  </div>
  <div v-if="isLoading" class="flex justify-center items-center">
    <p>Loading...</p>
  </div>
</template>
