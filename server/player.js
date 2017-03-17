function Player(){
	this.wonder = null
	this.money = 3

	this.victories = []
	this.defeats = []

	this.resources = []

	this.left = left
	this.right = right

	this.militaries = []
	this.natureResourceFactories = []
	this.manualResourceFactories = []
	this.trades = []
	this.technologies = []
	this.infrastructures = []
	this.guilds = []
}

Player.prototype = {
	canBuild:function(left,right){ 
		return true
	},
	buildUp:function(card){

	},

}






