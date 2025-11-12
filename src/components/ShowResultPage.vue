<template>
  <div class="mb-4">
    <v-row dense>
      <v-col
        v-for="card in summaryCards"
        :key="card.key"
        cols="12"
        md="4"
        class="pb-2"
      >
        <v-card>
          <v-card-title class="text-subtitle-2">{{ card.title }}</v-card-title>
          <v-card-text class="text-h5 text-primary text-end">
            {{ formatAmount(card.value) }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <FinalCal :rows="breakdown.rows" class="mb-4" />

  <v-data-table :headers="headers" :items="tableRows" density="compact">
    <template v-slot:[`item.amount`]="{ value }">
      <span class="font-weight-medium">{{ formatAmount(value) }}</span>
    </template>
  </v-data-table>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import FinalCal from './FinalCal.vue';
import { buildBreakdown, formatCurrency } from '@/modules/calculator';

const headers = [
  { title: '항목', key: 'name' },
  { title: '금액', key: 'amount', align: 'end' },
];

const store = useStore();

const breakdown = computed(() =>
  buildBreakdown({
    amounts: store.state.datafromChild,
    counters: store.state.CounterCard,
    ages: store.state.CounterCardAge,
    heirType: store.state.whoInherit,
  }),
);

const summaryCards = computed(() => [
  { title: '과세가액', key: 'taxableEstate', value: breakdown.value.summary.taxableEstate },
  { title: '상속세 과세표준', key: 'taxableBase', value: breakdown.value.summary.taxableBase },
  { title: '총 납부 예상 세액', key: 'totalDue', value: breakdown.value.summary.totalDue },
]);

const tableRows = computed(() => breakdown.value.tableRows);

const formatAmount = (value) =>
  typeof value === 'number' ? `${formatCurrency(value)} 원` : value;
</script>
