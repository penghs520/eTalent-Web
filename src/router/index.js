import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import index from '../views/index.vue'
import path from './path';

Vue.use(VueRouter)

const routes = [
  {
    path: '/qinjee/:id',
    component: index,
    children: []
  },
  {
    path: '/',
    name: 'login',
    component: login
  }
  
];

for (const key in path) {
  if (path.hasOwnProperty(key)) {
    const value = path[key];
    let route = {
      path: `/qinjee/${key}`,
      name: key,
      component: value
    };
    routes[0].children.push(route);
  }
}


const router = new VueRouter({
  routes
})

export default router
