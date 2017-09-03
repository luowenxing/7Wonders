//生成7Wonders的所有卡牌
var {
    InfrastructureCard,
    GuildCard,
    WarCard,
    TechnicCard,
    TradeFuncCard,
    TradeResCard,
    TradeResOwnCard,
    TradeCard,
    ResourceCard
} = require('./card.js')

var {
    Resource,
    Color,
    Directions,
    Technic,
    Indicators
} = require('../util/consts.js')

var { flatten,groupBy,shuffle,divide } = require('../util/util.js')

// 棕色资源牌
var Brown = [
    // AGE1 单资源卡牌
    ...[3,4].map( minPlayers => 
        new ResourceCard({
            name:'LUMBER YARD',
            age:1,  
            color:Color.Brown,
            res:{[Resource.Wood]:1},
            minPlayers
        })
    ),
    ...[3,5].map( minPlayers => 
        new ResourceCard({
            name:'STONE PIT',
            age:1,  
            color:Color.Brown,
            res:{[Resource.Stone]:1},
            minPlayers
        })
    ),
    ...[3,5].map( minPlayers => 
        new ResourceCard({
            name:'CLAY POOL',
            age:1,  
            color:Color.Brown,
            res:{[Resource.Brick]:1},
            minPlayers
        })
    ),
    ...[3,4].map( minPlayers => 
        new ResourceCard({
            name:'ORE VEIN',
            age:1,  
            color:Color.Brown,
            res:{[Resource.Mineral]:1},
            minPlayers
        })
    ),

    // AGE1 双替代资源卡牌
    ...[{
        name:'TREE FARM',
        orRes:{
            [Resource.Wood]:1,
            [Resource.Brick]:1
        },
        minPlayers:6,
    },{
        name:'EXCAVATION',
        orRes:{
            [Resource.Stone]:1,
            [Resource.Brick]:1
        },
        minPlayers:4,
    },{
        name:'CLAY PIT',
        orRes:{
            [Resource.Brick]:1,
            [Resource.Mineral]:1
        },
        minPlayers:3,
    },{
        name:'TIMBER YARD',
        orRes:{
            [Resource.Stone]:1,
            [Resource.Wood]:1
        },
        minPlayers:3,
    },{
        name:'FOREST CAVE',
        orRes:{
            [Resource.Wood]:1,
            [Resource.Mineral]:1
        },
        minPlayers:5,
    },{
        name:'MINE',
        orRes:{
            [Resource.Mineral]:1,
            [Resource.Stone]:1
        },
        minPlayers:6,
    }].map(options => 
        new ResourceCard({
            age:1,
            costMoney:1,
            color:Color.Brown,
            options,
        })
    ),

    // AGE2 双资源卡牌
    ...flatten([{
        name:'SAWMILL',
        res:{[Resource.Wood]:2}
    },{
        name:'QUARRY',
        res:{[Resource.Stone]:2}
    },{
        name:'BRICKYARD',
        res:{[Resource.Brick]:2}
    },{
        name:'FOUNDRY',
        res:{[Resource.Mineral]:2}
    }].map( options => 
        [3,4].map( minPlayers => 
            new ResourceCard({
                age:2, 
                color:Color.Brown,
                minPlayers,
                ...options
            })
        )
    ))
]

// 紫色公会牌 9张
var Purple = [{
        name:'WORKERS GUILD',
        costs:{
            [Resource.Mineral]:2,
            [Resource.Brick]:1,
            [Resource.Stone]:1,
            [Resource.Wood]:1,
        },
        directions:[Directions.Left,Directions.Right],
        indicatorNames:[Indicators.Brown],
        scoreMul:1
    },{
        name:'CRAFTSMENS GUILD',
        costs:{
            [Resource.Mineral]:2,
            [Resource.Stone]:2,
        },
        directions:[Directions.Left,Directions.Right],
        indicatorNames:[Indicators.Grey],
        scoreMul:2
    },{
        name:'TRADERS GUILD',
        costs:{
            [Resource.Paper]:1,
            [Resource.Glass]:1,
            [Resource.Cloth]:1,
        },
        directions:[Directions.Left,Directions.Right],
        indicatorNames:[Indicators.Yellow],
        scoreMul:1
    },{
        name:'PHILOSOPHERS GUILD',
        costs:{
            [Resource.Brick]:3,
            [Resource.Cloth]:1,
            [Resource.Paper]:1,
        },
        directions:[Directions.Left,Directions.Right],
        indicatorNames:[Indicators.Green],
        scoreMul:1,
    },{
        name:'SPIES GUILD',
        costs:{
            [Resource.Brick]:3,
            [Resource.Glass]:1,
        },
        directions:[Directions.Left,Directions.Right],
        indicatorNames:[Indicators.Red],
        scoreMul:1,
    },{
        name:'STRATEGISTS GUILD',
        costs:{
            [Resource.Mineral]:2,
            [Resource.Stone]:1,
            [Resource.Cloth]:1,
        },
        directions:[Directions.Left,Directions.Right],
        indicatorNames:[Indicators.Lose],
        scoreMul:1,
    },{
        name:'SHIPOWNERS GUILD',
        costs:{
            [Resource.Wood]:3,
            [Resource.Paper]:1,
            [Resource.Glass]:1,
        },
        directions:[Directions.Middle],
        indicatorNames:[Indicators.Brown,Indicators.Grey,Indicators.Purple],
        scoreMul:1,
    },{
        name:'MAGISTRATES GUILD',
        costs:{
            [Resource.Wood]:3,
            [Resource.Stone]:1,
            [Resource.Cloth]:1,
        },
        directions:[Directions.Left,Directions.Right],
        indicatorNames:[Indicators.Blue],
        scoreMul:1,
    },{
        name:'BUILDERS GUILD',
        costs:{
            [Resource.Stone]:2,
            [Resource.Brick]:2,
            [Resource.Glass]:1,
        },
        directions:[Directions.Left,Directions.Middle,Directions.Right],
        indicatorNames:[Indicators.Wonders],
        scoreMul:1,
    }].map( options => new GuildCard(options))

// 蓝色基建牌
var Blue = [
    // AGE1 4种
    ...[4,7].map( minPlayers => 
        new InfrastructureCard({
            name:'PAWNSHOP',
            score:3,
            age:1,
            minPlayers,
        })
    ),
    ...[3,7].map( minPlayers => 
        new InfrastructureCard({
            costs:{[Resource.Stone]:1},
            name:'BATHS',
            score:3,
            age:1,
            minPlayers,
            freeBuilds:['AQUEDUCT']
        })
    ),
    ...[3,5].map( minPlayers => 
        new InfrastructureCard({
            name:'ALTAR',
            score:2,
            age:1,
            minPlayers,
            freeBuilds:['TEMPLE']
        })
    ),
    ...[3,6].map( minPlayers => 
        new InfrastructureCard({
            name:'THEATER',
            score:2,
            age:1,
            minPlayers,
            freeBuilds:['STATUE']
        })
    ),

    // AGE2 4种
    ...[3,7].map( minPlayers => 
        new InfrastructureCard({
            costs:{[Resource.Stone]:3},
            name:'AQUEDUCT',
            score:5,
            age:2,
            minPlayers,
            basements:['BATHS']
        })
    ),
    ...[3,6].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Wood]:1,
                [Resource.Brick]:1,
                [Resource.Glass]:1,
            },
            name:'TEMPLE',
            score:3,
            age:2,
            minPlayers,
            basements:['ALTAR'],
            freeBuilds:['PANTHEON'],
        })
    ),
    ...[3,7].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Wood]:1,
                [Resource.Mineral]:2,
            },
            name:'STATUE',
            score:4,
            age:2,
            minPlayers,
            basements:['THEATER'],
            freeBuilds:['GARDENS'],
        })
    ),
    ...[3,5].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Cloth]:1,
                [Resource.Brick]:2,
            },
            name:'COURTHOUSE',
            score:4,
            age:2,
            minPlayers,
            basements:['SCRIPTORIUM']
        })
    ),

    // AGE3 5种
    ...[3,6].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Brick]:2,
                [Resource.Mineral]:1,
                [Resource.Paper]:1,
                [Resource.Glass]:1,
                [Resource.Cloth]:1,
            },
            name:'PANTHEON',
            score:7,
            age:3,
            minPlayers,
            basements:['TEMPLE'],
        })
    ),
    ...[3,4].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Wood]:1,
                [Resource.Brick]:2,
            },
            name:'GARDENS',
            score:5,
            age:3,
            minPlayers,
            basements:['STATUE'],
        })
    ),
    ...[3,5,6].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Glass]:1,
                [Resource.Mineral]:1,
                [Resource.Stone]:2,
            },
            name:'TOWN HALL',
            score:6,
            age:3,
            minPlayers,
        })
    ),
    ...[3,7].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Glass]:1,
                [Resource.Paper]:1,
                [Resource.Cloth]:1,
                [Resource.Mineral]:1,
                [Resource.Stone]:1,
                [Resource.Brick]:1,
                [Resource.Wood]:1,
            },
            name:'TOWN HALL',
            score:8,
            age:3,
            minPlayers,
        })
    ),
    ...[3,5].map( minPlayers => 
        new InfrastructureCard({
            costs:{
                [Resource.Mineral]:1,
                [Resource.Stone]:1,
                [Resource.Wood]:2,
            },
            name:'SENATE',
            score:6,
            age:3,
            minPlayers,
            basements:['LIBRARY']
        })
    ),
]

// 红色军事牌
var Red = [
    // AGE1 3种
    ...[3,7].map( minPlayers => 
        new WarCard({
            costs:{[Resource.Wood]:1},
            name:'STOCKADE',
            arms:1,
            age:1,
            minPlayers
        })
    ),
    ...[3,5].map( minPlayers => 
        new WarCard({
            costs:{[Resource.Mineral]:1},
            name:'BARRACKS',
            arms:1,
            age:1,
            minPlayers
        })
    ),
    ...[3,4].map( minPlayers => 
        new WarCard({
            costs:{[Resource.Brick]:1},
            name:'GUARD TOWER',
            arms:1,
            age:1,
            minPlayers
        })
    ),

    // AGE2 4种
    ...[3,7].map( minPlayers => 
        new WarCard({
            costs:{[Resource.Stone]:3},
            name:'WALLS',
            arms:2,
            age:2,
            freeBuilds:['FORTIFICATIONS'],
            minPlayers
        })
    ),
    ...[4,6,7].map( minPlayers => 
        new WarCard({
            costs:{
                [Resource.Wood]:1,
                [Resource.Mineral]:2,
            },
            name:'TRAINING GROUND',
            arms:2,
            age:2,
            freeBuilds:['CIRCUS'],
            minPlayers
        })
    ),
    ...[3,5].map( minPlayers => 
        new WarCard({
            costs:{
                [Resource.Mineral]:1,
                [Resource.Brick]:1,
                [Resource.Wood]:1,
            },
            name:'STABLES',
            arms:2,
            age:2,
            basements:['APOTHECARY'],
            minPlayers
        })
    ),
    ...[3,6].map( minPlayers => 
        new WarCard({
            costs:{
                [Resource.Mineral]:1,
                [Resource.Wood]:2,
            },
            name:'ARCHERY RANGE',
            arms:2,
            age:2,
            basements:['WORKSHOP'],
            minPlayers
        })
    ),

    // AGE3 4种
    ...[3,7].map( minPlayers => 
        new WarCard({
            costs:{
                [Resource.Stone]:1,
                [Resource.Mineral]:3,
            },
            name:'FORTIFICATIONS',
            arms:3,
            age:3,
            basements:['WALLS'],
            minPlayers
        })
    ),
    ...[4,5,6].map( minPlayers => 
        new WarCard({
            costs:{
                [Resource.Stone]:3,
                [Resource.Mineral]:1,
            },
            name:'CIRCUS',
            arms:3,
            age:3,
            basements:['TRAINING GROUND'],
            minPlayers
        })
    ),
    ...[3,4,7].map( minPlayers => 
        new WarCard({
            costs:{
                [Resource.Mineral]:1,
                [Resource.Wood]:2,
                [Resource.Cloth]:1,
            },
            name:'ARSENAL',
            arms:3,
            age:3,
            minPlayers
        })
    ),
    ...[3,5].map( minPlayers => 
        new WarCard({
            costs:{
                [Resource.Wood]:1,
                [Resource.Brick]:3,
            },
            name:'SIEGE WORKSHOP',
            arms:3,
            age:3,
            basements:['LABORATORY'],
            minPlayers
        })
    ),
]

// 灰色制成品资源牌 6张
var Grey = flatten([
    ...[3,6].map( minPlayers => 
        [{
            name:'LOOM',
            res:{[Resource.Cloth]:1},
        },{
            name:'GLASSWORKS',
            res:{[Resource.Glass]:1},
        },{
            name:'LOOM',
            res:{[Resource.Paper]:1},
        }].map( options => 
            new ResourceCard({
                ...options,
                age:1,
                color:Color.Grey,
                minPlayers
            })
        )
    ),
    ...([3,5].map( minPlayers => 
        [{
            name:'LOOM',
            res:{[Resource.Cloth]:1},
        },{
            name:'GLASSWORKS',
            res:{[Resource.Glass]:1},
        },{
            name:'LOOM',
            res:{[Resource.Paper]:1},
        }].map( options => 
            new ResourceCard({
                ...options,
                age:2,
                color:Color.Grey,
                minPlayers
            })
        )
    )),
])

// 绿色科技牌
var Green = [
    // AGE1 3种
    ...[3,5].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Cloth]:1,
            },
            name:'APOTHECARY',
            technic:Technic.Medicine,
            age:1,
            freeBuilds:['STABLES','DISPENSARY'],
            minPlayers
        })
    ),
    ...[3,7].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Glass]:1,
            },
            name:'WORKSHOP',
            technic:Technic.Industry,
            age:1,
            freeBuilds:['ARCHERY RANGE','LABORATORY'],
            minPlayers
        })
    ),
    ...[3,4].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Paper]:1,
            },
            name:'SCRIPTORIUM',
            technic:Technic.Education,
            age:1,
            freeBuilds:['COURTHOUSE','LIBRARY'],
            minPlayers
        }),
    ),
    // AGE2 4种
    ...[3,4].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Mineral]:2,
                [Resource.Glass]:1,
            },
            name:'DISPENSARY',
            technic:Technic.Medicine,
            age:2,
            basements:['APOTHECARY'],
            freeBuilds:['ARENA','LODGE'],
            minPlayers
        }),
    ),
    ...[3,5].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Brick]:2,
                [Resource.Paper]:1,
            },
            name:'LABORATORY',
            technic:Technic.Industry,
            age:2,
            basements:['WORKSHOP'],
            freeBuilds:['SIEGE WORKSHOP','OBSERVATORY'],
            minPlayers
        }),
    ),
    ...[3,6].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Stone]:2,
                [Resource.Cloth]:1,
            },
            name:'LIBRARY',
            technic:Technic.Education,
            age:2,
            basements:['SCRIPTORIUM'],
            freeBuilds:['SENATE','UNIVERSITY'],
            minPlayers
        }),
    ),
    ...[3,7].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Wood]:1,
                [Resource.Paper]:1,
            },
            name:'SCHOOL',
            technic:Technic.Education,
            age:2,
            freeBuilds:['ACADEMY','STUDY'],
            minPlayers
        }),
    ),

    // AGE3 5种
    ...[3,6].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Brick]:2,
                [Resource.Cloth]:1,
                [Resource.Paper]:1,
            },
            name:'LODGE',
            technic:Technic.Medicine,
            age:3,
            basements:['DISPENSARY'],
            minPlayers
        }),
    ),
    ...[3,7].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Mineral]:2,
                [Resource.Glass]:1,
                [Resource.Cloth]:1,
            },
            name:'OBSERVATORY',
            technic:Technic.Industry,
            age:3,
            basements:['LABORATORY'],
            minPlayers
        }),
    ),
    ...[3,4].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Wood]:2,
                [Resource.Paper]:1,
                [Resource.Glass]:1,
            },
            name:'UNIVERSITY',
            technic:Technic.Education,
            age:3,
            basements:['LIBRARY'],
            minPlayers
        }),
    ),
    ...[3,7].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Stone]:3,
                [Resource.Glass]:1,
            },
            name:'ACADEMY',
            technic:Technic.Medicine,
            age:3,
            basements:['SCHOOL'],
            minPlayers
        }),
    ),
    ...[3,5].map( minPlayers => 
        new TechnicCard({
            costs:{
                [Resource.Wood]:1,
                [Resource.Paper]:1,
                [Resource.Cloth]:1,
            },
            name:'STUDY',
            technic:Technic.Industry,
            age:3,
            basements:['SCHOOL'],
            minPlayers
        }),
    ),
]

// 黄色贸易牌
var Yellow = flatten([
    // AGE1 4种
    [4,5,7].map( minPlayers => 
        new TradeCard({
            name:'TAVERN',
            age:1,
            money:5,
            minPlayers
        }),
    ),
    [3,7].map( minPlayers => 
        [{
            name:'EAST TRADING POST',
            directions:[Directions.Right]
        },{
            name:'WEST TRADING POST',
            directions:[Directions.Left]
        }].map(options => 
            new TradeResCard({
                ...options,
                age:1,
                buyRes:[Resource.Brick,Resource.Stone,Resource.Mineral,Resource.Wood],
                freeBuilds:['FORUM'],
                minPlayers
            })
        )
    ),
    [3,6].map( minPlayers => 
        new TradeResCard({
            name:'MARKETPLACE',
            age:1,
            directions:[Directions.Left,Directions.Right],
            buyRes:[Resource.Glass,Resource.Paper,Resource.Cloth],
            minPlayers
        })
    ),

    // AGE2 4种
    [3,6,7].map( minPlayers => 
        new TradeCard({
            name:'FORUM',
            age:2,
            costs:{
                [Resource.Brick]:2,
            },
            orRes:{
                [Resource.Glass]:1,
                [Resource.Paper]:1,
                [Resource.Cloth]:1,
            },
            basements:['EAST TRADING POST','WEST TRADING POST'],
            freeBuilds:['HAVEN'],
            minPlayers
        })
    ),
    [3,5,6].map( minPlayers => 
        new TradeResOwnCard({
            name:'CARAVANSERY',
            age:2,
            costs:{
                [Resource.Wood]:2,
            },
            orRes:{
                [Resource.Brick]:1,
                [Resource.Stone]:1,
                [Resource.Mineral]:1,
                [Resource.Wood]:1,
            },
            basements:['MARKETPLACE'],
            freeBuilds:['LIGHTHOUSE'],
            minPlayers
        })
    ),
    [3,6].map( minPlayers => 
        new TradeFuncCard({
            name:'VINEYARD',
            age:2,
            directions:[Directions.Left,Directions.Middle,Directions.Right],
            indicatorNames:[Indicators.Brown],
            moneyMul:1,
            minPlayers
        })
    ),
    [4,7].map( minPlayers => 
        new TradeFuncCard({
            name:'BAZAR',
            age:2,
            directions:[Directions.Left,Directions.Middle,Directions.Right],
            indicatorNames:[Indicators.Grey],
            moneyMul:2,
            minPlayers
        })
    ),

    // AGE3 4种
    [3,4].map( minPlayers => 
        new TradeFuncCard({
            name:'HAVEN',
            costs:{
                [Resource.Cloth]:1,
                [Resource.Mineral]:1,
                [Resource.Wood]:1,
            },
            age:3,
            directions:[Directions.Middle],
            indicatorNames:[Indicators.Brown],
            moneyMul:1,
            scoreMul:1,
            basements:['FORUM'],
            minPlayers
        })
    ),
    [3,6].map( minPlayers => 
        new TradeFuncCard({
            name:'LIGHTHOUSE',
            costs:{
                [Resource.Glass]:1,
                [Resource.Stone]:1,
            },
            age:3,
            directions:[Directions.Middle],
            indicatorNames:[Indicators.Yellow],
            moneyMul:1,
            scoreMul:1,
            basements:['CARAVANSERY'],
            minPlayers
        })
    ),
    [4,6].map( minPlayers => 
        new TradeFuncCard({
            name:'CHAMBER OF COMMERCE',
            costs:{
                [Resource.Brick]:2,
                [Resource.Paper]:1,
            },
            age:3,
            directions:[Directions.Middle],
            indicatorNames:[Indicators.Grey],
            moneyMul:2,
            scoreMul:2,
            minPlayers
        })
    ),
    [3,5,7].map( minPlayers => 
        new TradeFuncCard({
            name:'ARENA',
            costs:{
                [Resource.Mineral]:1,
                [Resource.Stone]:2,
            },
            age:3,
            directions:[Directions.Left,Directions.Middle,Directions.Right],
            indicatorNames:[Indicators.Wonders],
            basements:['DISPENSARY'],
            moneyMul:1,
            scoreMul:1,
            minPlayers
        })
    ),
])

var dividedCards = function(playersCount) {
    var groupedCards = groupBy(flatten([Brown,Grey,Yellow,Red,Blue,Green]).filter(card => {
        return card.minPlayers <= playersCount
    }), item => item.age)
    // AGE3要从紫色卡中选出playersCount + 2张
    groupedCards[3] = groupedCards[3].concat(shuffle(Purple).slice(0,playersCount + 2))
    return Object.keys(groupedCards).map(age => {
        // 三个AGE的牌全部洗匀
        shuffle(groupedCards[age])
        // 每个AGE的牌均分为playersCount份
        return divide(groupedCards[age],playersCount)
    })
}

var allCards = function(playersCount) {
    return flattern(dividedCards(playersCount))
}

exports = {
    allCards,
    dividedCards
}





