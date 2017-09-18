<template>
    <div class="modal" @click="cancelChoose">
        <div class="card-detail-container">
        	<HandCard :card="card" :index="index" @click.native="choose" />
        </div>
    </div>
</template>
<script>
	import HandCard from './HandCard.vue'
	import { ChoiceAction } from 'shared/util/consts'
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
			choose() {
				this.socket.choose({
                    index:this.index,
                    action:ChoiceAction.Build
                })
			},
			cancelChoose() {
				this.$emit('cancelChoose',this.index,this.card)
			}
		},
		components:{
			HandCard
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
		width:80%;
		height:300px;
		margin:0 auto;
		margin-top:10%;
		position: relative;
	}


</style>