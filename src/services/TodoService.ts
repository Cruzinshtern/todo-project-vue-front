import type { BasicTodo, Todo } from '@/interfaces/Todo.inteface'
import api from './api'
import type { TodoResponse } from '@/interfaces/TodoResponse.interface'

export const TodoService = {
  async getAllTodos(): Promise<TodoResponse> {
    const response = await api.get('/tasks')
    return response.data
  },

  async getOneTodo(id: string): Promise<Todo> {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  async getFavorites(): Promise<Todo[]> {
    const response = await api.get('/tasks/favorites')
    return response.data
  },

  async createTodo(todo: BasicTodo): Promise<Todo> {
    const response = await api.post('/tasks/create', todo)
    return response.data
  },

  async updateTodo(todo: Todo): Promise<Todo> {
    const response = await api.put(`/tasks/${todo._id}`, todo)
    return response.data
  },

  async updateTodoStatus(id: string, isFavorite: boolean): Promise<Todo> {
    const response = await api.patch(`/tasks/favorite/${id}`, { isFavorite })
    return response.data
  },

  async deleteTodo(id: string): Promise<string> {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },
}
