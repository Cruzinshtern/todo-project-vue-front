<script lang="ts" setup>
import TodoFormComponent from '@/components/TodoFormComponent.vue'
import type { BasicTodo } from '@/interfaces/Todo.inteface'
import { TodoService } from '@/services/TodoService'

const handleCreateTodo = async (form: BasicTodo) => {
  try {
    const todo = await TodoService.createTodo(form)
    console.log('todo', todo)
  } catch (e) {
    console.log('e', e)
  }
}
</script>
<template>
  <div class="h-screen flex justify-center items-center">
    <TodoFormComponent class="w-1/2" title="Create Todo" @created-todo="handleCreateTodo" />
  </div>
</template>
