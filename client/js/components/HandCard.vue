<template>
    <div class="card-container" v-bind:class="type">
        <div :style="handCardStyle" class="card">
            <div> {{ card.name }} </div>

            <div class="card-effect">
                <div v-for="effect in cardEffect" class="card-effect-item">
                    <img :src="require('../../assets/images/' + effect.imageName + '.png')"  alt="" />
                    <div> {{ effect.innerText }} </div>
                </div>
            </div>

            <div class="card-effect card-or-res">
                <div v-for="res in cardOrRes" class="card-res-item card-or-res-item" v-bind:class="{black:isBlack,white:!isBlack}">
                    <img :src="require('../../assets/images/' + res.imageName + '.png')"  alt="" />
                </div>
            </div>

            <div class="card-cost" v-if="type != 'hand-card'">
                <div v-for="cost in cardCost" class="card-cost-item">
                    <img :src="require('../../assets/images/' + cost.imageName + '.png')"  alt="" />
                    <div> {{ cost.innerText }} </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
    import { cardEffectRepresent,resRepresent,cardCostsRepresent } from '../lib/CardHelper.js'
    import { Color } from 'shared/util/consts.js'
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
            cardEffect() {
                let effects = cardEffectRepresent(this.card)
                let res = this.card.res 
                return effects.concat(res ? resRepresent(this.card.res) : [])
            },
            cardCost() {
                return cardCostsRepresent(this.card)
            },
            cardOrRes() {
                let res = this.card.orRes 
                return res ? resRepresent(this.card.orRes) : []
            },
        }
    }
</script>
<style>
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
    }

    /* 卡片花费 */
    .card-container .card .card-cost,
    .card-container .card .card-effect {
        display: flex;
    }
    .card-container .card .card-cost .card-cost-item {
        text-align: center;
        position:relative;
        width:14%;
    }
    .card-container .card .card-cost .card-cost-item>img,
    .card-container .card .card-effect .card-effect-item>img,
    .card-container .card .card-or-res .card-or-res-item>img {
        width:100%;
    }
    .card-container .card .card-cost .card-cost-item>div,
    .card-container .card .card-effect .card-effect-item>div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif
    }

    /* 卡片提供的资源 */
    .card-container .card .card-effect .card-effect-item {
        text-align: center;
        position:relative;
        width:20%;
    }
    .card-container .card .card-effect {
        flex-direction: row-reverse;
    }

    /* 卡片提供的可选资源 */
    .card-container .card .card-or-res .card-or-res-item {
        position: relative;
        margin: 0px 4px
    }
    .card-container .card .card-or-res .card-or-res-item:after {
        content: '';
        position: absolute;
        width: 4px;
        height: 60%;
        top: 50%;
        transform: skewX(-10deg) translateY(-50%)
    }
    .card-container .card .card-or-res .card-or-res-item.black:after {
        background-color: black;
    }
    .card-container .card .card-or-res .card-or-res-item.white:after {
        background-color: white;
    }
    .card-container .card .card-or-res .card-or-res-item:first-child:after {
        display: none;
    }





</style>