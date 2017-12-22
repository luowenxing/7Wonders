<template>
    <div class="player-state-container">
        <div class="player-state" v-for="state in playerStates">
            <img :src="require('../../assets/images/' + state.imageName + '.png')"  alt="" />
            <div> {{ state.innerText }} </div>
        </div>
    </div>
</template>
<script>
    import { cardEffectRepresent,resRepresent } from '../lib/CardHelper.js'
    import { Color } from 'shared/util/consts.js'
    export default {
        computed:{
            playerStates(){
                return ['Money','Arms','Score'].map(key => {
                    return {
                        imageName:key,
                        innerText:this.player[key.toLocaleLowerCase()]
                    }
                })
            },
        },
        props:{
            player:{
                type:Object,
                required:true
            },
        }
    }
</script>
<style>
    .player-state-container {
        display: flex;
        display: -webkit-flex;
        justify-content: space-evenly;
    }
    .player-state-container .player-state {
        text-align: center;
        position: relative;
        line-height: 0px;
    }
    .player-state-container .player-state>img {
        height:100%;
    }
    .player-state-container .player-state>div {
        color:white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 16px;
        font-weight: bold;
        font-family: sans-serif
    }
</style>