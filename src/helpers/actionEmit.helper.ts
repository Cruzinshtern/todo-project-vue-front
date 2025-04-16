import type { Todo } from '@/interfaces/Todo.inteface'
import type { TodoActionEmit } from '@/interfaces/TodoActionEmit.interface'

export function useActionEmit(emit: TodoActionEmit, todoFromProps?: Todo) {
  const getTodo = (todo?: Todo): Todo | undefined => {
    return todoFromProps || todo
  }

  const handleDelete = (todo?: Todo) => {
    const t = getTodo(todo)
    if (t?._id) emit('delete', t._id)
  }

  const handleEdit = (todo?: Todo) => {
    const t = getTodo(todo)
    if (t?._id) emit('edit', t._id)
  }

  const handleStatusChange = (todo?: Todo) => {
    const t = getTodo(todo)
    if (t?._id) {
      emit('updateFavStatus', { id: t._id, isFavorite: !t.isFavorite })
    }
  }

  return { handleDelete, handleEdit, handleStatusChange }
}
