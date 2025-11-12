<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex flex-column gap-2">
        <label class="fw-bold">{{ title }}</label>

        <div class="d-flex align-items-center gap-2 flex-wrap">
          <input
            class="input_type"
            type="number"
            min="0"
            v-model.number="calculation"
            aria-label="amount-input"
          />
          <span>원</span>
          <span class="text-muted small">{{ formattedValue }} 원</span>
        </div>

        <div class="d-flex flex-wrap gap-2 mt-2">
          <v-btn
            v-for="preset in presets"
            :key="preset.label"
            size="small"
            rounded
            variant="tonal"
            :color="preset.label === selectedPreset ? 'primary' : undefined"
            @click="handlePresetClick(preset)"
          >
            {{ preset.label }}
          </v-btn>
        </div>
      </div>

      <Description :title="title" class="mt-3" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { formatNumber } from 'hangul-util';
import Description from './Description.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const presets = [
  { label: '10억', value: 1_000_000_000 },
  { label: '1억', value: 100_000_000 },
  { label: '1천만', value: 10_000_000 },
  { label: '1백만', value: 1_000_000 },
  { label: '초기화', value: 0, reset: true },
];

const store = useStore();
const calculation = ref(store.state.datafromChild[props.title] ?? 0);
const selectedPreset = ref(null);

watch(
  () => store.state.datafromChild[props.title],
  (value) => {
    if (value === undefined || value === calculation.value) {
      return;
    }
    calculation.value = value;
  },
);

watch(
  calculation,
  (value) => {
    let normalized = Number.isFinite(value) ? value : 0;
    if (normalized < 0) {
      normalized = 0;
    }

    if (normalized !== value) {
      calculation.value = normalized;
      return;
    }

    store.commit('updateDataFromChild', { title: props.title, value: normalized });
  },
  { immediate: true },
);

const formattedValue = computed(() => formatNumber(calculation.value));

const handlePresetClick = (preset) => {
  selectedPreset.value = preset.label;
  if (preset.reset) {
    calculation.value = 0;
    return;
  }

  calculation.value += preset.value;
};
</script>

<style scoped>
.input_type {
  min-width: 180px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #cfd8dc;
}
</style>
