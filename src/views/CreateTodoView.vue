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
  <section class="w-1/2">
    <TodoFormComponent title="Create Todo" @created-todo="handleCreateTodo" />
  </section>
</template>
