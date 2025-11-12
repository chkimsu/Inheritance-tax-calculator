<template>
  <div class="w-100">
    <v-text-field
      v-for="index in fieldCount"
      :key="`age-input-${title}-${index}`"
      v-model="inputValues[index - 1]"
      type="number"
      color="success"
      variant="outlined"
      class="mb-2"
      label="나이를 입력하세요"
      min="0"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  howmanychild: {
    type: Number,
    default: 0,
  },
});

const store = useStore();
const inputValues = ref([]);

const fieldCount = computed(() => Math.max(0, props.howmanychild));

const storeKey = computed(() => {
  if (props.title === '미성년자 수') {
    return 'Child';
  }
  if (props.title === '장애인 수') {
    return 'disabled';
  }
  return null;
});

watch(
  fieldCount,
  (count) => {
    inputValues.value = Array.from({ length: count }, (_, index) => inputValues.value[index] ?? '');
  },
  { immediate: true },
);

watch(
  inputValues,
  (values) => {
    if (!storeKey.value) {
      return;
    }
    store.commit('countercardAgeupdate', { title: storeKey.value, value: [...values] });
  },
  { deep: true },
);
</script>
