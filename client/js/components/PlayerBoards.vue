<template>
    <swipe ref="swipe" :showIndicators="false" :auto="-1" :initialIndex="index" style="width:100%">
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
            status(){
                return this.$store.state.status
            },
            index(){
                return this.$store.state.index
            }
        },
        watch:{
            status(val){
                if(val === GameStatus.NextRound) {
                    this.$refs.swipe.animateToIndex(this.index)
                }
            }
        },
        components:{
            PlayerBoard,
            Swipe,
            SwipeItem
        }
    }
</script>