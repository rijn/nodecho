import * as types from '../mutation-types';

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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
