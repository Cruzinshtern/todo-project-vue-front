<script lang="ts" setup>
import type { ButtonType } from '@/types/ButtonType.type'
import type { ResetFormType } from '@/types/ResetForm.type'
import type { ButtonRoleType } from '@/types/ButtonRole.type'

const props = withDefaults(
  defineProps<{
    type: ButtonType
    text: string
    role?: ButtonRoleType
  }>(),
  {
    role: 'default',
  },
)

const emits = defineEmits<ResetFormType>()
const handleClick = () => {
  if (props.type === 'reset') emits('reset')
}
</script>

<template>
  <input
    :type="props.type"
    :value="props.text"
    :class="{
      'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer': true,
      'bg-green-500 hover:bg-green-600': props.role === 'success',
      'bg-gray-500 hover:bg-gray-600': props.role === 'cancel',
      'bg-gray-400 hover:bg-gray-500': props.role === 'default',
    }"
    @click="handleClick"
  />
</template>
