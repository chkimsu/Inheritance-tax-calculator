<template>
    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="primary"
      >
        <v-tab value="one">상속세</v-tab>
        <v-tab value="two">증여세</v-tab>
        <v-tab value="three">양도세</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            상속세 계산기
          </v-window-item>
  
          <v-window-item value="two">
            증여세 계산기
          </v-window-item>
  
          <v-window-item value="three">
            양도세 계산기
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        tab: null,
      }),
    }
  </script>