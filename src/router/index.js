import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/components/HomePage'


Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  }
]

const router = new Router({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if(to.path!=='/home') next({path: "/home"});
  else next();
});

export default router;