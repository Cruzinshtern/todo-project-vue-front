<script setup lang="ts">
import { LocalStorageService } from '@/services/LocalStorageService'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const languages = [
  { key: 'gb', value: 'en', alt: 'English' },
  { key: 'ua', value: 'ua', alt: 'Українська' },
]

const changeLanguage = (lang: string) => {
  locale.value = lang
  LocalStorageService.setLanguage(lang)
}
</script>

<template>
  <div class="flex gap-2">
    <img
      v-for="lang in languages"
      :key="lang.value"
      :src="`https://flagcdn.com/w40/${lang.key}.png`"
      :alt="lang.alt"
      :class="{
        'opacity-100': locale === lang.value,
        'opacity-50': locale !== lang.value,
        'h-[20px] w-[26px] cursor-pointer': true,
      }"
      @click="changeLanguage(lang.value)"
    />
  </div>
</template>
