<template>


  <v-text-field v-for="(how, index) in howmanychild" :key="index"
    v-model='inputValues[index]'
    color="success"
    variant="outlined"
    v-on:keyup.enter="process()"
    label = '나이 입력 후 Enter치세요'
  >


</v-text-field>


</template>


<script>


export default{


    props: {
      title: String, // 카드의 제목
      howmanychild: Number // 초기 카운트 값
    },

    data(){

        return {
        inputValues :[]}

    },
    methods : {
        process(){
         if(this.title === "미성년자 수"){
         this.$store.commit('countercardAgeupdate', {'title' : 'Child', 'value' :  this.inputValues})
         console.log(this.inputValues)
        }else if(this.title === "장애인 수"){
        this.$store.commit('countercardAgeupdate', {'title' : 'disabled', 'value' :  this.inputValues})

        }
     }
}
}
</script>