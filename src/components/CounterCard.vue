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
  </template>
  
  <script>
  export default {
    props: {
      title: String, // 카드의 제목
      initialValue: Number // 초기 카운트 값
    },
    data() {
      return {
        count: this.initialValue
      };
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
      }
    }
  };
  </script>
  