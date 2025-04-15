<script lang="ts" setup>
import TodoCardComponent from '@/components/TodoCardComponent.vue'
import type { Todo } from '@/interfaces/Todo.inteface'
import { TodoService } from '@/services/TodoService'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const todos = ref<Todo[]>([])
const isLoading = ref(true)
const router = useRouter()

const handleDeleteTodo = (id: string) => console.log('id', id)
const handleEditTodo = (id: string) => router.push(`/edit-todo/${id}`)

onMounted(async () => {
  try {
    const response = await TodoService.getAllTodos()
    todos.value = response.data
  } catch (e) {
    console.log('e', e)
  } finally {
    isLoading.value = true
  }
})
</script>
<template>
  <div class="flex gap-4 p-3">
    <TodoCardComponent
      v-for="todo in todos"
      :key="todo._id"
      :todo="todo"
      class="p-2"
      @delete="handleDeleteTodo"
      @edit="handleEditTodo"
    />
  </div>
</template>
