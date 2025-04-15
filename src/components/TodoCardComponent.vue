<script lang="ts" setup>
import type { Todo } from '@/interfaces/Todo.inteface'
import { statusTransform } from '@/helpers/statusTransform.helper'
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{ (event: 'delete', value: string): void }>()

const handleDelete = () => {
  emit('delete', props.todo._id)
}
</script>
<template>
  <div class="border rounded min-w-xs">
    <div class="flex gap-2 justify-end">
      <div
        class="btn border flex justify-center items-center cursor-pointer hover:text-white hover:bg-orange-500"
      >
        <i class="pi pi-bookmark"></i>
      </div>
      <div
        class="btn border flex justify-center items-center cursor-pointer hover:text-white hover:bg-green-500"
      >
        <i class="pi pi-pencil"></i>
      </div>
      <div
        class="btn border flex justify-center items-center cursor-pointer hover:text-white hover:bg-red-500"
        @click="handleDelete"
      >
        <i class="pi pi-trash"></i>
      </div>
    </div>
    <div>Title: {{ props.todo.title }}</div>
    <div>Description: {{ props.todo.description }}</div>
    <div>Status: {{ statusTransform(props.todo.status) }}</div>
    <div>Created at: {{ props.todo.created_at }}</div>
  </div>
</template>

<style scoped>
.btn {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
</style>
