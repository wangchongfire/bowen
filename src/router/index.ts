import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useStore} from 'vuex'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta:{requireNotLogin:true}
  },
  {
    path: '/column/:id',
    name: 'column',
    component: () => import('../views/ColumnDetailView.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreatePostView.vue'),
    meta:{requireLogin:true},//
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to,from,next) => {
  const store = useStore();
  console.log();
  if(!store.state.user.isLogin && to.meta.requireLogin){
    next({name:'login'});
  }else if(store.state.user.isLogin && to.meta.requireNotLogin){
    next('/');
  } else {
    next();
  }
})

export default router
