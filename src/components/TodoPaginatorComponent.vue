<script lang="ts" setup>
import { computed, ref } from 'vue'
const props = defineProps<{
  totalTodos: number
  itemsPerPageDefault: number
  itemsPerPageSelector: number[]
  currentPage: number
}>()

const itemsPerPage = ref<number>(props.itemsPerPageDefault)
const totalPages = computed(() => Math.ceil(props.totalTodos / itemsPerPage.value))
const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

const emit = defineEmits<{
  (event: 'changePage', value: number): void
  (event: 'changeItemsPerPage', value: number): void
}>()

const goToPage = (page: number) => {
  if (page === props.currentPage) return
  if (page >= 1 && page <= totalPages.value) emit('changePage', page)
}

const itemsPerPageChange = (e: Event) => {
  emit('changeItemsPerPage', Number((e.target as HTMLSelectElement).value))
  itemsPerPage.value = Number((e.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="flex gap-2 items-center justify-center mt-4">
    <button
      @click="goToPage(1)"
      :disabled="currentPage === 1"
      class="h-[30px] w-[30px] px-2 py-1 border rounded cursor-pointer flex justify-center items-center"
    >
      <i class="pi pi-angle-double-left"></i>
    </button>
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="h-[30px] w-[30px] px-2 py-1 border rounded cursor-pointer flex justify-center items-center"
    >
      <i class="pi pi-angle-left"></i>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="[
        'h-[30px] w-[30px] px-2 py-1 rounded flex justify-center items-center',
        currentPage === page ? 'bg-green-500 text-white' : 'bg-white cursor-pointer',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="h-[30px] w-[30px] px-2 py-1 border rounded cursor-pointer flex justify-center items-center"
    >
      <i class="pi pi-angle-right"></i>
    </button>
    <button
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages"
      class="h-[30px] w-[30px] px-2 py-1 border rounded cursor-pointer flex justify-center items-center"
    >
      <i class="pi pi-angle-double-right"></i>
    </button>

    <div class="flex gap-2 mr-3">
      <label class="px-2" for="items">Items per page:</label>
      <select name="items" id="items" class="mr-3" @change="itemsPerPageChange">
        <option v-for="value of itemsPerPageSelector" :key="value">{{ value }}</option>
      </select>
    </div>
  </div>
</template>
