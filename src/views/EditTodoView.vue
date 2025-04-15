<script setup lang="ts">
import type { Todo } from '@/interfaces/Todo.inteface'
import { TodoService } from '@/services/TodoService'
import { defineProps, onMounted, ref } from 'vue'
import TodoFormComponent from '@/components/TodoFormComponent.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const props = defineProps<{ id: string }>()

const todo = ref<Todo | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    todo.value = await TodoService.getOneTodo(props.id)
  } catch (e) {
    console.error('Error loading todo:', e)
  } finally {
    isLoading.value = false
  }
})

const handleEditTodo = async (todo: Todo) => {
  try {
    await TodoService.updateTodo(todo)
    toast.success('Todo has been edited successfully')
    router.push('/list')
  } catch (e) {
    toast.error(`Error updating todo: ${e}`)
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div v-if="isLoading" class="flex justify-center items-center">
      <p>Loading...</p>
    </div>
    <TodoFormComponent
      class="w-1/2"
      v-else-if="todo"
      :title="'Edit'"
      :todo="todo"
      @editedTodo="handleEditTodo"
    />
    <div v-else>
      <p class="text-red-500">Failed to load this todo!</p>
    </div>
  </div>
</template>
