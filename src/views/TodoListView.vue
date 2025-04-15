<script lang="ts" setup>
import TodoCardComponent from '@/components/TodoCardComponent.vue'
import type { Todo } from '@/interfaces/Todo.inteface'
import { TodoService } from '@/services/TodoService'
import { onMounted, ref } from 'vue'

const todos = ref<Todo[]>([])
const isLoading = ref(true)

const handleDeleteTodo = (id: string) => console.log('id', id)

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
    />
  </div>
</template>
