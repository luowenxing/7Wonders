<template>
    <div class="card-effect-container">
        <div class="card-effect">
            <div v-for="effect in cardEffect" class="card-effect-item" :style="{width:effect.width}">
                <img :src="require('../../assets/images/' + effect.imageName + '.png')"  alt="" />
                <div> {{ effect.innerText }} </div>
            </div>
        </div>

        <div class="card-effect card-or-res">
            <div v-for="res in cardOrRes" class="card-res-item card-or-res-item" v-bind:class="{black:isBlack,white:!isBlack}">
                <img :src="require('../../assets/images/' + res.imageName + '.png')"  alt="" />
            </div>
        </div>
    </div>
</template>
<script>
    import { cardEffectRepresent,resRepresent } from '../lib/CardHelper.js'
    import { Color } from 'shared/util/consts.js'
    export default {
        computed:{
            cardEffect(){
                return cardEffectRepresent(this.card)
            },
            cardOrRes() {
                let res = this.card.orRes 
                return res ? resRepresent(this.card.orRes) : []
            },
            isBlack() {
                let color = this.card.color
                return color === Color.Yellow || color === Color.Grey
            },
        },
        props:{
            card:{
                type:Object,
                required:true
            },
        }
    }
</script>
<style>
/* 卡片的效果 */
    .card-effect-container .card-effect .card-effect-item,
    .card-effect-container .card-or-res .card-or-res-item {
        text-align: center;
        position:relative;
        width:40%;
        margin: 0 3%;
        font-size: 0px;
        display: flex;
        align-items: center;
    }
    .card-effect-container .card-effect {
        display: flex;
        justify-content: center;
    }

    .card-effect-container .card-effect .card-effect-item>img,
    .card-effect-container .card-or-res .card-or-res-item>img {
        width:100%;
    }

    .card-effect-container .card-effect .card-effect-item>div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 16px;
        font-weight: bold;
        font-family: sans-serif
    }

    /* 卡片提供的可选资源 */
    .card-effect-container .card-or-res .card-or-res-item:after {
        content: '';
        position: absolute;
        width: 6%;
        right:-8%;
        height: 60%;
        top: 50%;
        transform: skewX(-10deg) translateY(-50%)
    }
    .card-effect-container .card-or-res .card-or-res-item.black:after {
        background-color: black;
    }
    .card-effect-container .card-or-res .card-or-res-item.white:after {
        background-color: white;
    }
    .card-effect-container .card-or-res .card-or-res-item:last-child:after {
        display: none;
    }
</style>