<!-- CounterCard.vue -->
<template>
    <v-card width="320" class="text-center">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-btn x-small text @click="incrementCounter(); cardchange();">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-chip dark class="ml-4" color="purple">{{ count }}</v-chip>
        <v-btn x-small text @click="deductCounter(); cardchange();">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>

    <ChildAge v-bind:title="title" v-bind:howmanychild="count" v-if="showchildage"></ChildAge>
  </template>
  
  <script>

  import ChildAge from './ChildAge.vue';
  export default {
    props: {
      title: String, // 카드의 제목
      initialValue: Number // 초기 카운트 값
    },
    components : {
     ChildAge
  },
    data() {
      return {
        count: this.initialValue
      };
    },
    computed :{
      showchildage : function() {
       if (this.title === "미성년자 수" & this.count > 0){
          console.log('여기 실행중')
          return true
        }else if(this.title === "장애인 수" & this.count > 0){
          return true

        }else{
          return false
      }
      }

    },
    methods: {
      incrementCounter() {
        this.count++;
      },
      deductCounter() {
        this.count--;
      },
      cardchange(){
        this.$store.commit('countercardupdate', {'title' : this.title , 'value': this.count})
        console.log('countercardupdate', {'title' : this.title , 'value': this.count})
       

      }
    }
  };
  </script>
  