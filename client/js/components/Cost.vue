<template>
    <div class="cost cost-bg">
        <div v-for="cost in costItems" class="cost-item">
            <img :src="require('../../assets/images/' + cost.imageName + '.png')"  alt="" />
            <div> {{ cost.innerText }} </div>
        </div>
    </div>
</template>
<script>
    import { cardCostsRepresent } from '../lib/CardHelper.js'
	export default {
		props:{
			cost:{
                type:Object,
                required:true
            },
		},
		computed:{
			costItems(){
                return cardCostsRepresent(this.cost)
			}
		}
	}
</script>
<style>

	.cost .cost-item {
        text-align: center;
        position:relative;
        margin:4% 0px;
        line-height: 0px;
    }

    .cost .cost-item>img{
        width:100%;
    }
    
    .cost .cost-item>div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 16px;
        font-weight: bold;
        font-family: sans-serif
    }
</style>