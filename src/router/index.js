import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
// Déclaration des différentes routes vers les vues
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/se-connecter',
    component: () => import('../views/SeConnecter.vue')
  },
  {
    path: '/creer-compte',
    component: () => import('../views/CreerCompte.vue')
  },
  {
    path: '/membres',
    component: () => import('../views/Membres.vue')
  },
  {
    path: '/membres/:membre_id',
    name : 'Membre',
    component: () => import('../views/Membre.vue')
  },
  {
    path: '/conversation/:id',
    name: 'Conversation',
    component: () => import('../views/Conversation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
