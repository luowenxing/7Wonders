<template>
   <div class="player-board">
        <Builds :player="player" class="player-builds"/>
        <Wonder :player="player" class="player-wonder" />
        <div class="player-hand-cards" />
   </div>
</template>
<script>
    import Builds from './Builds'
    import Wonder from './Wonder'
    export default {
        props:{
            player:{
                type:Object,
                required:true
            }
        },
        components:{
            Builds,
            Wonder
        }
    }
</script>
<style>
    .player-board {
        display:flex;
        display:-webkit-flex;
        flex-direction: column;
        height:100%;
    }
    .player-board .player-builds {
        flex:1;
    }
    .player-board .player-wonder {
        flex: 0 0 30%;
    }
    .player-board .player-hand-cards {
        flex:0 0 20%;
    }
</style>