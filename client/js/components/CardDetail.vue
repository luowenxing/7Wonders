<template>
    <div class="modal" @click="cancelChoose">
        <div class="card-detail-container">
        	<HandCard :card="card" :index="index" type="card-detail"/>
        	<CardAction :card="card" :index="index" 
        	v-on:finishChoose="finishChoose"/>
        </div>
    </div>
</template>
<script>
	import HandCard from './HandCard.vue'
	import CardAction from './CardAction.vue'
	export default {
		props:{
            card:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            }
        },
        methods:{
        	cancelChoose() {
				this.$emit('cancelChoose',this.index,this.card)
			},
			finishChoose() {
				this.$emit('finishChoose')
			}
        },
		components:{
			HandCard,
			CardAction
		}
	}
</script>
<style>
	.modal {
		position:fixed;
		width:100%;
		height:100%;
		top:0;
		left:0;
	}
	.card-detail-container {
		width:60%;
		height:48%;
		margin:0 auto;
		margin-top:20%;
		position: relative;
	}

</style>