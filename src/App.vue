<template>
  <main class="ml-[60vh] mt-24 p-2 max-w-96 border-red-500 border h-[70vh]">
    <div class="flex flex-col justify-between h-full">

      <div>
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <b class="text-xl">xwrapper</b>
            <small class="text-xs">made by <a class="text-blue-400" href="https://x.com/jynxbt"
                target="_blank">JYN</a></small>
          </div>

        </div>

        <div class="border border-stone-700 mt-4 p-2 rounded-lg">
          <div class="my-2 flex items-center justify-between">
            <span>extension enabled</span>
            <label class="relative inline-block w-[3.7em] h-[1.8em] text-[17px]">
              <input type="checkbox" class="sr-only peer">
              <span
                class="absolute inset-0 cursor-pointer bg-[#313033] transition-all duration-200 rounded-[30px] before:absolute before:content-[''] before:h-[1.4em] before:w-[1.4em] before:bg-[#aeaaae] before:transition-all before:duration-400 before:rounded-[20px] before:left-[0.2em] before:bottom-[0.2em] peer-checked:bg-[#3a4b39] peer-checked:before:translate-x-[1.9em] peer-checked:before:bg-[#84da89] peer-focus:shadow-[0_0_1px_#3a4b39]"></span>
            </label>
          </div>
        </div>

        <div class="border border-stone-700 mt-4 p-2 rounded-lg">
          <MenuItem v-for="index in 3" :key="index" label="hide grok btn" v-model="toggles[index - 1]"
            @change="handleChange(index - 1, $event)" />
        </div>

      </div>

      <button
        class="w-full mx-auto px-3 py-2 bg-stone-300 border-stone-700 text-black font-semibold cursor-pointer border rounded-full">done</button>
    </div>

  </main>
</template>

<script lang="ts" setup>
import MenuItem from './components/MenuItem.vue';
import { ref } from 'vue'

const toggles = ref([false, false, false])

const handleChange = (index: number, value: boolean) => {
  console.log(`Toggle ${index + 1} changed to`, value)
}
</script>
