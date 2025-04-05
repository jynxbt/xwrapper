<template>
    <div class="flex items-center justify-between my-3">
      <span>{{ label }}</span>
      <label class="relative inline-block w-[3.7em] h-[1.8em] text-[17px]">
        <input
          type="checkbox"
          class="sr-only peer"
          :checked="modelValue"
          @change="onToggle"
        />
        <span
          class="absolute inset-0 cursor-pointer bg-[#313033] transition-all duration-200 rounded-[30px]
                 before:absolute before:content-[''] before:h-[1.4em] before:w-[1.4em] before:bg-[#aeaaae]
                 before:transition-all before:duration-400 before:rounded-[20px] before:left-[0.2em] before:bottom-[0.2em]
                 peer-checked:bg-[#3a4b39] peer-checked:before:translate-x-[1.9em] peer-checked:before:bg-[#84da89]
                 peer-focus:shadow-[0_0_1px_#3a4b39]">
        </span>
      </label>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    label: string
    modelValue: boolean
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'change', value: boolean): void
  }>()
  
  const onToggle = (e: Event) => {
    const value = (e.target as HTMLInputElement).checked
    emit('update:modelValue', value)
    emit('change', value)
  }
  </script>
  