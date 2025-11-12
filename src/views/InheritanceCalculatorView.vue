<template>
  <HeaderTab />

  <div class="container py-6">
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <WhoInherit @inherit-change="handleHeirChange" />

        <WifeMoney
          v-if="showSpouseField"
          :title="FIELD_LABELS.SPOUSE"
        />

        <div class="d-flex justify-content-center my-4">
          <CounterCardMerge />
        </div>

        <div class="mb-3">
          <h5 class="mb-3">상속 재산</h5>
          <WifeMoney
            v-for="title in assetFields"
            :key="title"
            :title="title"
          />
        </div>

        <SamePerson class="my-3" @toggle="handleSamePersonToggle" />

        <WifeMoney
          v-if="showPriorGiftField"
          :title="FIELD_LABELS.PRIOR_GIFT"
        />

        <div class="mb-3">
          <h5 class="mb-3">공제 및 비용</h5>
          <WifeMoney
            v-for="title in deductionFields"
            :key="title"
            :title="title"
          />
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <ShowResultPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import CounterCardMerge from '@/components/CounterCardMerge.vue';
import HeaderTab from '@/components/HeaderTab.vue';
import SamePerson from '@/components/SamePerson.vue';
import ShowResultPage from '@/components/ShowResultPage.vue';
import WifeMoney from '@/components/WifeMoney.vue';
import WhoInherit from '@/components/WhoInherit.vue';
import { FIELD_LABELS } from '@/modules/calculator';

const store = useStore();
const showSpouseField = ref(true);
const showPriorGiftField = ref(false);

const assetFields = [FIELD_LABELS.REAL_ESTATE, FIELD_LABELS.FINANCIAL];
const deductionFields = [
  FIELD_LABELS.DEBT,
  FIELD_LABELS.APPRAISAL,
  FIELD_LABELS.FUNERAL,
  FIELD_LABELS.SHARED_HOUSING,
  FIELD_LABELS.DISASTER_LOSS,
  FIELD_LABELS.GENERATION_SKIP,
];

const handleHeirChange = (hasSpouse) => {
  showSpouseField.value = hasSpouse;
  if (!hasSpouse) {
    store.commit('updateDataFromChild', { title: FIELD_LABELS.SPOUSE, value: 0 });
  }
};

const handleSamePersonToggle = (isSamePerson) => {
  showPriorGiftField.value = isSamePerson;
  if (!isSamePerson) {
    store.commit('updateDataFromChild', { title: FIELD_LABELS.PRIOR_GIFT, value: 0 });
  }
};
</script>
