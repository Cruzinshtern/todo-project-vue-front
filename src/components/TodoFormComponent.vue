<script lang="ts" setup>
import type { Todo } from '@/interfaces/Todo.inteface'
import type { CreatedTodoType } from '@/types/CreatedTodo.type'
import { defineProps, reactive, defineEmits } from 'vue'

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
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 items-center">
    <h3 class="text-xl">{{ props.title }}</h3>
    <div class="w-full flex">
      <label for="title" class="w-1/8">Title</label>
      <input
        v-model="form.title"
        type="text"
        id="title"
        class="border rounded w-full py-2 px-3 mb-2"
        placeholder="Enter title"
      />
    </div>
    <div class="w-full flex">
      <label for="description" class="w-1/8">Description</label>
      <textarea
        v-model="form.description"
        id="description"
        class="border rounded w-full py-2 px-3"
        rows="4"
        placeholder="Enter description"
      ></textarea>
    </div>
    <div>
      <button
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add Job
      </button>
    </div>
  </form>
</template>
