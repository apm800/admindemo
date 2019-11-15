import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//菜单的路由数组
import sys from './sys'
import test from './business/test'

import main from '../components/main'
import login from '../components/login'
import error from '../components/sys/error'
import noperm from '../components/sys/noperm'


let routerList=[
    {
        path: '/',
        redirect:'/index',
        name: 'main',
        component: main,
        children:test.concat(sys),
        meta: {keepAlive: true, perm: '*' }
    },
    {
        path:'/login',
        name: 'login',
        component: login,
        meta: { perm: '*' }
    },
    {
        path:'/noperm',
        name: 'noperm',
        component: noperm,
        meta: {keepAlive: true, perm: '*' }
    },
    {
        path:'*',
        name: 'error',
        component: error,
        meta: {keepAlive: true, perm: '*' }
    },
]

const router = new Router({
    routes:routerList
})

router.beforeEach((to, from, next) => {
    if(window.permission.indexOf(to.meta.perm?to.meta.perm:'')<0){
        if(from.path!='/login'){
            next({path:'/index'})
        }else{
            next({path:'/index'})
        }       
    }
    next()
})

router.afterEach((to, from) => {

    //main tab切换页面保存
    if(to.matched[0].name==='main'){
        $('.J_menuTab').each(function () {
            if($(this).hasClass('active')){
                $(this).attr('data-pid',to.path.substring(1))
            }
        })
    }
})


export default router
