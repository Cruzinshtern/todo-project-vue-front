export function dateTransform(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU').format(date)
}
