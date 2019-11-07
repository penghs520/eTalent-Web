import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import path from './path';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/organization_repair',
    name: 'organization_repair',
    component: path['organization_repair']
  },
  {
    path: '/organization_position',
    name: 'organization_position',
    component: path['organization_position']
  },
  {
    path: '/organization_station',
    name: 'organization_station',
    component: path['organization_station']
  }
]

const router = new VueRouter({
  routes
})

export default router
