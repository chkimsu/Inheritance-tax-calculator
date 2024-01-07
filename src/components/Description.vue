<template>


<v-expansion-panels>
  <v-expansion-panel
    v-bind:title='exec'
    text="현금성자산, 화폐, 등을 의미"
  >
  </v-expansion-panel>
</v-expansion-panels>



</template>

<script>

export default{
    name : 'DescriptionVue',
    props :{
        title : String
    },
    
    data(){
        return {
            title_ : this.title,
            exec : this.title
        }
    }
}




</script>