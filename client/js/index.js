
import '../assets/main.css';
import Vue from 'vue';
import Vuex from 'vuex';
import Game from './components/Game';
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
        return h(Game);
    }
});