<template>
   <div :style="'background-image:url('+ require('../../assets/images/' + player.wonder.name + '.jpg') +')'">
   </div>
</template>
<script>
    export default {
    	props:{
            player:{
                type:Object,
                required:true
            }
        },
        computed:{

        }
    }
</script>