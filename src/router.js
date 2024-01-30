import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const Login = () => import('@/pages/Login.vue')
const Member = () => import('@/pages/Member.vue')
const NotFoundPage = () => import('@/pages/404.vue')

export default createRouter({
    history: createWebHashHistory(), // Hash路由
    routes: [
        {
            path: '/',
            name: 'Home',
            meta:{transition: 'fade', keepAlive: false },
            component: Home,
            children: []
        },
        {
            path: '/login',
            name: 'Login',
            meta:{transition: 'fade', isAlive: true },
            component: Login,
            children: []
        },
        {
            path: '/member',
            name: 'Member',
            meta:{transition: 'fade', isAlive: true },
            component: Member,
            children: []
        },
        { path: '/404', component: NotFoundPage }
    ]
})