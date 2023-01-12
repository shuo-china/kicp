import Layout from '@/layouts/index.vue'
import TrafficIcon from '@/assets/assets-slide-traffic.svg'

export default [
  {
    path: '/traffic',
    component: Layout,
    redirect: '/traffic/config',
    name: 'Traffic',
    meta: { title: '车行', icon: TrafficIcon, roles: ['traffic'] },
    children: [
      {
        path: 'config',
        name: 'TrafficConfig',
        component: () => import('@/pages/traffic/config/index.vue'),
        meta: { title: '配置管理' }
      }
    ]
  }
]
