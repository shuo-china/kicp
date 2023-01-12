import Layout from '@/layouts/index.vue'
import VisitorIcon from '@/assets/assets-slide-visitor.svg'

export default [
  {
    path: '/visitor',
    component: Layout,
    redirect: '/visitor/config',
    name: 'Visitor',
    meta: { title: '访客', icon: VisitorIcon, roles: ['visitor'] },
    children: [
      {
        path: 'config',
        name: 'VisitorConfig',
        component: () => import('@/pages/visitor/config/index.vue'),
        meta: { title: '配置管理' }
      }
    ]
  }
]
