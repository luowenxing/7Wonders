<template>
    <div class="card-container" v-bind:class="type">
        <div :style="handCardStyle" class="card">
            <div class="card-cost">
                <div class="card-cost-bg">
                    <div v-for="cost in cardCost" class="card-cost-item">
                        <img :src="require('../../assets/images/' + cost.imageName + '.png')"  alt="" />
                        <div> {{ cost.innerText }} </div>
                    </div>
                </div>
            </div>
            <div class="card-info" >
                <div class="card-name"> {{ card.name }} </div>
                <CardEffect :card="card" />
            </div>
        </div>
    </div>
</template>
<script>
    import { cardEffectRepresent,resRepresent,cardCostsRepresent } from '../lib/CardHelper.js'
    import { Color } from 'shared/util/consts.js'
    import CardEffect from './CardEffect.vue'
    export default {
        props:{
            card:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            },
            type:{
                type:String,
                required:false
            }
        },
        computed:{
            handCardStyle(){
                let isBlack = false
                let color = this.card.color
                if(color === Color.Grey) {
                    color = 'lightgrey'
                }
                return {
                    backgroundColor:color,
                    color:this.isBlack ? 'black' : 'white'
                }
            },
            isBlack() {
                let color = this.card.color
                return color === Color.Yellow || color === Color.Grey
            },
            cardCost() {
                return cardCostsRepresent(this.card)
            },
        },
        components:{
            CardEffect
        }
    }
</script>
<style>
    
    .hand-cards .card-container .card-cost .card-cost-item>div,
    .hand-cards .card-container .card-effect .card-effect-item>div {
        font-size: 8px;
        font-weight: normal;
    }


    .card-container {
        word-break: break-all;
        width:100%;
        height:100%;
    }
    .card-container .card {
        height:100%;
        padding:4px;
        border-radius: 4px;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 black, 0 0 6px 0 black;
        display: flex;
        line-height:0px;
    }

    /* 卡片花费 */
    .card-container .card .card-cost {
        width:15%;
        flex:0 0 15%;
    }

    .card-container .card .card-info {
        width: 85%;
        flex:1;
        padding-left:4px;
    }
    .card-container .card .card-info .card-name {
        line-height: initial;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .card-container .card .card-cost .card-cost-item {
        text-align: center;
        position:relative;
        margin:4px 0px;
    }

    .card-container .card-cost .card-cost-item>img{
        width:100%;
    }
    
    .card-container .card-cost .card-cost-item>div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif
    }


</style>