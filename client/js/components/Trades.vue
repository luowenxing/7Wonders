<template>
   	<div class="trade-container">
   		<div v-for="trade in tradesResInfo" class="trade">
   			<img v-for="res in trade" :src="require('../../assets/images/' + res + '.png')"  alt="" />
   		</div>
   	</div>
</template>
<script>
	import { getResInArr } from '../lib/CardHelper.js'
    export default {
    	props:{
            trades:{
                type:Array,
                required:true
            }
        },

        computed:{
        	tradesResInfo() {
        		return this.trades.map(trade => {
        			return getResInArr(trade.res)
        		})
        	},
        },
    }
</script>
<style>
	.trade-container {
		display: flex;
		background:white
	}
	.trade {
		flex:1;
	}
	.trade img {
		width:20px;
	}
</style>