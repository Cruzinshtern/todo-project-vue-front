<script lang="ts" setup>
import TodoCardComponent from '@/components/TodoCardComponent.vue'
import type { Todo } from '@/interfaces/Todo.inteface'
import { TodoService } from '@/services/TodoService'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const todos = ref<Todo[]>([])
const isLoading = ref(true)
const router = useRouter()
const toast = useToast()

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
    todos.value = todos.value.filter((todo: Todo) => todo._id !== data.id)
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
    const response = await TodoService.getFavorites()
    console.log('response', response)

    todos.value = response
  } catch (e) {
    console.log('e', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadTodos)
</script>
<template>
  <div class="flex gap-4 p-3" v-if="!isLoading">
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
  <div v-if="isLoading" class="flex justify-center items-center">
    <p>Loading...</p>
  </div>
</template>
