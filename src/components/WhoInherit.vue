<template>
    <div class="text-center">
      <v-select
        v-model="person"
        :items="people"
        label="상속자"
        v-on:update:model-value="whoInherit"
      ></v-select>
    </div>
</template>


  
<script setup>
    import { ref } from 'vue'
    import { useStore } from "vuex";
    import { defineEmits } from 'vue'

// 이벤트를 정의합니다.
    const emits = defineEmits(['whochildEvent'])
    
    const store = useStore();
    const person = ref('배우자')

    const people = [
      '배우자',
      '직계비속',
      '직계존속(성인)',
      '배우자 없음',
    ]
    const whoInherit = () => {store.commit('whoInheritUpdate', person.value); // Vuex Store로 데이터 전달 및 상태 업데이트

                            if (person.value === '배우자 없음') {

                            store.commit('updateDataFromChild', {'title' : '배우자 상속 금액' , 'value' :  0}); // Vuex Store로 데이터 전달 및 상태 업데이트


                            emits('whochildEvent', false)
                            // 추가적인 처리가 필요한 경우 여기에 작성
                            } else {
                            console.log('person.value: ', person.value);
                            emits('whochildEvent', true)
                        }

                        }


</script>
  
 