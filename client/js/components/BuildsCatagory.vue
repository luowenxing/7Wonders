<template>
    <div class="builds-catagory-container">
        <div 
            class="build" 
            v-for="build in builds"
            :key="build.name"
            :style="{'backgroundColor':build.color}">
            <CardEffect :card="build" />
        </div>
    </div>
</template>
<script>
    import CardEffect from './CardEffect.vue'
    export default {
        methods:{
            cardEffect(build){
                return cardEffectRepresent(build)
            }
        },
        props:{
            builds:{
                type:Array,
                required:true
            }
        },
        components:{
            CardEffect
        }
    }
</script>
<style>
    .builds-catagory-container {
        display:flex;
        display:-webkit-flex;
        flex-direction:column-reverse;
    }
    .builds-catagory-container .build{
        flex:none;
        width:100%;
        word-break: break-all;
        color: white;
        height: 25px;
        display: flex;
        align-items: center;
        box-shadow: 0px 2px 2px #333333, 0px 0px 2px #333333;
        border-radius:4px;
        margin-bottom: 6px;
    }
</style>