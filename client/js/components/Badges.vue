<template>
    <div class="badges-container">
        <div class="badge" :key="index" v-for="(player,i) in players"
            v-bind:class="{currentPlayer: index == i,currentActive:currentIndex == i}">
            <img :src="require('../../assets/images/badge_' + player.wonder.name + '.png')" 
                @click="handleClickBadge(i)"/>
        </div>
    </div>
</template>
<script>
    export default {
        computed:{
            players(){
                return this.$store.state.players
            },
            currentIndex(){
                return this.$store.state.currentIndex
            },
            index(){
                return this.$store.state.index
            }
        },
        methods:{
            handleClickBadge(index) {
                this.$store.commit('updateCurrentIndex',index)
            }
        }
    }
</script>
<style>
    .badges-container {
        position: fixed;
        top:0;
        width:100%;
        line-height: 0px;
        background-image:url(../../assets/images/BadgeBoard.png);
    }
    .badges-container .badge {
        float:left;
        width:12%;
        padding: 4px;
    }
    .badges-container .badge img {
        width: 100%;
        padding: 2px;
    }
    .badges-container .badge.currentActive {
        background-image:url(../../assets/images/PlayerBoard.png);
    }
    .badges-container .badge.currentPlayer img{
        background:white;
    }
</style>