// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import VoltageFighter from '../components/VoltageFighter.vue';
import Hundekari from '../components/Hundekari.vue';
import Enoia from '../components/Enoia.vue';

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/game', name: 'Game', component: VoltageFighter },
  { path: '/hundekari', name: 'Hundekari', component: Hundekari },
  { path: '/enoia', name: 'Enoia', component: Enoia },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
