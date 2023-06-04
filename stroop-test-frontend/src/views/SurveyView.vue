<template>
  <main class="flex h-screen items-center justify-center bg-gray-100">
    <!-- quiz container -->
    <div
      class="bg-white flex-none container relative overflow-hidden shadow-lg rounded-lg px-12 py-6"
    >
      <img src="@/assets/header.svg" alt="" class="absolute -top-10 left-0 object-none" />

      <!-- contents -->
      <div class="relative z-20 mt-8">
        <!-- timer container -->
        <div class="bg-white shadow-lg p-1 rounded-full w-full h-5">
          <div
            class="bg-blue-700 rounded-full h-full"
            :style="`width: ${(timer / 5000) * 100}%`"
          ></div>
        </div>

        <!-- question container -->
        <div class="rounded-lg bg-gray-100 p-2 mt-5 neo-morph-1 text-center font-bold">
          <div class="bg-white p-5 text-gray-800">
            {{$t('survey.question')}}
          </div>
          <div :class="currentQuestion.context.type">{{ currentQuestion.context.value }}</div>
        </div>

        <!-- options container -->
        <div class="mt-8">
          <!-- option container -->
          <div class="option" @click="onOptionClick(0)">
            <div class="bg-red-500 rounded-lg p-3 w-full h-12 hover:bg-red-600"></div>
          </div>
          <!-- option container -->
          <div class="option" @click="onOptionClick(1)">
            <div class="bg-blue-500 rounded-lg p-3 w-full h-12 hover:bg-blue-700"></div>
          </div>
          <!-- option container -->
          <div class="option" @click="onOptionClick(2)">
            <div class="bg-green-500 rounded-lg p-3 w-full h-12 hover:bg-green-700"></div>
          </div>
          <!-- option container -->
          <div class="option" @click="onOptionClick(3)">
            <div class="bg-black rounded-lg p-3 w-full h-12 hover:bg-gray-900"></div>
          </div>
          <!-- option container -->
          <div class="option" @click="onOptionClick(4)">
            <div class="bg-yellow-500 rounded-lg p-3 w-full h-12 hover:bg-yellow-400"></div>
          </div>
        </div>

        <!-- progress bar container -->
        <div class="mt-8 text-center">
          <div class="h-1 w-12 bg-gray-800 rounded-full mx-auto"></div>
          <div class="font-bold text-gray-800">{{ questionCounter + 1 }}/{{ question.length }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import router from '../router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

// ==== Variables ==== //
const { t } = useI18n()

const result = useStore().result

const questionCounter = ref(0)

const currentQuestion = ref({
  context: {},
  relative: 2,
  answer: 1,
  type: 0,
})

let question = []

const timer = ref(5000)

// ==== Functions ==== //
onMounted(() => {
  axios
    .get('/api/questions')
    .then((res) => {
      question = res.data.data

      result.length = 0
      ElMessageBox.alert(t('survey.instruction'), t('words.instruction'), {
        confirmButtonText: t('survey.ready'),
        showClose: false,
        callback: () => {
          currentQuestion.value = question[questionCounter.value]
          countDown()
        },
      })
    })
    .catch((e) => {
      console.log(e)
      ElMessage.error(t('messages.error'))
      router.push('/')
    })
})

const nextQuestion = () => {
  if (question.length - 1 > questionCounter.value) {
    questionCounter.value++
    currentQuestion.value = question[questionCounter.value]
    timer.value = 5000
  } else {
    router.push('/result')
  }
}

const onOptionClick = (index) => {
  if (index === currentQuestion.value.answer) {
    result.push({
      time: (5 - timer.value / 1000).toFixed(4),
      status: 1,
      type: currentQuestion.value.type,
    })
  } else {
    if (index === currentQuestion.value.relative) {
      result.push({
        time: (5 - timer.value / 1000).toFixed(4),
        status: 0,
        type: currentQuestion.value.type,
      })
    } else {
      result.push({
        time: (5 - timer.value / 1000).toFixed(4),
        status: -1,
        type: currentQuestion.value.type,
      })
    }
  }
  nextQuestion()
}
const countDown = () => {
  let interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 5
    } else if (question.length - 1 > questionCounter.value) {
      nextQuestion()
      result.push({ time: -1, status: -1 })
      clearInterval(interval)
      if (router.currentRoute.value.name === 'survey') {
        countDown()
      }
    }
  }, 5)
}
</script>

<style scoped>
.neo-morph-1 {
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px white;
}

.container {
  max-width: 400px;
  border-radius: 25px;
}

.option {
  @apply cursor-pointer neo-morph-1 bg-gray-100 p-1 rounded-lg mb-4;
}

.option div {
  @apply transition-colors;
}

.Red-text {
  @apply bg-white pb-5 text-red-500;
}

.Blue-text {
  @apply bg-white pb-5 text-blue-500;
}

.Green-text {
  @apply bg-white pb-5 text-green-500;
}

.Black-text {
  @apply bg-white pb-5 text-black;
}

.Yellow-text {
  @apply bg-white pb-5 text-yellow-500;
}
</style>
