<script lang="ts" setup>
import type { Todo } from '@/interfaces/Todo.inteface'
import { statusTransform } from '@/helpers/statusTransform.helper'
import type { TodoStatus } from '@/types/TodoStatus.type'
import TodoActionsComponent from './TodoActionsComponent.vue'
import type { TodoActionEmit } from '@/interfaces/TodoActionEmit.interface'
import { useActionEmit } from '@/helpers/actionEmit.helper'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<TodoActionEmit>()
const { handleDelete, handleEdit, handleStatusChange } = useActionEmit(emit, props.todo)
</script>

<template>
  <div class="border rounded min-w-xs">
    <div class="flex justify-end">
      <TodoActionsComponent
        :todo
        @delete="handleDelete(props.todo)"
        @edit="handleEdit(props.todo)"
        @update-fav-status="handleStatusChange(props.todo)"
      />
    </div>
    <div>Title: {{ props.todo.title }}</div>
    <div>Description: {{ props.todo.description }}</div>
    <div>Status: {{ statusTransform(props.todo.status as TodoStatus) }}</div>
    <div>Created at: {{ props.todo.created_at }}</div>
  </div>
</template>
