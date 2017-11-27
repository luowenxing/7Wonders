<template>
    <div>
        <div class="hand-cards" >
            <transition-group 
            class="hand-cards-container"
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
                class="hand-card"
                @click.native="chooseCard(index)"/>
            </transition-group>
        </div>
        <CardDetail 
        v-if="showCardDetail" 
        :card="choosenCard" 
        :index="choosenIndex"
        :visible="visibleCardDetail"
        v-on:cancelChoose="cancelChoose"
        v-on:finishChoose="finishChoose"/>
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
                visibleCardDetail:false,
                choosenIndex:0,
                choosenCard:null,
                choosing:false,
                offsetStyle:[],
            }
        },
        methods:{
            beforeLeave(el){

            },
            leave(el,done){
                let a = {...{a:1}}
                if(this.status === GameStatus.Start) {
                    done()
                }
                else if(this.status === GameStatus.NextRound) {
                    let index = Number(el.dataset['index'])
                    setTimeout(() => {  
                        el.style.transform = 'rotateY(90deg)'
                        setTimeout(done,300)
                    },index * 150)
                } else if(this.status === GameStatus.NeedChoose){
                    this.elTransform(el)
                    this.showCardDetail = true
                    setTimeout(() => {
                        this.choosing = false
                        this.visibleCardDetail = true
                        done()
                    },300)
                } else {
                    done()
                }
            },
            afterLeave(el){
                //el.style.transform = ''
                
            },
            beforeEnter(el){

            },
            enter(el,done){
                if(this.status === GameStatus.Start) {
                    done()
                }
                else if(this.status === GameStatus.NextRound) {
                    let index = Number(el.dataset['index'])
                    el.style.transition = 'none'
                    el.style.transform = 'rotateY(90deg)'
                    setTimeout(() => { 
                        setTimeout(() => {
                            el.style.transition = ''
                            el.style.transform = ''
                            setTimeout(done,300)
                        },0)
                    },index * 150 + 300)
                } else if(this.status === GameStatus.NeedChoose) {
                    el.style.transition = 'none'
                    this.elTransform(el)
                    setTimeout(() => {
                        el.style.transition = ''
                        this.elTransformClear(el)
                        setTimeout(done,300)
                    },0)
                } else {
                    done()
                }
            },
            afterEnter(el){

            },  
            elTransform(el) {
                let windowWidth = this.$el.querySelector('.hand-cards-container').offsetWidth
                let windowHeight = window.innerHeight
                let origniX = Number(el.style.left.replace('%','')) / 100
                let translateX = (aniMarginP - origniX) * windowWidth
                let translateY = - ((1 - aniCardHeightP ) * windowHeight - aniMarginP * windowWidth)
                let width = windowWidth * aniCardToWidthP
                let height = windowHeight *  aniCardToHeightP
                let transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(0)`
                el.style.padding = '0px'
                el.style.transform = transform
                el.style.webkitTransform = transform
                el.style.width = width + 'px'
                el.style.height = height + 'px'
            },
            elTransformClear(el) {
                el.style.transform = ''
                el.style.width = ''
                el.style.height = ''
                el.style.padding = ''
            },
            chooseCard(index){
                if(this.status != GameStatus.WaitForChoice) {
                    if(!this.choosing) {
                        this.choosenIndex = index
                        this.choosenCard = this.handCards[index]
                        this.$store.commit('chooseCard',index)
                        this.choosing = true
                    }
                }
            },
            cancelChoose(index,card) {
                this.showCardDetail = false
                this.visibleCardDetail = false
                this.$store.commit('insertCard',{index,card})
            },
            finishChoose(index,card) {
                this.showCardDetail = false
                this.visibleCardDetail = false
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
                let length = this.handCards.length
                let offset = length * aniCardWidthP - 1
                offset = offset > 0 ? offset / (length - 1) : offset / 2
                let arr = new Array(length)
                arr.fill(0)
                arr = arr.map((item,index) => {
                    if(offset > 0) {
                        return (aniCardWidthP - offset) * index * 100
                    } else {
                        return (-offset + index * aniCardWidthP) * 100
                    }
                })
                this.offsetStyle = arr.map(item => {
                    return {
                        left:item + '%'
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
    .hand-cards {
        position:fixed;
        bottom:0;
        width:100%;
        height:20%;
    }
    .hand-cards>div {
        width:100%;
        height:100%;
        position:relative;
    }
    .hand-cards .hand-card {
        padding:4px;
        width:25%;
        position:absolute;
        top:0;
        left:0;
        transition:all 300ms;
        transform:translateZ(0);
        font-size:10px;
    }

</style>