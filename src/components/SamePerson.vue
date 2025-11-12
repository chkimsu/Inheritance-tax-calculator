<template>
  <v-switch
    v-model="isSamePerson"
    :label="`10년 내 동일인 증여 여부: ${isSamePerson ? '예' : '아니오'}`"
    color="indigo"
    hide-details
  />
</template>

<script setup>
import { ref, watch } from 'vue';

const emits = defineEmits(['toggle']);
const isSamePerson = ref(false);

watch(
  isSamePerson,
  (value) => {
    emits('toggle', value);
  },
  { immediate: true },
);
</script>
