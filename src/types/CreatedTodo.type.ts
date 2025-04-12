import type { Todo } from '@/interfaces/Todo.inteface'

export type CreatedTodoType = {
  (event: 'createdTodo', value: Todo): void
}
