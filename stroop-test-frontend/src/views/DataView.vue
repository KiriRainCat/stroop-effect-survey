<template>
  <main class="flex h-screen items-center justify-center bg-gray-100">
    <!-- 身份验证 -->
    <el-card class="min-w-[360px] flex justify-center shadow-lg rounded-lg" v-if="!verified">
      <!-- Tailwind CSS 输入框 -->
      <div class="relative h-11 w-full min-w-[200px]">
        <input
          v-model="password"
          type="password"
          class="peer border-b h-full w-full focus:outline-0"
          placeholder=" "
        />
        <label
          class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-400 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-emerald-400 peer-focus:after:scale-x-100 peer-focus:after:border-emerald-400 peer-disabled:text-transparent"
        >
          验证密文
        </label>
      </div>
      <el-button type="primary" plain @click="onVerify" class="mt-4">验证身份</el-button>
    </el-card>

    <!-- 数据分析结果显示 -->
    <el-main v-else>
      <h1 class="text-center">数据分析结果如下</h1>
    </el-main>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const verified = ref(false)

const password = ref()
const onVerify = () => {
  if (password.value === 'KiriRainCat061202') {
    verified.value = true
  } else {
    ElMessage.warning('身份验证失败，如果您是问卷参与者，请前往链接根目录')
  }
}
</script>
