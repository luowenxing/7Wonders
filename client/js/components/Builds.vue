<template>
    <div class="builds-container">
        <BuildsCatagory 
            class="builds-catagory" 
            v-for="(builds,index) in buildsCatagory" 
            :key="index"
            :builds="builds" />
    </div>
</template>
<script>
    import BuildsCatagory from './BuildsCatagory'
    import Wonder from './Wonder'
    export default {
        props:{
            player:{
                type:Object,
                required:true
            }
        },
        computed:{
            buildsCatagory(){
                let cards = this.player.cards
                return Object.keys(cards).map( key => cards[key] )
            }
        },
        components:{
            BuildsCatagory,
            Wonder
        }
    }
</script>
<style>
    .builds-container {
        display:flex;
        display:-webkit-flex;
    }
    .builds-container .builds-catagory{
        flex:1;
    }
</style>