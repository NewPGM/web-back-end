import { createRouter, createWebHistory } from 'vue-router'
import InstructorManagement from '../views/InstructorManagement.vue'
import RoomManagement from '../views/RoomManagement.vue'

const routes = [
  {
    path: '/',
    redirect: '/instructors'
  },
  {
    path: '/instructors',
    name: 'instructors',
    component: InstructorManagement
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: RoomManagement
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router