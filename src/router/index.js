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
  }
];

for (const key in path) {
  if (path.hasOwnProperty(key)) {
    const value = path[key];
    let route = {
      path: `/${key}`,
      name: key,
      component: value
    };
    routes.push(route);
  }
}


const router = new VueRouter({
  routes
})

export default router
