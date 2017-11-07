<template>
	<div class="card-actions-container">
		<div class="trades-list-container">
    		<Trades v-for="(trades,index) in tradesResultArr" 
    		:trades="trades" :key="index"
    		@click.native.stop="chooseWithTrade(index)"/>
    	</div>
		<div class="card-actions">
    		<div class="card-action card-action-build" 
    			v-bind:class="{'disabled':!canBuildCard}"
    			@click="buildCard">建造</div>
    		<div class="card-action card-action-wonder">奇迹</div>
    		<div class="card-action card-action-discard" @click="discardCard">丢弃</div>
    	</div>
	</div>
</template>
<script>
	import Trades from './Trades.vue'
	import { ChoiceAction,GameStatus } from 'shared/util/consts'
	import { cartesianProductOf,distinct,groupBy } from 'shared/util/util'
	import Resources from 'shared/cards/Resources'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				tradesResultArr:[],
				canBuildCard:{},
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
        	this.canBuildCard = this.getCanBuildCard(this.card)
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
			getCanBuildCard(card) {
				let result = {
					success:true,
					needTrade:false,
					tradesResultArr:[],
				}
				let player = this.currentPlayer
				if(player.cardsName.indexOf(card.name) >= 0) {
		            // 同名建筑
		            result.success = false
		        } else {
		            // 免费建设链
		            if(player.freeBuilds.indexOf(card.name) < 0) {
		              	result = this.canBuild(card.costs)
					} 
				}
				return result
			},
			canBuild(needRes) {
				let result = {
					success:true,
					needTrade:false,
					tradesResultArr:[],
				}
				let player = this.currentPlayer
				let resObj = player.ownRes
				let hasOwnRes = Resources.hasRes(resObj,needRes)
				// 先判断自己是否有充足的资源
				if(!hasOwnRes.result) {
					// 先判断自己是否有充足的资源，无充足资源，考虑交易
					// 获取到所有资源组合情况下，还差的资源
					let tradesResultArr = []
					let resArrDiff = hasOwnRes.resArr.map(res => res.diff)
					// 去除重复的组合
					let dictinctResArr = distinct(resArrDiff,(res1,res2) => res1.equals(res2))
					let leftPlayer = this.leftPlayer
					let rightPlayer = this.rightPlayer
					// 构建所有的交易组合
					dictinctResArr.forEach(res => {
						let trades = res.mapPositive(key => {
							let tradesForKey = []
							let count = res[key]
							for(let index=0;index<=count;index++) {
								tradesForKey.push({
									key:key,
									left:index,
									right:count - index
								})
							}
							return tradesForKey
						})
						// 笛卡尔积
						let tradesCartesian = cartesianProductOf.apply(null,trades)
						tradesCartesian.forEach(trade => {
							let trades = trade.reduce((result,resObj) => {
								result[0].res = result[0].res.plus(new Resources({
									[resObj.key]:resObj.left
								}))
								result[1].res = result[1].res.plus(new Resources({
									[resObj.key]:resObj.right
								}))
								return result
							},[{
								res:new Resources(),
								player:leftPlayer
							},{
								res:new Resources(),
								player:rightPlayer
							}])
							let tradesResult = player.canTrade(trades)
							if(tradesResult.success) {
								tradesResultArr.push(tradesResult.trades)
							}
						})
					})
					result.tradesResultArr = tradesResultArr

					if(tradesResultArr.length > 0) {
						result.needTrade = true
					} else {// 无可行则不能建造
						result.success = false
					}
				}
				return result
			}
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
	.card-action.card-action-discard {
		border-right:none;
	}

	.trades-list-container {
		width:100%;
		background-color: #cfcfcf;
	}
</style>