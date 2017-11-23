<template>
   	<div class="trade-container">
        <div class="left-indicator"> 
            <img :src="require('../../assets/images/Left.png')" />
        </div>
   		<div class="trade left">
            
            <img v-for="res in leftTrade" :src="require('../../assets/images/' + res.imageName + '.png')"  alt="" />
   		</div>
        <div class="trade right">
            <img :src="require('../../assets/images/Right.png')" />
            <img v-for="res in rightTrade" :src="require('../../assets/images/' + res.imageName + '.png')"  alt="" />
        </div>
   	</div>
</template>
<script>
	import { resRepresent } from '../lib/CardHelper.js'
    export default {
        data(){
            return {
                leftTrade:[],
                rightTrade:[]
            }
        },
        props:{
            trades:{
                type:Array,
                required:true
            }
        },
        created(){
            let trades = this.trades.map(trade => {
                return resRepresent(trade.res)
            })
            this.leftTrade = trades[0]
            this.rightTrade = trades[1]
        }
    }
</script>
<style>
    .trade-container {
		display: flex;
        background: white;
        padding: 4px;
        height: 30PX;
	}
	.trade {
		flex:1;
        display:-webkit-flex;
        display: flex;
	}
    .trade.right {
        flex-direction: row-reverse;
    }
	.trade img {
		width:20px;
        height:100%;
        margin:0px 2px;
        flex:0 0 auto;
	}
</style>