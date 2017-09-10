
import '../assets/main.css';
import Vue from 'vue';
import Vuex from 'vuex';
import HandCards from './components/HandCards';
import store from './store/store'
import SocketPlugin from './lib/SocketPlugin'
//the main entrance
/* eslint-disable no-new */
Vue.use(Vuex)
Vue.use(SocketPlugin)
new Vue({
    store,
    el:'#application',
    render(h) {
        return h(HandCards);
    }
});