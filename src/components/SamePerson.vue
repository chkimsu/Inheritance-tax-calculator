<template>

<v-switch
              v-model="isSamePerson"
              :label= "`10년 내 동일인 증여 여부: ${isSamePerson}`"
              color="indigo"
              hide-details
              v-on:click="sendParent"
 ></v-switch>

</template>

<script>

export default {

    data () {
        return {
            isSamePerson: false ,
            value : `Switch: ${this.isSamePerson}`
        }
    },
    methods : {
        sendParent(){
            this.$emit('childEvent', !this.isSamePerson)
        }

    }
    }

</script>