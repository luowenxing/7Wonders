<template>
   <div class="player-board">
        <Builds :player="player" class="player-builds"/>
        <Wonder  class="player-wonder" />
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
        flex:1;
    }
</style>