<template>

<!-- <div v-for="value in result" :key="value">{{ value }}</div> 왜 이건 안되지?  -->

<div> {{ result[0] }}</div>
<div> {{ result[1] }}</div>
<div> {{ result[2] }}</div>

</template>


<script setup>

import { computed } from "vue";
import { useStore } from "vuex";
// import { ref, reactive } from 'vue';

const store = useStore();

const cal = computed(() => store.state.datafromChild);
const howman = computed(()=> store.state.CounterCard);
const who = computed(()=> store.state.whoInherit);

// let who_value = computed(() => who.value)


let child = computed(() => howman.value['자녀 수'])
let elder = computed(() => howman.value['연로자 수'])
// let under19 = computed(() => howman.value['미성년자 수'])
// let disable = computed(() => howman.value['장애인 수'])

let a = computed(() => cal.value['부동산 상속 재산'])
let b =  computed(() => cal.value['배우자 상속 금액'])
let c =  computed(() =>cal.value['금융 상속 재산'])
let d =  computed(() =>cal.value['채무 금액']) // 공과금도 포함한다고 적어야함. 
let e =  computed(() =>cal.value['감정평가 수수료'])
let f =  computed(() =>cal.value['장례 비용'])
// let g =  computed(() =>cal.value['세대 생략 상속 비용'])
let h =  computed(() =>cal.value['공동주택공제금액'])
let i =  computed(() =>cal.value['재해손실금액'])
let j =  computed(() =>cal.value['동일인 증여 금액'])


function calculateInheritanceTax(taxableAmount) {
    let tax;
    let progressiveDeduction;

    if (taxableAmount <= 100000000) { // 1억원 이하
        tax = taxableAmount * 0.1; // 세율 10%
        progressiveDeduction = 0;
    } else if (taxableAmount <= 500000000) { // 5억원 이하
        tax = taxableAmount * 0.2; // 세율 20%
        progressiveDeduction = 10000000; // 누진공제액 1천만원
    } else if (taxableAmount <= 1000000000) { // 10억원 이하
        tax = taxableAmount * 0.3; // 세율 30%
        progressiveDeduction = 60000000; // 누진공제액 6천만원
    } else if (taxableAmount <= 3000000000) { // 30억원 이하
        tax = taxableAmount * 0.4; // 세율 40%
        progressiveDeduction = 160000000; // 누진공제액 1억 6천만원
    } else { // 30억원 초과
        tax = taxableAmount * 0.5; // 세율 50%
        progressiveDeduction = 460000000; // 누진공제액 4억 6천만원
    }

    return tax - progressiveDeduction; // 최종 세금 계산
}



let result =  computed(

        function testing(){

            const tmp_1 = a.value + c.value // 금융 + 부동산 상속재산
            const tmp_2 = tmp_1 + j.value // 금융 + 부동산 + 사전증여
            const tmp_3 = tmp_2 - d.value // 금융 + 부동산 +사전증여 - 공과금/채무 

            let tmp_4;
            if(f.value <= 5000000){
                 tmp_4 = 5000000;
            }else if (f.value >=10000000) {
                 tmp_4 = 10000000
            }else{
                 tmp_4 = f.value
            }
            const tmp_5 = tmp_3-tmp_4 // 금융 + 부동산 +사전증여 - 공과금/채무 - 장례비용 = 상속세과세가액 or 과세가액이라고 부름

            let tmp_6;
            if(who.value === "배우자" & b.value >= 3000000000){
                tmp_6 = 3000000000
            }else if(who.value === "배우자" & b.value < 3000000000){
                tmp_6 = b.value
            }else if(who.value != "배우자"){
                tmp_6 = 0
            }


            const tmp_7 = tmp_5- tmp_6 //상속세과세가액 - 배우자공제
            const tmp_8 = tmp_7 - child.value * 50000000  //상속세과세가액 - 배우자공제 - 자녀공제
            const tmp_9 = tmp_8 - elder.value * 50000000  //상속세과세가액 - 배우자공제 - 자녀공제- 고령자공제
            // 미성년자와 장애인은 나이 입력하는 칸 만들기 
            const tmp_10 = tmp_9 - 500000000 ////상속세과세가액 - 배우자공제 - 자녀공제- 고령자공제 - 인적공제

            let tmp_11;

            if(c.value*0.2 >=200000000){
                tmp_11 = 200000000
            }
            else{
                tmp_11 = c.value*0.2
            }

            const tmp_12 = tmp_10 - tmp_11;  //상속세과세가액 - 배우자공제 - 자녀공제- 고령자공제 - 인적공제 - 금융재산상속공제

            let tmp_13;
            if(h.value >= 600000000){
                tmp_13 = 600000000
            }else{
                tmp_13 = h.value
            }

            const tmp_14 = tmp_12 - tmp_13  //상속세과세가액 - 배우자공제 - 자녀공제- 고령자공제 - 인적공제 - 금융재산상속공제 - 동거주택상속공제
            const tmp_15 = tmp_14-i.value //상속세과세가액 - 배우자공제 - 자녀공제- 고령자공제 - 인적공제 - 금융재산상속공제 - 동거주택상속공제 - 재해손실금액
            const tmp_16 = tmp_15 - e.value //상속세과세가액 - 배우자공제 - 자녀공제- 고령자공제 - 인적공제 - 금융재산상속공제 - 동거주택상속공제 - 재해손실금액 - 감정평가 수수료 == 상속세 과세표준
            const tmp_17 = calculateInheritanceTax(tmp_16)

            const tmp_18 = tmp_17 - tmp_17*0.03 //신고세액 공제금액 3퍼센트 

        return [tmp_1, tmp_4, d.value, j.value, tmp_5,
                tmp_6, child.value * 50000000, elder.value * 50000000, 500000000, tmp_11,
                tmp_13, i.value, e.value, tmp_16, tmp_17, tmp_17*0.03, tmp_18]

  
}
)





</script>