import type { BasicTodo } from '@/interfaces/Todo.inteface'
import api from './api'

export const TodoService = {
  async getAllTodos() {
    const response = await api.get('/tasks')
    return response.data
  },

  async createTodo(todo: BasicTodo) {
    const response = await api.post('/tasks/create', todo)
    return response.data
  },
}
