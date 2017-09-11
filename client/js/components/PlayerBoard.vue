<template>
   <div>
        <Builds />
        <Wonder />
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