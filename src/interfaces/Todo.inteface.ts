export interface BasicTodo {
  title: string
  description: string
  start_at: string
}
export interface Todo extends BasicTodo {
  _id: string
  status: 1 | 2 | 3
  isFavorite: boolean
  created_at: string
  created_by: string
}
