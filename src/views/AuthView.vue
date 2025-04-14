<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex h-screen">
    <div class="flex-1 flex justify-center items-center border-r">Hello Auth</div>
    <div class="flex-1 flex justify-center items-center">
      <RouterView />
    </div>
  </div>
</template>
