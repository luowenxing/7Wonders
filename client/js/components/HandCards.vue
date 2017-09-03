<template>
    <div class="hand-cards">
        <HandCard v-for="handCard in handCards" />
    </div>
</template>
<script>
    import HandCard from './HandCard.vue'
    import network from '../lib/network.js'
    export default {
        data() {
            return {
                handCards:[{
                    name:1
                },{
                    name:1
                },{
                    name:1
                },{
                    name:1
                },{
                    name:1
                },{
                    name:1
                },{
                    name:1
                }]
            }
        },
        components:{
            HandCard
        }
    }
</script>
<style>
    .hand-cards {
        display:flex;
        -webkit-display:flex;
    }

</style>