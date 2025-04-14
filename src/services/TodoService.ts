import api from './api'

export const TodoService = {
  async getAllTodos() {
    const response = await api.get('/tasks')
    return response.data
  },
}
