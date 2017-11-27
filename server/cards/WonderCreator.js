let { Wonder,WonderSide,Stage } = require('./Wonder.js')
let { Resource,Technic,WonderAbility,Directions } = require('../util/consts.js')
let { shuffle } = require('../util/util.js')

let Alexandrie = new Wonder({
	name:'Alexandrie',
	res:{
		[Resource.Glass]:1
	},
	wonders:[
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Stone]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Mineral]:2
					},
					orRes:{
						[Resource.Stone]:1,
						[Resource.Mineral]:1,
						[Resource.Wood]:1,
						[Resource.Brick]:1,
					}
				}),
				new Stage({
					costs:{
						[Resource.Glass]:2
					},
					score:7
				}),
			]
		}),
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Brick]:2
					},
					orRes:{
						[Resource.Stone]:1,
						[Resource.Mineral]:1,
						[Resource.Wood]:1,
						[Resource.Brick]:1,
					}
				}),
				new Stage({
					costs:{
						[Resource.Wood]:2
					},
					orRes:{
						[Resource.Glass]:1,
						[Resource.Cloth]:1,
						[Resource.Paper]:1,
					}
				}),
				new Stage({
					costs:{
						[Resource.Stone]:3
					},
					score:7
				}),
			]
		}),
	]
})

let Artemis = new Wonder({
	name:'Artemis',
	res:{
		[Resource.Paper]:1
	},
	wonders:[
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Stone]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Wood]:2
					},
					money:9
				}),
				new Stage({
					costs:{
						[Resource.Paper]:2
					},
					score:7
				}),
			]
		}),
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Stone]:2
					},
					money:4,
					score:2
				}),
				new Stage({
					costs:{
						[Resource.Wood]:2
					},
					money:4,
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Glass]:1,
						[Resource.Cloth]:1
					},
					money:4,
					score:5
				}),
			]
		}),
	]
})


let Babylone = new Wonder({
	name:'Babylone',
	res:{
		[Resource.Brick]:1
	},
	wonders:[
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Brick]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Wood]:3
					},
					orTechnic:{
						[Technic.Medicine]:1,
						[Technic.Industry]:1,
						[Technic.Education]:1
					},
					stageName:'babylon_a'
				}),
				new Stage({
					costs:{
						[Resource.Brick]:4,
					},
					score:7
				}),
			]
		}),
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Brick]:1,
						[Resource.Cloth]:1
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Glass]:1,
						[Resource.Wood]:2
					},
					ability:WonderAbility.NoDiscard,
					stageName:'babylon_b2'
				}),
				new Stage({
					costs:{
						[Resource.Brick]:3,
						[Resource.Paper]:1
					},
					orTechnic:{
						[Technic.Medicine]:1,
						[Technic.Industry]:1,
						[Technic.Education]:1
					},
					stageName:'babylon_a'
				}),
			]
		}),
	]
})

let Gizeh = new Wonder({
	name:'Gizeh',
	res:{
		[Resource.Stone]:1
	},
	wonders:[
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Stone]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Wood]:3
					},
					score:5
				}),
				new Stage({
					costs:{
						[Resource.Stone]:4
					},
					score:7
				}),
			]
		}),
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Wood]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Stone]:3
					},
					score:5,
				}),
				new Stage({
					costs:{
						[Resource.Brick]:3,
					},
					score:5
				}),
				new Stage({
					costs:{
						[Resource.Stone]:4,
						[Resource.Paper]:1,
					},
					score:7
				}),
			]
		}),
	]
})

let Halicarnasse = new Wonder({
	name:'Halicarnasse',
	res:{
		[Resource.Cloth]:1
	},
	wonders:[
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Brick]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Mineral]:3
					},
					ability:WonderAbility.DiscardFree,
					stageName:'halikarnassos_a'
				}),
				new Stage({
					costs:{
						[Resource.Cloth]:2
					},
					score:7
				}),
			]
		}),
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Mineral]:2
					},
					score:2,
					ability:WonderAbility.DiscardFree,
					stageName:'halikarnassos_a'
				}),
				new Stage({
					costs:{
						[Resource.Brick]:3
					},
					score:1,
					ability:WonderAbility.DiscardFree,
					stageName:'halikarnassos_a'
				}),
				new Stage({
					costs:{
						[Resource.Glass]:1,
						[Resource.Paper]:1,
						[Resource.Cloth]:1,
					},
					ability:WonderAbility.DiscardFree,
					stageName:'halikarnassos_a'
				}),
			]
		}),
	]
})

let Rhodes = new Wonder({
	name:'Rhodes',
	res:{
		[Resource.Mineral]:1
	},
	wonders:[
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Wood]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Brick]:3
					},
					arms:2
				}),
				new Stage({
					costs:{
						[Resource.Mineral]:4
					},
					score:7
				}),
			]
		}),
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Stone]:3
					},
					score:3,
					money:3,
					arms:1,
				}),
				new Stage({
					costs:{
						[Resource.Mineral]:4
					},
					score:4,
					money:4,
					arms:1,
				}),
			]
		}),
	]
})

let Zeus = new Wonder({
	name:'Zeus',
	res:{
		[Resource.Wood]:1
	},
	wonders:[
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Wood]:2
					},
					score:3
				}),
				new Stage({
					costs:{
						[Resource.Stone]:2
					},
					ability:WonderAbility.BuildFree,
					stageName:'olympia_a'
				}),
				new Stage({
					costs:{
						[Resource.Mineral]:2
					},
					score:7
				}),
			]
		}),
		new WonderSide({
			stages:[
				new Stage({
					costs:{
						[Resource.Wood]:2
					},
					directions:[Directions.Left,Directions.Right],
					buyRes:[Resource.Brick,Resource.Stone,Resource.Mineral,Resource.Wood],
					stageName:'olympia_b1'
				}),
				new Stage({
					costs:{
						[Resource.Stone]:2
					},
					score:5,
				}),
				new Stage({
					costs:{
						[Resource.Mineral]:2,
						[Resource.Cloth]:1
					},
					ability:WonderAbility.CopyGuild,
					stageName:'olympia_b3'
				}),
			]
		}),
	]
})

let randomWonder = function(count) {
	let wonders = [Alexandrie,Artemis,Babylone,Gizeh,Halicarnasse,Rhodes,Zeus]
	return shuffle(wonders).slice(count)
} 

module.exports = randomWonder










