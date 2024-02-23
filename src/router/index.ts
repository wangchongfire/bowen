import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import {useStore} from 'vuex';
import axios from 'axios';
import {useUserStore} from '../store/user'

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
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('../views/PostDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to,from,next) => {
  // const store = useStore();
  const userStore = useUserStore();
  // const {user,token} = store.state;
  const {requireLogin,requireNotLogin} = to.meta;

  if(!userStore.isLogin){
    if(userStore.token){
      axios.defaults.headers.common.Authorization = `Bearer ${userStore.token}`;

      userStore.fetchCurrentUser().then(() => {
        if(requireNotLogin){
          next('/');
        }else{
          next();
        }
      }).catch(err => {
        console.log('路由守卫错误:',err);
        userStore.logout();
        next('login');
      })

    }else{
      if(requireLogin){
        next('login');
      }else{
        next();
      }
    }
  }else{
    if(requireNotLogin){
      next('/');
    }else{
      next();
    }
  }
})

export default router
