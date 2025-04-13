<script lang="ts" setup>
import type { Todo } from '@/interfaces/Todo.inteface'
import type { CreatedTodoType } from '@/types/CreatedTodo.type'
import { defineProps, reactive, defineEmits } from 'vue'
import TodoInput from './shared/TodoInput.vue'
import TodoButton from './shared/TodoButton.vue'

const props = defineProps({
  title: String,
})

const emit = defineEmits<CreatedTodoType>()

const form = reactive<Todo>({
  title: '',
  description: '',
  isComplete: false,
})

const handleSubmit = () => {
  emit('createdTodo', form)
  resetForm()
}

const resetForm = () => {
  form.title = ''
  form.description = ''
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 items-center">
    <h3 class="text-xl">{{ props.title }}</h3>
    <div class="w-full flex">
      <label class="w-1/8">Title</label>
      <TodoInput
        :field-type="'input'"
        :input-type="'text'"
        :placeholder="'Enter title'"
        v-model:value="form.title"
      />
    </div>
    <div class="w-full flex">
      <label class="w-1/8">Description</label>
      <TodoInput
        :field-type="'textarea'"
        :placeholder="'Enter description'"
        v-model:value="form.description"
      />
    </div>
    <div class="w-full flex justify-end gap-4">
      <TodoButton :type="'submit'" :text="'Add Todo'" :role="'success'" />
      <TodoButton :type="'reset'" :text="'Cancel'" :role="'cancel'" @reset="resetForm" />
    </div>
  </form>
</template>
