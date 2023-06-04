<script setup>
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue'
import axios from 'axios'
import { useStore } from '@/stores/store'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

onBeforeMount(() => {
  locale.value = localStorage.getItem('LANG')
  axios.get('/api/currentData').then((res) => {
    if (res.data.data != null) {
      useStore().result = JSON.parse(res.data.data)
      useStore().loaded = true
      ElMessage.info(t('result.done'))
      router.push('/result')
    }
  })
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>