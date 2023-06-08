<template>
  <main class="flex pt-20 pb-20 items-center justify-center bg-gray-100">
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
          Verification Phrase
        </label>
      </div>
      <el-button type="primary" plain @click="onVerify" class="mt-4">Verify</el-button>
    </el-card>

    <!-- 数据分析结果显示 -->
    <el-card v-else>
      <div class="text-center text-xl font-bold mb-4">Data Analysis Results:</div>
      <!-- 数据数量分类显示 -->
      <div class="grid grid-cols-4 gap-4 mb-8 pt-2 max-w-[700px] mx-auto" v-if='loaded'>
        <el-card shadow="never" class="rounded-l shadow-lg">
          <template #header>
            <div class="text-emerald-400 text-center font-bold font-serif">Total Data:</div>
          </template>
          <template #default>
            <div class="text-center text-[18px] font-mono">
              {{ studentAgeData.length + teacherAgeData.length + outsiderAgeData.length }}
            </div>
          </template>
        </el-card>
        <el-card shadow="never" class="rounded-l shadow-lg">
          <template #header>
            <div class="text-emerald-400 text-center font-bold font-serif">Student Data:</div>
          </template>
          <template #default>
            <div class="text-center text-[18px] font-mono">{{ studentAgeData.length }}</div>
          </template>
        </el-card>
        <el-card shadow="never" class="rounded-l shadow-lg">
          <template #header>
            <div class="text-emerald-400 text-center font-bold font-serif">Teacher Data:</div>
          </template>
          <template #default>
            <div class="text-center text-[18px] font-mono">{{ teacherAgeData.length }}</div>
          </template>
        </el-card>
        <el-card shadow="never" class="rounded-l shadow-lg">
          <template #header>
            <div class="text-emerald-400 text-center font-bold font-serif">Outsider Data:</div>
          </template>
          <template #default>
            <div class="text-center text-[18px] font-mono">{{ outsiderAgeData.length }}</div>
          </template>
        </el-card>
      </div>
      <el-divider direction="horizontal" />

      <!-- Age Regression Chart -->
      <div id="ageRegressionChart" class="w-[800px] h-[400px] mb-2"></div>
      <div class='mb-4 ml-14 font-bold'>Spearman Correlation: {{ 'None' }}</div>
      <el-divider direction='horizontal' />

      <div id="gpaRegressionChart" class="w-[800px] h-[400px]"></div>
      <div class='mb-4 ml-14 font-bold'>Spearman Correlation: {{ 'None' }}</div>
      <el-divider direction='horizontal' />
    </el-card>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import * as ecStat from 'echarts-stat'
import axios from 'axios'

const loaded = ref(false)
let gpaData
let studentAgeData
let teacherAgeData
let outsiderAgeData
onMounted(async () => {
  await axios.get('/api/get').then((res) => {
    gpaData = res.data.data.gpaList
    studentAgeData = res.data.data.studentAgeList
    teacherAgeData = res.data.data.teacherAgeList
    outsiderAgeData = res.data.data.outsiderAgeList
    loaded.value = true
    initAgeRegression()
    initGpaRegression()
  })
})

// ==== Polynomial Regression Graph for Age ==== //
const initAgeRegression = () => {
  const ageRegressionChartContainer = document.getElementById('ageRegressionChart')
  const ageRegressionChart = echarts.init(ageRegressionChartContainer)

  let ageRegression = ecStat.regression('polynomial', studentAgeData, 3)

  const ageChartOption = {
    legend: {
      data: ['StudentScatters', 'TeacherScatters', 'OutsiderScatters', 'Regression'],
      selected: {
        StudentScatters: true,
        TeacherScatters: false,
        OutsiderScatters: false,
        Regression: true,
      },
      top: 40,
    },
    grid: {
      top: '20%',
      bottom: '20%',
    },
    title: {
      text: 'Avg. Response Time Difference & Age - Polynomial Regression (Correlation)',
      left: 'center',
      top: 0,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      min: 11,
      name: 'Age',
      nameLocation: 'middle',
      nameGap: 42,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      splitNumber: 10,
    },
    yAxis: {
      name: 'Avg. Response Time Difference',
      nameLocation: 'middle',
      nameGap: 42,
      nameRotate: 90,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'StudentScatters',
        type: 'scatter',
        data: studentAgeData,
      },
      {
        name: 'TeacherScatters',
        type: 'scatter',
        data: teacherAgeData,
      },
      {
        name: 'OutsiderScatters',
        type: 'scatter',
        data: outsiderAgeData,
      },
      {
        name: 'Regression',
        type: 'line',
        smooth: true,
        data: ageRegression.points,
        color: 'red',
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
      },
    ],
  }
  ageRegressionChart.setOption(ageChartOption)

  // Legend触发Regression曲线变动
  ageRegressionChart.on('legendselectchanged', function (params) {
    const ageDataSource = []
    if (params.selected.StudentScatters) {
      ageDataSource.push(...studentAgeData)
    }
    if (params.selected.TeacherScatters) {
      ageDataSource.push(...teacherAgeData)
    }
    if (params.selected.OutsiderScatters) {
      ageDataSource.push(...outsiderAgeData)
    }
    let option = ageRegressionChart.getOption()
    option.series[3].data = ecStat.regression('polynomial', ageDataSource, 3).points
    ageRegressionChart.setOption(option)
  })
}

// ==== Polynomial Regression Graph for GPA ==== //
const initGpaRegression = () => {
  const gpaRegressionChartContainer = document.getElementById('gpaRegressionChart')
  const gpaRegressionChart = echarts.init(gpaRegressionChartContainer)
  echarts.registerTransform(ecStat.transform.regression)

  const gpaChartOption = {
    legend: {
      data: ['Scatter', 'Regression'],
      top: 40,
    },
    grid: {
      top: '20%',
      bottom: '20%',
    },
    dataset: [
      {
        source: gpaData,
      },
      {
        transform: {
          type: 'ecStat:regression',
          config: { method: 'polynomial', order: 3 },
        },
      },
    ],
    title: {
      text: 'Avg. Response Time Difference & GPA  - Polynomial Regression (Correlation)',
      left: 'center',
      top: 0,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      name: 'Avg. Response Time Difference',
      nameLocation: 'middle',
      nameGap: 42,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      splitNumber: 10,
    },
    yAxis: {
      name: 'GPA',
      nameLocation: 'middle',
      nameGap: 42,
      nameRotate: 90,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Scatter',
        type: 'scatter',
      },
      {
        name: 'Regression',
        type: 'line',
        smooth: true,
        color: 'red',
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
      },
    ],
  }
  gpaRegressionChart.setOption(gpaChartOption)
}

// ==== Verification ==== //
const verified = ref(true)

const password = ref()
const onVerify = () => {
  if (password.value === 'KiriRainCat061202') {
    verified.value = true
    setTimeout(() => {
      initAgeRegression()
    }, 1000)
  } else {
    ElMessage.warning(
      'Failed to verify your identity, if you are a participant, please go to the root url of this site'
    )
  }
}
</script>