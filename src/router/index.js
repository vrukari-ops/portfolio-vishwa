// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import VoltageFighter from '../components/VoltageFighter.vue';

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/game', name: 'Game', component: VoltageFighter },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
