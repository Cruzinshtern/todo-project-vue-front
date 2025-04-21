import { defineStore } from 'pinia'
import type { Todo } from '@/interfaces/Todo.inteface'
import { TodoService } from '@/services/TodoService'

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as Todo[],
    totalTodos: 0,
  }),
  actions: {
    async loadTodos(page = 1, limit = 5): Promise<void> {
      const { data, count } = await TodoService.getAllTodos(page, limit)
      this.todos = data
      this.totalTodos = count
    },
    async getOneTodo(id: string): Promise<Todo> {
      return TodoService.getOneTodo(id)
    },
    async updateTodo(todo: Todo): Promise<void> {
      await TodoService.updateTodo(todo)
    },
    async deleteTodo(id: string, page: number, itemsPerPage: number): Promise<void> {
      await TodoService.deleteTodo(id)
      await this.loadTodos(page, itemsPerPage)
    },
    async updateTodoStatus(id: string, isFavorite: boolean): Promise<void> {
      await TodoService.updateTodoStatus(id, isFavorite)
      const idx = this.todos.findIndex((todo: Todo) => todo._id === id)
      if (idx === -1) throw new Error(`Todo with id ${id} not found`)
      this.todos[idx].isFavorite = isFavorite
    },
  },
  persist: true,
})
