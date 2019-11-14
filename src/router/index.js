import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import index from '../views/index.vue'
import path from './path';

import loginEntry from '../views/login/login.vue'
import register from '../views/login/register'
import findPassword from '../views/login/find-password'
import setPassword from '../views/login/set-password'
import create from '../views/login/create-or-join'


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
    component: login,
    children:[
      {path:'/',component:loginEntry},
      {path:'/register',component:register},
      {path:'/findpassword',component:findPassword},
      {path:'/setpassword',component:setPassword},
      {path:'/create',component:create},
    ]
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
