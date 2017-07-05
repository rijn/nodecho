import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.root = '/api';

export default class Resource {
    static models;

    constructor (props) {
        this.models = {};
    }

    static install (Vue, options) {
        this.models = {
            files: Vue.resource('files'),
            posts: Vue.resource('posts'),
            tokens: Vue.resource('tokens', {}, {
                generate: { method: 'POST' }
            })
        };

        Vue.prototype.$api = this.models;
    };
};
