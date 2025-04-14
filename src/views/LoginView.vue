<script setup lang="ts">
import AuthFormComponent from '@/components/AuthFormComponent.vue'
import type { UserAuth } from '@/interfaces/UserAuth.interface'
import { AuthService } from '@/services/AuthService'
import { useToast } from 'vue-toastification'
import { LocalStorageService } from '@/services/LocalStorageService'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const handleAuth = async (data: UserAuth) => {
  try {
    const { token } = await AuthService.login(data)
    LocalStorageService.setToken(token)
    router.push('/')
  } catch (e: any) {
    toast.error(e.response.data.message)
  }
}
</script>

<template>
  <div class="flex flex-col w-1/2 gap-3">
    <AuthFormComponent :title="'Login'" :formType="'login'" @login="handleAuth" />
    <div class="text-center">
      Don't have an account?
      <RouterLink to="/auth/register" class="text-blue-500 underline ml-1"> Register! </RouterLink>
    </div>
  </div>
</template>
