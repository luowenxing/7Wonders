
import '../assets/main.css';
import Vue from 'vue';
import Vuex from 'vuex';
import HandCards from './components/HandCards';
import Network from './lib/network.js';

//the main entrance
/* eslint-disable no-new */
var b = {name:1}
var a = {...b}
Vue.use(Vuex)
new Vue({
    el:'#application',
    render(h) {
        return h(HandCards);
    }
});