var ResourceEnum = {
	block:''
}

function Resource(enum,count) {
	this.type = enum
	this.count = count
}

function BaseCard(option) {
	var that = this
	var defaultOption = {
		score:0,
		cost:[],
		buildForFree:[],
		minPlayers:3,
		age:1,
		name:''
	}
}

BaseCard.prototype = {
	caculate:function(){
		return this.score
	},
	shouldAddToGame:function(players) {
		return this.minPlayers <= players
	}
}
BaseCard.constructor = BaseCard


function Military(option) {
	BaseCard.call(this,option)
}

function NatureResourceFactory() {
	this.resources = []
	BaseCard.call(this,option)
}

function ManualResourceFactory() {
	this.resources = []
	BaseCard.call(this,option)
}

function Trade() {
	BaseCard.call(this,option)
}

function Technology() {
	BaseCard.call(this,option)
}

function Infrastructure() {
	BaseCard.call(this,option)
}

function Guild() {
	BaseCard.call(this,option)
}