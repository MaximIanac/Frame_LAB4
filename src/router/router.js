import {createRouter, createWebHistory} from 'vue-router';
import Tasks from '../pages/Tasks.vue';
import TaskPage from '../pages/TaskPage.vue';
import Favourites from '../pages/Favourites.vue';

const routes = [
   {
    path: '/',
    component: Tasks
   },
   {
    path: '/tasks/:id',
    component: TaskPage
   },
   {
    path: '/save',
    component: Favourites
   }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
