<template>
    <div>
      <CounterCard title="자녀 수" :initialValue="getCount1" />
      <CounterCard title="연로자 수" :initialValue="getCount2" />
      <CounterCard title="미성년자 수" :initialValue="getCount3" />
      <CounterCard title="장애인 수" :initialValue="getCount4" />
    </div>
  </template>
  
  <script>
  import CounterCard from "@/components/CounterCard"; // CounterCard 컴포넌트의 경로에 맞게 수정

  export default {
    components: {
      CounterCard,
    },
    data() {
      return {
        getCount1: 0,
        getCount2: 0,
        getCount3: 0,
        getCount4: 0
      };
    }

  };
  </script>
  