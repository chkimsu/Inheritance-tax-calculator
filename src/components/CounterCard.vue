<template>
  <v-card width="320" class="text-center mb-3">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="d-flex align-center justify-center gap-4">
      <v-btn icon size="small" @click="incrementCounter">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-chip color="purple" text-color="white">{{ count }}</v-chip>
      <v-btn icon size="small" @click="deductCounter">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>

  <ChildAge
    v-if="shouldCollectAge"
    :title="title"
    :howmanychild="count"
  />
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import ChildAge from './ChildAge.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  initialValue: {
    type: Number,
    default: 0,
  },
});

const store = useStore();
const count = ref(props.initialValue ?? 0);

watch(
  () => props.initialValue,
  (value) => {
    if (typeof value === 'number' && value !== count.value) {
      count.value = value;
    }
  },
);

watch(
  count,
  (value, previous) => {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
    if (safeValue !== value) {
      count.value = safeValue;
      return;
    }

    if (safeValue === previous) {
      return;
    }

    store.commit('countercardupdate', { title: props.title, value: safeValue });
  },
  { immediate: true },
);

const shouldCollectAge = computed(
  () => count.value > 0 && (props.title === '미성년자 수' || props.title === '장애인 수'),
);

const incrementCounter = () => {
  count.value += 1;
};

const deductCounter = () => {
  if (count.value === 0) {
    return;
  }
  count.value -= 1;
};
</script>
