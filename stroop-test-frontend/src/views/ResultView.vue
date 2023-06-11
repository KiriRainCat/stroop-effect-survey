<template>
  <main class="flex h-screen items-center justify-center bg-gray-100">
    <el-card class="min-w-[360px] flex shadow-lg rounded-lg">
      <div v-if="!loaded" class="w-[360px]">
        <div class="font-bold font-sans mb-4 text-center text-emerald-400">
          {{ $t('result.instruction') }}
        </div>
        <el-form
          class="flex flex-col justify-center"
          label-position="top"
          ref="formRef"
          :model="result"
          :rules="rules"
        >
          <el-form-item :label="t('words.age')" prop="age">
            <el-input v-model="result.age" type="number" />
          </el-form-item>
          <el-form-item label="GPA" prop="gpa">
            <el-input v-model="result.gpa" type="number" step="0.01" />
          </el-form-item>
          <el-button type="primary" @click="onSubmit" class="mt-4">{{
            $t('words.submit')
          }}</el-button>
        </el-form>
      </div>
      <div v-if="loaded">
        <div class="font-bold text-emerald-400 text-[20px] mb-2">{{ $t('result.title') }}</div>

        <div class="mb-4">
          <div class="font-bold text-cyan-500">{{ $t('words.avgResponseTime') }}:</div>
          <div class="font-medium">
            {{ $t('result.matchedAvgTime') }}
            <span class="font-bold">{{ display.matchedAvgTime }} {{ $t('words.seconds') }}</span>
          </div>
          <div class="font-medium">
            {{ $t('result.unmatchedAvgTime') }}
            <span class="font-bold">{{ display.unmatchedAvgTime }} {{ $t('words.seconds') }}</span>
          </div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-cyan-500">{{ $t('result.diffBetweenTwoAvg') }}</div>
          <div class="font-bold">{{ display.difference }} {{ $t('words.seconds') }}</div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-cyan-500">{{ $t('words.incorrectAnswers') }}</div>
          <div class="font-medium">
            {{ $t('result.totalWrong') }}
            <span class="font-bold">{{ display.wrong }} {{ $t('words.times') }}</span>
          </div>
          <div class="font-medium">
            {{ $t('result.specialWrong') }}
            <span class="font-bold">{{ display.specialWrong }} {{ $t('words.times') }}</span>
          </div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-cyan-500">{{ $t('words.variables') }}:</div>
          <div class="font-medium">
            {{ $t('words.age') }}: <span class="font-bold">{{ display.age }}</span>
          </div>
          <div class="font-medium">
            GPA: <span class="font-bold">{{ display.gpa }}</span>
          </div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-cyan-500">{{ $t('words.date') }}:</div>
          <div class="font-bold">{{ display.createTime }}</div>
        </div>
      </div>
    </el-card>
  </main>
</template>

<script setup>
import { useStore } from '@/stores/store'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const display = ref(useStore().result)

const loaded = ref(useStore().loaded)

const result = reactive({
  age: '',
  gpa: '',
  scores: useStore().result,
})

const formRef = ref()

const validateAge = (rule, val, cb) => {
  if (val < 1 || val > 120) {
    return cb(new Error(t('messages.ageLimit')))
  } else {
    cb()
  }
}

const validateGPA = (rule, val, cb) => {
  if (val < 0.1 || val > 5.5) {
    return cb(new Error(t('messages.gpaLimit')))
  } else {
    cb()
  }
}

const rules = reactive({
  age: [
    {
      required: true,
      message: `${t('words.pleaseInput')} ${t('words.age')}`,
      trigger: ['change', 'blur'],
    },
    { validator: validateAge, trigger: ['change', 'blur'] },
  ],
  gpa: [
    { required: true, message: `${t('words.pleaseInput')} GPA`, trigger: ['change', 'blur'] },
    { validator: validateGPA, trigger: ['change', 'blur'] },
  ],
})

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      ElMessage.warning(t('messages.fillForm'))
    } else {
      const loading = ElLoading.service({ fullscreen: true })
      axios
        .post('/api/store', result)
        .then((res) => {
          console.log(res)
          if (res.data.data === 'Invalid Data') {
            ElMessage.error(t('result.invalidData'))
            router.push('/')
          } else {
            display.value = res.data.data
            loaded.value = true
            ElMessage.success(t('result.success'))
          }
        })
        .catch((e) => {
          console.log(e)
          ElMessage.error(t('messages.error'))
          router.push('/')
        })
        .finally(() => loading.close())
    }
  })
}
</script>
