import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import CreateGame from './views/CreateGame.vue';
import JoinGame from './views/JoinGame.vue';
import Game from './views/Game.vue';

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
      path: '/game/:sessionCode',
      name: 'game',
      component: Game,
      props: true,
    },
  ],
});
