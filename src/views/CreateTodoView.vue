<script lang="ts" setup>
import TodoFormComponent from '@/components/TodoFormComponent.vue'
import type { Todo } from '@/interfaces/Todo.inteface'

const handleCreateTodo = (form: Todo) => {
  console.log('form', form)
}
</script>
<template>
  <section class="w-1/2">
    <TodoFormComponent title="Create Todo" @created-todo="handleCreateTodo" />
  </section>
</template>
