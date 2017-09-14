<template>
    <div class="hand-card" :style="handCardStyle" @click="chooseCard">
        {{ card.name }}
    </div>
</template>
<script>
    import { ChoiceAction } from 'shared/util/consts'
    export default {
        methods:{
            chooseCard(){
                this.socket.choose({
                    index:this.index,
                    action:ChoiceAction.Build
                })
            }
        },
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
        flex:none;
        font-size:10px;
        color:white;
        word-break: break-all;
        width:21%;
    }

</style>