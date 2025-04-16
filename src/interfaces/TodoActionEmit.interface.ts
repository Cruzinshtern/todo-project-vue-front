export interface TodoActionEmit {
  (event: 'delete', value: string): void
  (event: 'edit', value: string): void
  (event: 'updateFavStatus', value: { id: string; isFavorite: boolean }): void
}
