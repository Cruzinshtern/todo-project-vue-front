<script lang="ts" setup>
import type { BasicTodo, Todo } from '@/interfaces/Todo.inteface'
import { defineProps, reactive, defineEmits, watch } from 'vue'
import TodoInput from './shared/TodoInput.vue'
import TodoButton from './shared/TodoButton.vue'
import { dateTransform } from '@/helpers/dateTransform.helper'

const props = defineProps<{
  title: string
  todo?: Todo
}>()

const emit = defineEmits<{
  (event: 'createdTodo', value: BasicTodo): void
  (event: 'editedTodo', value: Todo): void
}>()

const form = reactive<Todo>({
  title: '',
  description: '',
  start_at: '',
  created_at: '',
  isFavorite: props.todo?.isFavorite || false,
})

const handleSubmit = () => {
  if (props.todo) {
    emit('editedTodo', { ...form, _id: props.todo._id })
  } else {
    emit('createdTodo', form)
    resetForm()
  }
}

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.start_at = ''
  form.created_at = ''
}

watch(
  () => props.todo,
  (newTodo) => {
    console.log('newTodo', newTodo)
    // const date = new Date('2025-04-14')
    // const formatted = new Intl.DateTimeFormat('ru-RU').format(date)

    // console.log(formatted) // 👉 '14.04.2025'

    if (newTodo) {
      form.title = newTodo.title
      form.description = newTodo.description
      form.start_at = newTodo.start_at
      form.created_at = newTodo.created_at
    }
  },
  { immediate: true }, // чтобы сразу обработать, если todo уже есть
)
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 items-center">
    <h3 class="text-xl">{{ props.title }}</h3>
    <div class="w-full flex gap-2">
      <label class="w-1/8 text-end pt-2">Title</label>
      <TodoInput
        :field-type="'input'"
        :input-type="'text'"
        :placeholder="'Enter title'"
        v-model:value="form.title"
      />
    </div>
    <div class="w-full flex gap-2">
      <label class="w-1/8 text-end pt-2">Description</label>
      <TodoInput
        :field-type="'textarea'"
        :placeholder="'Enter description'"
        v-model:value="form.description"
      />
    </div>
    <div class="w-full flex gap-2">
      <label class="w-1/8 text-end pt-2">Due Date</label>
      <TodoInput
        :field-type="'input'"
        :input-type="'date'"
        :placeholder="'Select date'"
        v-model:value="form.start_at"
      />
    </div>
    <div class="w-full flex gap-2 items-center" v-if="props.todo">
      <label class="w-1/8 text-end">Created at</label>
      <div class="w-full py-2 px-3 mb-2 text-gray-500">
        {{ dateTransform(new Date(form.created_at)) }}
      </div>
    </div>
    <div class="w-full flex justify-end gap-4">
      <TodoButton :type="'submit'" :text="'Edit Todo'" :role="'success'" />
      <TodoButton :type="'reset'" :text="'Cancel'" :role="'cancel'" @reset="resetForm" />
    </div>
  </form>
</template>
