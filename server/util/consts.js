var Resource = {
    Wood:'Wood',
    Brick:'Brick',
    Stone:'Stone',
    Mineral:'Mineral ',
    Cloth:'Cloth',
    Glass:'Glass',
    Paper:'Paper'
}

var Color = {
    Brown:'Brown',
    Grey:'Grey',
    Blue:'Blue',
    Red:'Red',
    Green:'Green',
    Yellow:'Yellow',
    Purple:'Purple'
}

var Directions = {
    Left:0,
    Middle:1,
    Right:2,
}

var Technic = {
    Medicine:'Medicine',
    Industry:'Industry',
    Education:'Education'
}

var Indicators = {
    Wonders:'Wonders',
    Lose:'Lose',
    Arms:'Arms',
    ...Technic,
    ...Color
}

var GameStatus = {
    Start:'Start',
    WaitForChoice:'WaitForChoice',
    NexrRound:'NexrRound',
    NextAge:'NextAge'
}

module.exports = {
    Resource,
    Color,
    Directions,
    Technic,
    Indicators
}