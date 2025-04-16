<script lang="ts" setup>
import type { Todo } from '@/interfaces/Todo.inteface'
import TodoActionsComponent from './TodoActionsComponent.vue'
import { useActionEmit } from '@/helpers/actionEmit.helper'
import type { TodoActionEmit } from '@/interfaces/TodoActionEmit.interface'

// Here we exclude 'Actions' header, it is added in the template directly
const tableHeaders: { key: keyof Todo; label: string }[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
]

const props = defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<TodoActionEmit>()
const { handleDelete, handleEdit, handleStatusChange } = useActionEmit(emit)
</script>

<template>
  <table class="table-auto border border-gray-300">
    <thead class="border border-gray-300 px-4 py-2">
      <tr class="text-lg">
        <th class="w-1/12">Actions</th>
        <th v-for="tableHeader of tableHeaders" :key="tableHeader.key">
          {{ tableHeader.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo of props.todos" :key="todo._id">
        <td class="border border-gray-300 px-4 py-2">
          <TodoActionsComponent
            :todo
            @delete="handleDelete(todo)"
            @edit="handleEdit(todo)"
            @update-fav-status="handleStatusChange(todo)"
          />
        </td>
        <td
          class="border border-gray-300 px-4 py-2"
          v-for="tableHeader of tableHeaders"
          :key="tableHeader.key"
        >
          {{ todo[tableHeader.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
