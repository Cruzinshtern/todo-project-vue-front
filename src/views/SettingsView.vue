<script lang="ts" setup>
import type { ViewTab } from '@/interfaces/ViewTab.interface'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const activeTab = ref<ViewTab>()
const router = useRouter()
const route = useRoute()

const tabs: ViewTab[] = [
  { id: 1, title: 'Personal Infornation', isSelected: true, query: 'personal' },
  { id: 2, title: 'Language', isSelected: true, query: 'language' },
  { id: 3, title: 'Theme', isSelected: false, query: 'theme' },
]

const setTab = (query: string) => {
  tabs.forEach((tab: ViewTab) => {
    tab.isSelected = false
    if (tab.query === query) {
      tab.isSelected = true
      activeTab.value = tab
    }
  })
}

watch(
  () => route.query.tab,
  (newTab) => {
    if (!newTab) {
      router.replace({ query: { tab: tabs[0].query } })
    } else {
      setTab(newTab as string)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex m-22 h-[50vh]">
    <div class="flex flex-col gap-3 w-1/4 items-end border-r border-gray-400 p-4">
      <RouterLink
        class="px-2"
        v-for="tab in tabs"
        :class="{
          'bg-gray-400 text-white': tab.isSelected,
          'hover:bg-gray-200': !tab.isSelected,
          'cursor-pointer rounded-sm': true,
        }"
        :key="tab.id"
        :to="{ query: { tab: tab.query } }"
        @click="setTab(tab.query)"
      >
        <span>
          {{ tab.title }}
        </span>
      </RouterLink>
    </div>
    <div class="flex-1 p-4">View</div>
  </div>
</template>

<style scoped>
.m-22 {
  margin: 22px;
}
</style>
