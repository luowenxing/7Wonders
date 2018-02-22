<template>
	<div class="card-actions-container">
		<div class="trades-list-container">
    		<Trades v-for="(trades,index) in tradesResultArr" 
    		:trades="trades" :key="index"
    		@click.native.stop="chooseWithTrade(index)"/>
    	</div>
		<div class="card-actions">
    		<div class="card-action card-action-build" 
    			v-bind:class="{'disabled':!canBuildCard.success}"
    			@click="buildCard">建造</div>
    		<div class="card-action card-action-wonder"
    			v-bind:class="{'disabled':!canBuildWonder.success}"
    			@click="buildWonder">奇迹</div>
    		<div class="card-action card-action-discard" @click="discardCard">丢弃</div>
    	</div>
	</div>
</template>
<script>
	import Trades from './Trades.vue'
	import { ChoiceAction,GameStatus } from 'shared/util/consts'
	import { getCanBuildCard,canBuild,getCanBuildWonder  } from '../lib/CardHelper.js'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				tradesResultArr:[],
				canBuildCard:{},
				canBuildWonder:{},
				action:ChoiceAction.Build,
				trade:''
			}
		},
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
		created(){
        	this.canBuildCard = getCanBuildCard.call(this,this.card)
        	this.canBuildWonder = getCanBuildWonder.call(this)
        	// this.canBuildWonder = this.canBuild(card.costs)
        },
		methods:{
			buildCard(e) {
				e.stopPropagation()
				let result = this.canBuildCard
                if(result.success) {
                	this.action = ChoiceAction.Build
                	if(result.needTrade) {
                		this.tradesResultArr = result.tradesResultArr
                	} else {
                		this.choose()
                	}
                }
			},
			buildWonder(e) {
				e.stopPropagation()
				let result = this.canBuildWonder
                if(result.success) {
                	this.action = ChoiceAction.BuildWonder
                	if(result.needTrade) {
                		this.tradesResultArr = result.tradesResultArr
                	} else {
                		this.choose()
                	}
                }
			},
			discardCard(e) {
				e.stopPropagation()
				this.action = ChoiceAction.Discard
				this.choose()
			},
			chooseWithTrade(index) {
				let trade = this.tradesResultArr[index]
				this.trade = trade
				this.choose()
			},
			choose() {
				this.socket.choose({
                    index:this.index,
                    action:this.action,
                    trade:this.trade
                }, (result) => {
                	if(result.success) {
                		this.$store.commit('updateStatus',GameStatus.WaitForChoice)
                		this.$emit('finishChoose',this.index,this.card)
                	}
                })
			},
		},
		computed:{
			...mapGetters([
		      'currentPlayer',
		      'leftPlayer',
		      'rightPlayer'
		    ]),
		},
		components:{
			Trades
		}
	}
</script>
<style>
	.card-actions-container {
		position: absolute;
		bottom: 0;
		width:100%;
		padding:4px;
	}
	.card-actions {
		width:100%;
		height:40px;
		line-height: 40px;
		border-radius: 4px;
		display: flex;
		display:-webkit-flex;
		background: white;
		border:1px solid #cfcfcf;
	}
	.card-actions .card-action {
		flex:1;
		text-align: center;
		border-right:1px solid #cfcfcf;
	}
	.card-actions .card-action.disabled {
		background-color: #CFCFCF;
	}

	.card-action.card-action-discard {
		border-right:none;
	}

	.trades-list-container {
		width:100%;
		background-color: #cfcfcf;
	}
</style>