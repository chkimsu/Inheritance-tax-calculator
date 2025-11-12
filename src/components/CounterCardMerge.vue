<template>
  <div class="d-flex flex-column align-items-center">
    <CounterCard
      v-for="title in cardTitles"
      :key="title"
      :title="title"
      :initialValue="initialCounts[title]"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CounterCard from '@/components/CounterCard.vue';
import { CARD_TITLES } from '@/modules/calculator';

const store = useStore();
const initialCounts = computed(() => store.state.CounterCard);
const cardTitles = CARD_TITLES;
</script>
