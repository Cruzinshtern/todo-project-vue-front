<script setup lang="ts">
import AuthFormComponent from '@/components/AuthFormComponent.vue'
import type { UserRegister } from '@/interfaces/UserRegister.interface'
import { AuthService } from '@/services/AuthService'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

const handleRegister = async (data: UserRegister) => {
  try {
    await AuthService.register(data)
    toast.success('You have been successfully registered')
    router.push('/auth/login')
  } catch (e: any) {
    toast.error(e.response.data.message)
  }
}
</script>

<template>
  <div class="flex flex-col w-1/2 gap-3">
    <AuthFormComponent :title="'Register'" :formType="'register'" @register="handleRegister" />
    <div class="text-center">
      Already have an account?
      <RouterLink to="/auth/login" class="text-blue-500 underline ml-1"> Log in! </RouterLink>
    </div>
  </div>
</template>
