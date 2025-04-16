<script lang="ts" setup>
import { useActionEmit } from '@/helpers/actionEmit.helper'
import type { Todo } from '@/interfaces/Todo.inteface'
import type { TodoActionEmit } from '@/interfaces/TodoActionEmit.interface'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<TodoActionEmit>()
const { handleDelete, handleEdit, handleStatusChange } = useActionEmit(emit, props.todo)
</script>

<template>
  <div class="flex gap-2">
    <div
      v-if="!todo.isFavorite"
      class="w-[30px] h-[30px] rounded-full border flex justify-center items-center cursor-pointer hover:text-white hover:bg-orange-500"
      @click="handleStatusChange(todo)"
    >
      <i class="pi pi-heart"></i>
    </div>
    <div
      v-if="todo.isFavorite"
      class="w-[30px] h-[30px] rounded-full border flex justify-center items-center cursor-pointer text-white bg-orange-500"
      @click="handleStatusChange(todo)"
    >
      <i class="pi pi-heart"></i>
    </div>
    <div
      class="w-[30px] h-[30px] rounded-full border flex justify-center items-center cursor-pointer hover:text-white hover:bg-green-500"
      @click="handleEdit(todo)"
    >
      <i class="pi pi-pencil"></i>
    </div>
    <div
      class="w-[30px] h-[30px] rounded-full border flex justify-center items-center cursor-pointer hover:text-white hover:bg-red-500"
      @click="handleDelete(todo)"
    >
      <i class="pi pi-trash"></i>
    </div>
  </div>
</template>
