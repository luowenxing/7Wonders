<template>
    <swipe :showIndicators="false" :auto="-1" style="width:100%">
        <swipe-item :key="index" v-for="(player,index) in players">
            <PlayerBoard :player="player" />
        </swipe-item>
    </swipe>
</template>
<script>
    import PlayerBoard from './PlayerBoard'
    import Swipe from './swipe/swipe'
    import SwipeItem from './swipe/swipe-item'
    export default {
        computed:{
            players(){
                return this.$store.state.players
            }
        },
        components:{
            PlayerBoard
        }
    }
</script>