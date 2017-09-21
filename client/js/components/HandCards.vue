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
                :data-index="index"
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
    import { GameStatus } from 'shared/util/consts'

    const aniMarginP = 0.2
    const aniCardWidthP = 0.25
    const aniCardHeightP = 0.2
    const aniCardToWidthP = 1 - 2 * aniMarginP
    const aniCardToHeightP = aniCardToWidthP / aniCardWidthP * aniCardHeightP

    export default {
        data(){
            return {
                showCardDetail:false,
                choosenIndex:0,
                choosenCard:null,
                offsetStyle:[],
            }
        },
        methods:{
            beforeLeave(el){
                el.style.transition = 'none'
            },
            leave(el,done){
                let a = {...{a:1}}
                if(this.status === GameStatus.Start) {
                    done()
                }
                else if(this.status === GameStatus.NextRound) {
                    let index = Number(el.dataset['index'])
                    setTimeout(() => {  
                        Velocity(el, {rotateY:'90deg'}, { duration: 150,complete:done })
                    },index * 100)
                } else if(this.status === GameStatus.NeedChoose){
                    let transform = this.elTransform(el)
                    Velocity(el, transform.min,{
                        duration:0,
                        complete:() => {
                            Velocity(el, transform.max, { duration: 300,complete:done })
                        }
                    })
                } else {
                    done()
                }
            },
            afterLeave(el){
                //el.style.transform = ''
                this.showCardDetail = true
            },
            beforeEnter(el){
                el.dataset['transform'] = el.style.transform
                el.style.transition = 'none'
            },
            enter(el,done){
                if(this.status === GameStatus.Start) {
                    done()
                }
                else if(this.status === GameStatus.NextRound) {
                    let index = Number(el.dataset['index'])
                    setTimeout(() => {  
                        Velocity(el, {rotateY:['0deg','90deg']}, { duration: 150,complete:done })
                    },index * 100 + 150)
                } else if(this.status === GameStatus.NeedChoose) {
                    let transform = this.elTransform(el)
                    Velocity(el, transform.max,{
                        duration:0,
                        complete:() => {
                            Velocity(el, transform.min, { duration: 300,complete:done })
                        }
                    })
                } else {
                    done()
                }
            },
            afterEnter(el){
                el.style.cssText = ''
                el.style.transform = el.dataset['transform']
            },  
            elTransform(el) {
                let transform = el.style.transform
                let windowWidth = window.outerWidth
                let windowHeight = window.outerHeight
                let tranXP = Number(this.getTranX(transform).replace('%','')) / 100
                let tranX = tranXP * aniCardWidthP * windowWidth
                return {
                    min:{
                        translateX:tranX,
                        translateY: 0  ,
                        width:windowWidth * aniCardWidthP,
                        height:windowHeight *  aniCardHeightP 
                    },
                    max:{
                        translateX:(aniMarginP) * windowWidth,
                        translateY: - ((1 - aniCardHeightP ) * windowHeight - aniMarginP * windowWidth)  ,
                        width:windowWidth * aniCardToWidthP,
                        height:windowHeight *  aniCardToHeightP 
                    }
                }
            },

            chooseCard(index){
                this.choosenIndex = index
                this.choosenCard = this.handCards[index]
                this.$store.commit('chooseCard',index)
            },
            cancelChoose(index,card) {
                this.showCardDetail = false
                this.$store.commit('insertCard',{index,card})
            },
            getTranX(transform) {
                let transXRegex = /\.*translateX\((.*?)\)/i
                return transXRegex.exec(transform)[1];
            }
        },
        computed:{
            handCards(){
                return this.$store.state.cards
            },
            status(){
                return this.$store.state.status
            }
        },
        watch:{
            handCards(){
                let width = aniCardWidthP * 100
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