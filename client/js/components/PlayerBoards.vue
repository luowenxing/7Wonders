<template>
    <swipe v-on:onSwipeEnd="onSwipeEnd" ref="swipe" :showIndicators="false" :auto="-1" :initialIndex="index" style="width:100%">
        <swipe-item :key="index" v-for="(player,index) in players">
            <div style="height:100%">
                <PlayerBoard :player="player" /> 
            </div>
        </swipe-item>
    </swipe>
</template>
<script>
    import PlayerBoard from './PlayerBoard'
    import Swipe from './swipe/swipe'
    import SwipeItem from './swipe/swipe-item'
    import { GameStatus } from 'shared/util/consts'
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
        watch:{
            currentIndex(val){
                this.$refs.swipe.animateToIndex(val)
            }
        },
        methods:{
            onSwipeEnd(index){
                this.$store.commit('updateCurrentIndex',index)
            }
        },
        components:{
            PlayerBoard,
            Swipe,
            SwipeItem
        }
    }
</script>