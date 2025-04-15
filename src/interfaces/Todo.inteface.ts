import type { TodoStatus } from '@/types/TodoStatus.type'

export interface BasicTodo {
  title: string
  description: string
  start_at: string
}
export interface Todo extends BasicTodo {
  _id: string
  status: TodoStatus
  isFavorite: boolean
  created_at: string
  created_by: string
}
