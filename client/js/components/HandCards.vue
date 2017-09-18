<template>
    <div>
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
                :index="index" 
                :style="offsetStyle[index]"
                @click.native="chooseCard(index)"/>
            </transition-group>
        </div>
        <CardDetail 
        v-if="showCardDetail" 
        :card="choosenCard" 
        :index="choosenIndex"
        v-on:cancelChoose="cancelChoose"/>
    </div>
</template>
<script>
    import HandCard from './HandCard.vue'
    import CardDetail from './CardDetail.vue'
    import Velocity from 'velocity-animate'
    export default {
        data(){
            return {
                showCardDetail:false,
                choosenIndex:0,
                choosenCard:null,
                offsetStyle:[]
            }
        },
        methods:{
            beforeLeave(el){
                
            },
            leave(el,done){
                el.style.transform = `translateX(150%) translateY(-200%)`
                setTimeout(done,1000)
            },
            afterLeave(el){
                //el.style.transform = ''
            },
            beforeEnter(el){
                el.style.transform = `translateX(150%) translateY(-200%)`
            },
            enter(el,done){
                let index = Array.prototype.indexOf.call(el.parentNode.children, el)
                el.style.transform = this.offsetStyle[index]['transform']
                setTimeout(done,1000)
            },
            afterEnter(el){
                //el.style.transform = ''
            },
            chooseCard(index){
                this.choosenIndex = index
                this.choosenCard = this.handCards[index]
                this.showCardDetail = true
                this.$store.commit('deleteCard',index)
            },
            cancelChoose(index,card) {
                this.showCardDetail = false
                this.$store.commit('insertCard',{index,card})
            }
        },
        computed:{
            handCards(){
                return this.$store.state.cards
            }
        },
        watch:{
            handCards(){
                let width = 25
                let length = this.handCards.length
                let offset = length * width - 100
                offset = offset > 0 ? offset / (length - 1) : offset / 2
                // 比例按照自身的比例来算，而不是父容器
                offset = offset / width * 100
                let arr = new Array(length)
                arr.fill(0)
                arr = arr.map((item,index) => {
                    let base = index * 100
                    if(offset > 0) {
                        return base - index * offset
                    } else {
                        return base - offset
                    }
                })
                this.offsetStyle = arr.map(item => {
                    return {
                        transform:`translateX(${item}%)`
                    }
                })
            }
        },
        components:{
            HandCard,
            CardDetail
        }
    }
</script>
<style>
    .hand-cards>div {
        position:fixed;
        bottom:0;
        width:100%;
        height:20%;
    }
    .hand-cards .hand-card {
        width:25%;
    }

</style>