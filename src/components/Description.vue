<template>


<v-expansion-panels>
  <v-expansion-panel
    v-bind:title= exec
    text="현금성자산, 화폐, 등을 의미"
  >
  </v-expansion-panel>
</v-expansion-panels>



</template>

<script>

export default{

    props :{
        title : String
    },
    mounted(){
// 요거 공부... 
        console.log('this.title : ' ,this.title_)
        console.log('this.exec : ', this.title +'kk')

    }
    ,
    data(){

        return {
            title_ : this.title,
            exec : this.title +'kk'
        }
    },
    name : 'DescriptionVue'
}




</script>