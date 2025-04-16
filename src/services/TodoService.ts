import type { BasicTodo, Todo } from '@/interfaces/Todo.inteface'
import api from './api'

export const TodoService = {
  async getAllTodos() {
    const response = await api.get('/tasks')
    return response.data
  },

  async getOneTodo(id: string) {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  async getFavorites(): Promise<Todo[]> {
    const response = await api.get('/tasks/favorites')
    return response.data
  },

  async createTodo(todo: BasicTodo) {
    const response = await api.post('/tasks/create', todo)
    return response.data
  },

  async updateTodo(todo: Todo) {
    const response = await api.put(`/tasks/${todo._id}`, todo)
    return response.data
  },

  async updateTodoStatus(id: string, isFavorite: boolean) {
    const response = await api.patch(`/tasks/favorite/${id}`, { isFavorite })
    return response.data
  },

  async deleteTodo(id: string) {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },
}
