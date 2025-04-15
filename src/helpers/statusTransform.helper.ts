import type { TodoStatus } from '@/types/TodoStatus.type'

export function statusTransform(status: TodoStatus): string {
  switch (status) {
    case 1:
      return 'Todo'
    case 2:
      return 'Active'
    case 3:
      return 'Done'
    default:
      return ''
  }
}
