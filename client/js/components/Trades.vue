<template>
   	<div class="trade-container cost">
        <div class="cost-item">
            <img :src="require('../../assets/images/Money.png')" />
            <div> {{ costMoney }} </div>
        </div>
   		<div class="trade left">
            <img :src="require('../../assets/images/Left.png')" />
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
                rightTrade:[],
                costMoney:0,
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
            this.costMoney = -this.trades.reduce((sum,item) => {
                return item.costMoney + sum
            },0)
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
        position: relative;
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
		width:22px;
        height:100%;
        margin:0px 2px;
        flex:0 0 auto;
	}
    .trade-container.cost .cost-item {
        position: absolute;
        width: 24px;
        margin: 0;
        left: 50%;
        transform: translateX(-50%);
    }
</style>