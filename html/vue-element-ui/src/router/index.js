import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import HomeIndex from '@/components/home/Index'
import UserIndex from '@/components/user/Index'
import DeptIndex from '@/components/dept/Index'
import store from '../store/index.js'
Vue.use(Router)


var routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/home/index',
        name: 'HomeIndex',
        component: HomeIndex
    },
    {
        path: '/user/index',
        name: 'UserIndex',
        component: UserIndex
    },
    {
        path: '/dept/index',
        name: 'DeptIndex',
        component: DeptIndex
    }
];

var router = new Router({
    routes
});

store.commit('setComponents',{components:routes});

export default router;


