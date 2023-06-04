<template>
  <main class="text-center bg-gray-100 h-screen flex justify-center items-center">
    <el-card class="rounded-lg shadow-lg min-w[360px] w-2/5">
      <div class="font-bold text-2xl mb-2">{{$t('home.welcome')}}</div>
      <div class="font-medium mb-4">
        {{$t('home.instruction')}}
      </div>
      <div class="font-bold mb-4">{{ $t('home.lang') }}</div>
      <el-select v-model="lang" clearable @change="onChange">
        <el-option label="中文" value="zhcn"></el-option>
        <el-option label="English" value="en"></el-option>
        <el-option label="Español" value="es"></el-option>
        <el-option label="한국어" value="ko"></el-option>
      </el-select>
      <div class="mt-4">
        <router-link v-show="lang !== ''" to="/survey" class="text-blue-500 hover:text-emerald-400"
          >{{ $t('words.clickToBegin') }}
        </router-link>
      </div>
    </el-card>
    <div class="absolute bottom-2 text-center italic font-mono">
      <div>{{ $t('messages.createBy') }}</div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const lang = ref('')

const { locale } = useI18n()

const onChange = () => {
  locale.value = lang.value
  localStorage.setItem('LANG', lang.value)
}
</script>
