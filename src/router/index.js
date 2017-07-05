import Vue from 'vue';
import Router from 'vue-router';
const Hello = resolve => require(['@/components/Hello'], resolve);
const Post = resolve => require(['@/components/Post'], resolve);

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
