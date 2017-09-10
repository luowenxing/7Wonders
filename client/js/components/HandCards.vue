<template>
    <div class="hand-cards"  >
        <swipe :showIndicators="false" :auto="-1" style="width:100%">
            <swipe-item v-for="(handCard,index) in handCards">
                <HandCard :card="handCard" :index="index" />
            </swipe-item>
        </swipe>
    </div>
</template>
<script>
    import HandCard from './HandCard.vue'
    import Swipe from './swipe/swipe'
    import SwipeItem from './swipe/swipe-item'
    export default {
        methods:{
            chooseCard(index){
                console.log(index)
            }
        },
        computed:{
            handCards(){
                return this.$store.state.cards
            }
        },
        components:{
            HandCard,
            Swipe,
            SwipeItem
        }
    }
</script>
<style>
    .hand-cards {
        display:flex;
        -webkit-display:flex;
        width: 100%;
        height:100px;
    }

</style>