import { createRouter, createWebHistory } from "vue-router";
import AuthPage from '../components/AuthPage.vue'
import MovieListPage from '../components/MovieListPage.vue'
import MovieCard from '../components/MovieCard.vue'
import NotFoundPage from "@/components/NotFoundPage.vue";

const routes = [
    {
        path: '/',
        component: AuthPage,
        name: 'AuthPage',
        props: true,
    },
    {
        // сделать page динамически
        path: '/movies/page=:page',
        component: MovieListPage,
        name: 'MoviesList',
        props: true
    },
    {
        path: '/movie/id=:id',
        component: MovieCard,
        name: 'card',
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
        name: 'not-found-page'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
