<script lang="ts" setup>
import type { Todo } from '@/interfaces/Todo.inteface'
import { statusTransform } from '@/helpers/statusTransform.helper'
import type { TodoStatus } from '@/types/TodoStatus.type'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (event: 'delete', value: string): void
  (event: 'edit', value: string): void
  (event: 'updateFavStatus', value: { id: string; isFavorite: boolean }): void
}>()

const handleDelete = () => props.todo._id && emit('delete', props.todo._id)
const handleEdit = () => props.todo._id && emit('edit', props.todo._id)
const handleStatusChange = () => {
  return (
    props.todo._id &&
    emit('updateFavStatus', { id: props.todo._id, isFavorite: !props.todo.isFavorite })
  )
}
</script>
<template>
  <div class="border rounded min-w-xs">
    <div class="flex gap-2 justify-end">
      <div
        v-if="!todo.isFavorite"
        class="btn border flex justify-center items-center cursor-pointer hover:text-white hover:bg-orange-500"
        @click="handleStatusChange"
      >
        <i class="pi pi-heart"></i>
      </div>
      <div
        v-if="todo.isFavorite"
        class="btn border flex justify-center items-center cursor-pointer text-white bg-orange-500"
        @click="handleStatusChange"
      >
        <i class="pi pi-heart"></i>
      </div>
      <div
        class="btn border flex justify-center items-center cursor-pointer hover:text-white hover:bg-green-500"
        @click="handleEdit"
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
    <div>Status: {{ statusTransform(props.todo.status as TodoStatus) }}</div>
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
