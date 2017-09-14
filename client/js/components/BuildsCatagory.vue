<template>
    <div class="builds-catagory-container">
        <div 
            class="build" 
            v-for="build in builds"
            :key="build.name"
            :style="{'backgroundColor':build.color}">
            {{ build.name }}
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            builds:{
                type:Array,
                required:true
            }
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
    }
</style>