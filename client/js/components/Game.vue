<template>
    <div class="game-container">
        <PlayerBoards class="game-item"/>
        <HandCards />
        <Badges />
    </div>
</template>
<script>
    import PlayerBoards from './PlayerBoards'
    import HandCards from './HandCards'
    import Badges from './Badges'
    export default {
        computed:{
            index(){
                return this.$store.state.index
            }
        },
        components:{
            PlayerBoards,
            HandCards,
            Badges
        }
    }
</script>
<style>
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}
html,body{
	height:100%;
	font-size: 10px;
}
.game-container {
	height:100%;
	display:flex;
	display:-webkit-flex;
	flex-direction:column-reverse;
}
.game-container .game-item {
	width:100%;
	flex:auto;
}
</style>