<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { computed } from 'vue'

const route = useRoute()
const isNavbarHidden = computed(() => route.meta.hideNavbar)
</script>

<template>
  <NavbarComponent v-if="!isNavbarHidden" />
  <RouterView />
</template>
