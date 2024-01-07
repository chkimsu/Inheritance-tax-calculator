<template>

<v-switch
              v-model="isSamePerson"
              :label= "`10년 내 동일인 증여 여부: ${isSamePerson ? 'Yes' : 'No'}`"
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
            // data안의 값이 다른 data를 참조하면 생명주기훅에의해 제대로 초기화가 안된다. 
        }
    },
    methods : {
        sendParent(){
            this.$emit('childEvent', !this.isSamePerson)
        }

    }
    }

</script>