<template>
  <div class="text-center mb-4">
    <v-select
      v-model="person"
      :items="people"
      label="상속자"
      hide-details
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const emits = defineEmits(['inherit-change']);
const store = useStore();
const person = ref('배우자');

const people = [
  '배우자',
  '직계비속',
  '직계존속(성인)',
  '배우자 없음',
];

watch(
  person,
  (value) => {
    store.commit('whoInheritUpdate', value);
    const hasSpouse = value !== '배우자 없음';
    if (!hasSpouse) {
      store.commit('updateDataFromChild', { title: '배우자 상속 금액', value: 0 });
    }
    emits('inherit-change', hasSpouse);
  },
  { immediate: true },
);
</script>
