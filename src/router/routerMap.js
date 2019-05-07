/*
* author: wancheng
* date: 11/5/18
* desc:
*/

import Layout from '~/views/layout/Layout';


let constantRouterMap = [
    {path: '/404', component: () => import('../views/error/404'), hidden: true},
    // 首页
    {
        path: '',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            component: () => import('../views/home/index'),
            name: 'homeIndex',
            meta: {title: '分片总览', icon: 'excel', noCache: true}
        }]
    },

    // {
    //     path: '/list',
    //     component: Layout,
    //     redirect: '/list/index',
    //     children: [{
    //         path: 'index',
    //         component: () => import('../views/list/index'),
    //         name: 'listIndex',
    //         meta: {title: '事务列表', icon: 'excel', noCache: true}
    //     }]
    // },
    {
        path: '/active',
        component: Layout,
        redirect: '/active/index',
        children: [
            {
                path: 'index',
                component: () => import('../views/active/index'),
                name: 'activeIndex',
                meta: {title: '活动事务', icon: 'excel', noCache: true}
            },
            {
                path: 'show',
                hidden: true,
                component: () => import('../views/active/show'),
                name: 'activeShow',
                meta: {
                    title: '查看',
                    noCache: true,
                    parent: {path: '/active', meta: {title: '活动事务'}}
                }
            }
        ]
    },

    {path: '*', redirect: '/404', hidden: true}
];


export {
    constantRouterMap
}
