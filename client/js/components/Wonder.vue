<template>
    <div :style="'background-image:url('+ require('../../assets/images/' + player.wonder.name + '.jpg') +')'" class="wonder">
        <div class="wonder-info" >
            <div class="wonder-res" :style="resStyle">
                <img v-for="res in resRepresent" :src="require('../../assets/images/' + res.imageName + '.png')"  alt="" />
            </div>
            <PlayerState class="wonder-player-state" :player="Player" />
        </div>

        <div class="wonder-stages">
            <div v-for="(stage,index) in wonderStages" class="wonder-stage" :class="{build:isBuild(index)}">
                <div class="wonder-stage-container">
                    <Cost :cost="stage" class="wonder-stage-cost"/>
                    <CardEffect :card="stage" class="wonder-stage-effect" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { resRepresent } from '../lib/CardHelper.js'
    import { Color } from 'shared/util/consts.js'
    import Resources from  'shared/cards/Resources.js'
    import Player from 'shared/player.js'
    import Cost from './Cost.vue'
    import CardEffect from './CardEffect.vue'
    import PlayerState from './PlayerState.vue'
    export default {
    	props:{
            player:{
                type:Object,
                required:true
            }
        },
        created(){

        },
        methods:{
            isBuild(index){
                let current = this.Player.wonder.current
                return index < current.stageLevel 
            }
        },
        computed:{
            resRepresent(){
                return resRepresent(this.player.wonder.res)
            },
            resStyle(){
                var color = new Resources(this.player.wonder.res).color
                return {
                    backgroundColor:color
                }
            },
            Player(){
                return new Player(this.player)
            },
            wonderStages(){
                return this.Player.wonder.current.stages
            },
        },
        components:{
            Cost,
            CardEffect,
            PlayerState
        }

    }
</script>
<style>
    .wonder {
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
    }
    .wonder .wonder-info {
        display: flex;
        display: -webkit-flex;
    }

    .wonder .wonder-info .wonder-res {
        width: 80px;
        height: 40px;
        text-align: center;
        padding: 4px 0px;
    }
    .wonder .wonder-info .wonder-res img {
        height:100%;
    }
    .wonder .wonder-info .wonder-player-state {
        flex:1;
        height:40px;
    }
    .wonder .wonder-stages {
        flex:1;
        display: -webkit-flex;
        display: flex;
        padding:0px 4px;
    }
    .wonder .wonder-stages .wonder-stage {
        flex:1;
        margin:0px 4px;
        margin-top:10%;
        border:4px solid #FFFFFF;
        border-bottom: none;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        display: flex;
        display: -webkit-flex;
        background: rgba(255,255,255,0.6);
    }
    .wonder .wonder-stages .wonder-stage.build {
        background: white;
    }

    .wonder-stage-container {
        display:flex;
        display: -webkit-flex;
        width:100%;
    }
    .wonder-stage-container .wonder-stage-cost {
        flex:0 0 20px;
        flex-direction: column-reverse;
        display: flex;
        display: -webkit-flex;
    }

    .wonder-stage-container .wonder-stage-effect {
        flex:1;
        display: flex;
        display: -webkit-flex;
        align-items: center;
    }

    .card-effect-container.wonder-stage-effect .card-or-res .card-or-res-item:after {
        background: black !important;
    }
    .card-effect-container.wonder-stage-effect .card-effect-item {
        width:60%;
    }




</style>