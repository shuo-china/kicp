import Layout from '@/layouts/index.vue'
import PassageIcon from '@/assets/assets-slide-passage.svg'

export default [
  {
    path: '/passage',
    component: Layout,
    redirect: '/passage/config',
    name: 'Passage',
    meta: { title: '人行', icon: PassageIcon, roles: ['passage'] },
    children: [
      {
        path: 'config',
        name: 'PassageConfig',
        component: () => import('@/pages/passage/config/index.vue'),
        meta: { title: '配置管理' }
      }
    ]
  }
]
