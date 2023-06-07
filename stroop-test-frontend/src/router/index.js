import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useStore } from '@/stores/store'
import { ElLoading, ElMessage } from 'element-plus'
import i18n from '@/i18n/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'survey-home',
      component: HomeView,
    },
    {
      path: '/survey',
      name: 'survey',
      component: () => import('@/views/SurveyView.vue'),
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('@/views/ResultView.vue'),
      meta: { requiresData: true },
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('@/views/DataView.vue'),
      meta: { requiresData: false },
    },
    {
      path: '/:path(.*)*',
      name: 404,
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  let loading;
  let timeout = 0
  if (store.result.length === 0) {
    loading = ElLoading.service()
    timeout = 1000
  }

  setTimeout(() => {
    if (store.result.length === undefined && to.name.startsWith('survey')) {
      ElMessage.info(i18n.global.t('result.done'))
      next('/result')
    } else if (to.name === 'result' && store.result.length === 0) {
      next('/')
    } else {
      next()
    }
  }, timeout)
  loading.close()
})

export default router
