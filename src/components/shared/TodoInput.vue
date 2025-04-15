<script lang="ts" setup>
import type { FieldType } from '@/types/Field.type'
import type { InputType } from '@/types/Input.type'
import type { ValueEmitType } from '@/types/ValueEmit.type'

const props = defineProps<{
  value: string
  placeholder: string
  fieldType: FieldType
  inputType?: InputType
}>()

const emits = defineEmits<ValueEmitType>()

const handleValueChange = (e: Event) => {
  emits('update:value', (e.target as HTMLInputElement)?.value)
}
</script>

<template>
  <input
    v-if="fieldType === 'input'"
    class="border rounded w-full py-2 px-3 mb-2"
    :type="props.inputType"
    :value="props.value"
    :placeholder="props.placeholder"
    @input="handleValueChange"
  />
  <textarea
    v-if="fieldType === 'textarea'"
    class="border rounded w-full py-2 px-3"
    rows="4"
    :value="props.value"
    :placeholder="props.placeholder"
    @input="handleValueChange"
  ></textarea>
</template>
