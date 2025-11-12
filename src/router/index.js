// src/router/index.js
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
/* eslint-disable */ 
import InheritanceCalculatorView from '@/views/InheritanceCalculatorView.vue';


const routes = [
  {
    path: '/',
    name: 'InheritanceCalculator',
    component: InheritanceCalculatorView,
  }
  // 다른 라우트들 추가 가능
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
