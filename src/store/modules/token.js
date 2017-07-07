import Vue from 'vue';

import * as types from '../mutation-types';

import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);

const state = {
    userid: null,
    token: null
};

const getters = {
    token: state => { return { userid: state.userid, token: state.token }; },
    isLogin: state => !!state.token
};

const actions = {
    set ({ commit, state }, data) {
        commit(types.SET_TOKEN, data);
    },
    reset ({ commit, state }) {
        commit(types.SET_TOKEN);
    }
};

const mutations = {
    [types.SET_TOKEN] (state, { userid = null, token = null } = {}) {
        state.userid = userid;
        state.token = token;

        let expiration = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
        store.set('token', { userid, token }, expiration);
        console.log(store.get('token'));
    }
};

if (store.get('token')) {
    Vue.set(state, 'userid', store.get('token').userid);
    Vue.set(state, 'token', store.get('token').token);
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
