<script setup>
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue'
import axios from 'axios'
import { useStore } from '@/stores/store'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

onBeforeMount(() => {
  locale.value = localStorage.getItem('LANG')
  axios.get('/api/currentData').then((res) => {
    if (res.data.data != null) {
      useStore().result = JSON.parse(res.data.data)
      useStore().loaded = true
    }
  })
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
