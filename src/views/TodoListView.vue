<script lang="ts" setup>
import { TodoService } from '@/services/TodoService'
import { onMounted } from 'vue'

onMounted(async () => {
  try {
    const todos = await TodoService.getAllTodos()
    console.log('todos', todos)
  } catch (e) {
    console.log('e', e)
  }
})
</script>
<template>
  <div>Todo List</div>
</template>
