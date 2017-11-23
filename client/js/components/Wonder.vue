<template>
    <div :style="'background-image:url('+ require('../../assets/images/' + player.wonder.name + '.jpg') +')'" class="wonder">
        <div class="wonder-res" :style="resStyle">
            <img v-for="res in resRepresent" :src="require('../../assets/images/' + res.imageName + '.png')"  alt="" />
        </div>
        <div class="wonder-stages">
            <div v-for="wonder in currentWonder" class="wonder-stage" >
                <div class="wonder-stage-container">

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
    export default {
    	props:{
            player:{
                type:Object,
                required:true
            }
        },
        created(){

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
            currentWonder(){
                return this.Player.wonder.current
            }
        }

    }
</script>
<style>
    .wonder {
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
    }
    .wonder .wonder-res {
        width: 80px;
        height: 40px;
        text-align: center;
        padding: 4px 0px;
    }
    .wonder .wonder-res img {
        height:100%;
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
        margin-top:40px;
        border:4px solid #FFFFFF;
        border-bottom: none;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        display: flex;
        display: -webkit-flex;
        
    }



</style>