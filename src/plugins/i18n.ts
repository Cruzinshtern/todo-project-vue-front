import { LocalStorageService } from '@/services/LocalStorageService'
import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
  const locales = import.meta.glob('../locales/*.json', { eager: true })
  const messages: Record<string, any> = {}

  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/)
    if (matched && matched[1]) {
      const locale = matched[1]
      messages[locale] = (locales[path] as any).default
    }
  }

  return messages
}

const defaultLocale = LocalStorageService.getLanguage()

export default createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: loadLocaleMessages(),
})
