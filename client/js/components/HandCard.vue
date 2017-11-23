<template>
    <div class="card-container">
        <div :style="handCardStyle" class="card">
            <div class="card-cost">
                <Cost :cost="card"/>
            </div>
            <div class="card-info" >
                <div class="card-name"> {{ card.name }} </div>
                <CardEffect :card="card" />
            </div>
        </div>
    </div>
</template>
<script>
    import { Color } from 'shared/util/consts.js'
    import CardEffect from './CardEffect.vue'
    import Cost from './Cost.vue'
    export default {
        props:{
            card:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            },
        },
        computed:{
            handCardStyle(){
                let isBlack = false
                let color = this.card.color
                if(color === Color.Grey) {
                    color = 'lightgrey'
                }
                return {
                    backgroundColor:color,
                    color:this.isBlack ? 'black' : 'white'
                }
            },
            isBlack() {
                let color = this.card.color
                return color === Color.Yellow || color === Color.Grey
            },
        },
        components:{
            CardEffect,
            Cost
        }
    }
</script>
<style>
    .card-container {
        word-break: break-all;
        width:100%;
        height:100%;
    }
    .card-container .card {
        height:100%;
        padding:4px;
        border-radius: 4px;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 black, 0 0 6px 0 black;
        display: flex;
        line-height:0px;
    }

    .card-container .card .card-cost {
        width:20%;
        flex:0 0 20%;
    }

    .card-container .card .card-info {
        width: 80%;
        flex:1;
        padding-left:4px;
    }
    .card-container .card .card-info .card-name {
        line-height: initial;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }


</style>