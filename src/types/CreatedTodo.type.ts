import type { BasicTodo } from '@/interfaces/Todo.inteface'

export type CreatedTodoType = {
  (event: 'createdTodo', value: BasicTodo): void
}
