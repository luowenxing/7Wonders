<template>
    <div class="game-container">
        <div style="position:absolute;top:0;right:0">{{index}}</div>
        <PlayerBoards class="game-item"/>
        <HandCards />
    </div>
</template>
<script>
    import PlayerBoards from './PlayerBoards'
    import HandCards from './HandCards'
    export default {
        computed:{
            index(){
                return this.$store.state.index
            }
        },
        components:{
            PlayerBoards,
            HandCards
        }
    }
</script>
<style>
html,body {
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