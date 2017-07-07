import Vue from 'vue';
import App from './App';
import router from './router';
import resource from './resource';
import store from './store';

import './styles/index.less';
import 'normalize.css/normalize.css';

Vue.config.productionTip = false;

Vue.use(resource);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
