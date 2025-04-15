<script lang="ts" setup>
import type { Todo } from '@/interfaces/Todo.inteface'

const props = defineProps<{
  todo: Todo
}>()
</script>
<template>
  <div class="border rounded min-w-xs">
    <div class="flex gap-2 justify-end">
      <div class="btn border flex justify-center items-center cursor-pointer">
        <i class="pi pi-bookmark"></i>
      </div>
      <div class="btn border flex justify-center items-center cursor-pointer">
        <i class="pi pi-trash"></i>
      </div>
    </div>
    <div>Title: {{ props.todo.title }}</div>
    <div>Description: {{ props.todo.description }}</div>
  </div>
</template>

<style scoped>
.btn {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
</style>
