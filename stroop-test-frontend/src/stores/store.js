import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const result = ref([])
  const loaded = ref(false)
  return { result, loaded }
})
