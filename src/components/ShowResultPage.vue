<template>

    <div>
      <h1>계산 상세</h1>
      <h1>{{test}}</h1> 
    </div>


    <v-data-table :headers="headers" :items="vegetables">
      <template v-slot:[`item.calories`]="{ value }">
        <v-chip :color="getColor(value)">
          {{ value }}
        </v-chip>
      </template>

    </v-data-table>


</template>
  

  


<script>

import { computed } from "vue";
import { useStore } from "vuex";
import { reactive } from 'vue';

  export default {

    setup() {
    const store = useStore();
    const test = computed(() => store.state.datafromChild);
    
    const headers = [
    { title: '계산 항목', key: 'name' },
    { title: '결과', key: 'calories' }
    ]


    const vegetables = reactive([
    {
      name: '상속재산금액',
      calories: test.value['상속 재산']
   
    },
    {
      name: '장례비용',
      calories: 49
    },
    {
      name: '채무부담액',
      calories: 34
    },
    {
      name: '사전증여금액',
      calories: 43
    },
    {
      name: '과세가액',
      calories: 160
    },
    {
      name: '배우자 공제',
      calories: 86
    },
    {
      name: '자녀 공제',
      calories: 96
    },
    {
      name: '고령자 공제',
      calories: 77
    }
  ])

  function getColor (calories) {
    if (calories > 100) return 'red'
    else if (calories > 50) return 'orange'
    else return 'green'
  }

    return {
    test,
    headers,
    vegetables,
    getColor
            }
    
          }
      
    }

</script>