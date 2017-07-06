import Vue from 'vue';
import Router from 'vue-router';
const Hello = resolve => require(['@/components/Hello'], resolve);
const Post = resolve => require(['@/components/Post'], resolve);

const Admin = resolve => require(['@/components/Admin'], resolve);
const AdminHome = resolve => require(['@/components/AdminHome'], resolve);
const AdminPost = resolve => require(['@/components/AdminPost'], resolve);
const AdminEdit = resolve => require(['@/components/AdminEdit'], resolve);

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/post/:id',
            name: 'Post',
            component: Post
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    path: '',
                    name: 'AdminHome',
                    component: AdminHome
                },
                {
                    path: 'post',
                    name: 'AdminPost',
                    component: AdminPost
                },
                {
                    path: 'edit/:id',
                    name: 'AdminEdit',
                    component: AdminEdit
                }
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
