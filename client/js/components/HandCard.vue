<template>
    <div class="hand-card">
        <div :style="handCardStyle" class="card">
            {{ card.name }}
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            card:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            }
        },
        computed:{
            handCardStyle(){
                return {
                    backgroundColor:this.card.color
                }
            }
        }
    }
</script>
<style>
    .hand-card {
        font-size:10px;
        color:white;
        word-break: break-all;
        width:100%;
        padding:4px;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        transition:all 1s;
    }
    .hand-card .card {
        height:100%;
        border-radius: 4px;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 black, 0 0 6px 0 black;
    }

</style>