import Vue from 'vue';
import Vuex from 'vuex';
import token from './modules/token';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'prod';

export default new Vuex.Store({
    modules: {
        token
    },
    strict: debug
});
