<script lang="ts" setup>
import { reactive } from 'vue'
import TodoInput from './shared/TodoInput.vue'
import TodoButton from './shared/TodoButton.vue'
import type { UserRegister } from '@/interfaces/UserRegister.interface'
import type { AuthFormType } from '@/types/AuthForm.type'
import type { UserAuth } from '@/interfaces/UserAuth.interface'

const props = defineProps<{
  title: string
  formType: AuthFormType
}>()

const emit = defineEmits<{
  (e: 'register', payload: UserRegister): void
  (e: 'login', payload: UserAuth): void
}>()

const form = reactive<UserRegister | UserAuth>(
  props.formType === 'login'
    ? { email: '', password: '' }
    : { firstName: '', lastName: '', email: '', password: '' },
)

const handleSubmit = () => {
  if (props.formType === 'login') emit('login', form as UserAuth)
  if (props.formType === 'register') emit('register', form as UserRegister)
  resetForm()
}

const resetForm = () => {
  if ('firstName' in form && 'lastName' in form) {
    form.firstName = ''
    form.lastName = ''
  }
  form.email = ''
  form.password = ''
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 items-center">
    <h3 class="text-xl">{{ props.title }}</h3>
    <div class="w-full flex" v-if="props.formType === 'register'">
      <TodoInput
        :field-type="'input'"
        :input-type="'text'"
        :placeholder="'Enter first name'"
        v-model:value="(form as UserRegister).firstName"
      />
    </div>
    <div class="w-full flex" v-if="props.formType === 'register'">
      <TodoInput
        :field-type="'input'"
        :input-type="'text'"
        :placeholder="'Enter last name'"
        v-model:value="(form as UserRegister).lastName"
      />
    </div>
    <div class="w-full flex">
      <TodoInput
        :field-type="'input'"
        :input-type="'email'"
        :placeholder="'Enter email'"
        v-model:value="form.email"
      />
    </div>
    <div class="w-full flex">
      <TodoInput
        :field-type="'input'"
        :input-type="'password'"
        :placeholder="'Enter password'"
        v-model:value="form.password"
      />
    </div>
    <div class="w-full flex justify-end gap-4">
      <TodoButton :type="'submit'" :text="'Confirm'" :role="'success'" />
      <TodoButton :type="'reset'" :text="'Cancel'" :role="'cancel'" @reset="resetForm" />
    </div>
  </form>
</template>
