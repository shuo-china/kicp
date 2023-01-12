import Layout from '@/layouts/index.vue'
import CommonIcon from '@/assets/assets-slide-common.svg'

export default [
  {
    path: '/common',
    component: Layout,
    redirect: '/common/dashboard',
    name: 'Common',
    meta: { title: '公共', icon: CommonIcon },
    children: [
      {
        path: 'dashboard',
        name: 'CommonDashboard',
        component: () => import('@/pages/common/dashboard/index.vue'),
        meta: { title: '仪表盘' }
      }
    ]
  }
]
