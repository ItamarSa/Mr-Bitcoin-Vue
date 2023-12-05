import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ContactIndex from '../pages/ContactIndex.vue'
import ContactDetails from '../pages/ContactDetails.vue'
import ContactEdit from '../pages/ContactEdit.vue'
import Charts from '../pages/Charts.vue'
import Signup from '../pages/Signup.vue'
import Welcome from '../cmps/Welcome.vue'
import TransferFound from '../pages/TransferFound.vue'

const routeOptions = {
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/:id?',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },

    {
      path: '/contact',
      name: 'ContactIndex',
      component: ContactIndex,
      children: [
        {
          path: '/contact/transfer/:id',
          name: 'transferFound',
          component: TransferFound,
        },

      ]
    },
    {
      path: '/contact/:contactId',
      name: 'ContactDetails',
      component: ContactDetails,
    },
    {
      path: '/edit/:contactId?',
      name: 'ContactEdit',
      component: ContactEdit,
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/About.vue')
    }
  ]
}
const router = createRouter(routeOptions)

export default router
