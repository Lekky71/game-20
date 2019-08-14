import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login';
import CreateGame from './views/CreateGame';
import JoinGame from './views/JoinGame';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
    },
    {
      path: '/start',
      name: 'start',
      component: CreateGame,
    },
    {
      path: '/join',
      name: 'join',
      component: JoinGame,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
