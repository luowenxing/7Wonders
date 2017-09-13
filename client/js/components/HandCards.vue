<template>
    <div class="hand-cards">
        <HandCard v-for="(handCard,index) in handCards" 
        :key="index"
        :card="handCard" 
        :index="index" />
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
        position:fixed;
        bottom:0;
        width:100%;
        height:100px;
        display: flex;
        display: -webkit-flex;
    }

</style>