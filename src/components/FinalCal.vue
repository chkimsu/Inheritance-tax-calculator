<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">항목</th>
        <th scope="col">금액</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, key) in rows" :key="key">
        <td>{{ key }}</td>
        <td class="text-end">{{ formatValue(value) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { formatCurrency } from '@/modules/calculator';

defineProps({
  rows: {
    type: Object,
    required: true,
  },
});

const formatValue = (value) =>
  typeof value === 'number' ? `${formatCurrency(value)} 원` : value;
</script>
