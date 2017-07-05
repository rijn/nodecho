import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import resource from './resource';

import 'iview/dist/styles/iview.css';
import 'normalize.css/normalize.css';

Vue.config.productionTip = false;

Vue.use(Vuex);

Vue.use(VueResource);
Vue.http.options.root = '/api';
Vue.use(resource);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
