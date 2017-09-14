<template>
    <div class="hand-cards" >
        <transition-group 
        tag="div" 
        v-on:leave="leave"
        v-on:before-leave="beforeLeave"
        v-on:after-leave="afterLeave"
        v-on:enter="enter"
        v-on:before-enter="beforeEnter"
        v-on:after-enter="afterEnter"
        v-bind:css="false">
            <HandCard 
            v-for="(handCard,index) in handCards" 
            :key="handCard.uuid"
            :card="handCard" 
            :index="index" />
        </transition-group>
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
            },
            beforeLeave(el){
                el.style.transition = 'all 1s'
            },
            leave(el,done){
                el.style.transform = 'translateX(-700%)'
                setTimeout(done,1000)
            },
            afterLeave(el){
                el.style.transform = ''
            },
            beforeEnter(el){
                el.style.transition = 'all 1s'
            },
            enter(el,done){
                el.style.transform = 'translateX(-700%)'
                setTimeout(done,1000)
            },
            afterEnter(el){
                el.style.transform = ''
            }
        },
        computed:{
            handCards(){
                return this.$store.state.cards
            },
            // offsetStyle(){
            //     let length = this.handCards.length
            //     let count = length - 5
            //     let arr = new Array(length)
            //     arr.fill(0)
            //     if(count > 0) {
            //         let width = count * 20
            //         let step = width / (length - 1)
            //         arr.forEach( (item,index) =>{
            //             arr[index] = step * index * 5
            //         })
            //     }
            //     return arr.map(item => {
            //         return {
            //             transform:`translateX(${-item}%)`
            //         }
            //     })
            // }
        },
        components:{
            HandCard,
            Swipe,
            SwipeItem
        }
    }
</script>
<style>
    .hand-cards>div {
        position:fixed;
        bottom:0;
        width:100%;
        height:100px;
        display: flex;
        display: -webkit-flex;
        overflow: scroll;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-leave-to,.list-enter-to {
        transform:translateX(-700%);
    }

</style>