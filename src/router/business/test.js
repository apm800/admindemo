const page1 = () => import('../../business/test/page1')
const page11 = () => import('../../business/test/page1_1')
const page2 = () => import('../../business/test/page2')
// const page3 = () => import('../../business/test/page3')
const page3 = () => import('../../components/sys/menu')

export default [
    {
        path: '/page3',
        name: 'index',
        component: page3,
        meta: { keepAlive: true }
    },
    {
        path: '/page1',
        name: 'page1',
        component: page1,
        meta: { keepAlive: true,
                perm: '*'
        },
    },
    {
        path: '/page11',
        name: 'page11',
        component: page11,
        meta: { keepAlive: true },
    },
    {
        path: '/page2',
        name: 'page2',
        component: page2,
        meta: { keepAlive: true }
    },
]
