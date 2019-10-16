import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        auth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        auth: true
      },
      component: () => import('./views/Cart.vue')
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要检测登陆
    if (store.state.token) {
      //已登陆
      next();
    } else {
      //未登陆
      // next('./login?redirect=' + to.path);
      next({
        path: './login',
        query: {
          redirect: to.path
        }
      });
    }
  } else {
    next();
  }
});
export default router;
