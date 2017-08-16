
import '../css/main.css';
import Vue from 'vue';
import Vuex from 'vuex';
import Game from './components/Game';
import store from './vuex/store'

//the main entrance
/* eslint-disable no-new */
Vue.use(Vuex)
new Vue({
    el:'#application',
    store,
    render(h) {
        return h(Game);
    }
});