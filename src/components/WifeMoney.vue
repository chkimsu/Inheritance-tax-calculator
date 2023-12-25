<template>



                    <div class="card">
                        
                        <div class="card-body">
                            <div class="table-box mobile">
                                <table class="table incont table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <tbody>
                                    <tr class="inheritor_type" style="display: table-row;">
                                        <th>{{title_}}

                                                 <!-- 신기한게 생김. v-model.number로 숫자입력받음.  -->
                                                    <!-- type=number로 해두면 글자입력불가 -->
                       
                                            <input class = 'input_type' type='number' v-model.number="calculation">
                                            <span style="margin-left:10px;">원</span>
                                            <div>{{ computCal }}</div>
                                        
                                        
                                        </th>
                                        <td colspan="3">
                                            
                                        <v-btn class="ma-2" v-for="course in courses" :key="course.id" 
                                        rounded
                                        :color="selectedButtonId === course.id ? 'primary' : undefined" 
                                        @click="
                                        selectedButtonId = course.id;
                                        calculate();
                                        sendParent()"
                                        >
                                        {{ course.name }}
                                        </v-btn>

                                        </td>
                                    </tr>
                             
                                    </tbody>
                                </table>
                            </div>
                        </div>
</div>

</template>



<script>
import {formatNumber} from 'hangul-util'

export default{
    name : 'WifeMoney',
    props :{
        title : String
    },
    data() {
      return {
        title_ : this.title,
        courses: [{id:1, name: '10억'}, {id:2, name: '1억'},{id:3, name: '1천만'},{id:4, name: '1백만'},{id:5, name: '초기화'}],
        selectedButtonId:  null,
        calculation : 0
      }
    },
    methods : {
        sendParent(){

            this.$emit('WifeMoneychildEvent',this.title, this.calculation)
            this.$store.commit('updateDataFromChild', {'title' : this.title , 'value' :  this.calculation}); // Vuex Store로 데이터 전달 및 상태 업데이트

        }
        ,

        calculate(){

            if(this.selectedButtonId === 1){
                this.calculation += 1000000000;

            }else if(this.selectedButtonId === 2){

                this.calculation += 100000000;

            }else if(this.selectedButtonId ===3){

            this.calculation += 10000000;

            }else if(this.selectedButtonId === 4){

            this.calculation += 1000000;

            }else if(this.selectedButtonId === 5){

            this.calculation = 0 ;

            }

            }


        },
    computed : {
        computCal : function(){

            
            return formatNumber(this.calculation) 

        }

    }

    }


</script>

<style>

.input_type{

    margin-top: 20px;
    padding: 0 15px;
    border-radius: 5px;
    background: #e78585;
}


</style>