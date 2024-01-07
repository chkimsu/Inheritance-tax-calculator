<template>


<HeaderTab></HeaderTab>
<div class = '.container'>
    <div class="row">
        <div class="col-md-6">

    <WhoInherit v-on:whochildEvent="whopreocesschildevent"></WhoInherit>
    <WifeMoney v-on:WifeMoneychildEvent="processCalculateChildEvent" v-if="whorecivedata" title="배우자 상속 금액"></WifeMoney>

    <div class = "d-flex justify-content-center">
        <CounterCardMerge></CounterCardMerge>
    </div>
    

    <WifeMoney v-on:WifeMoneychildEvent="processCalculateChildEvent" v-for="title in titleList.slice(0,2)" v-bind:title="title" :key="title"></WifeMoney>
    <SamePerson v-on:childEvent="processChildEvent"></SamePerson>
    <WifeMoney v-on:WifeMoneychildEvent="processCalculateChildEvent" v-if="receivedata" title="동일인 증여 금액" ></WifeMoney>
    <WifeMoney v-on:WifeMoneychildEvent="processCalculateChildEvent" v-for="title in titleList.slice(2,8)" v-bind:title="title" :key="title"></WifeMoney>

</div>


        <div class="col-6 col-md-6">
        <!-- 오른쪽에 배치될 컴포넌트 -->
             <testComp></testComp>
        <div>
        <h1>{{sumOfCal}}</h1></div>

        </div>
    </div>  
</div>

</template>

<script>


import WifeMoney from '@/components/WifeMoney.vue';
import CounterCardMerge from '@/components/CounterCardMerge.vue';
import SamePerson from './SamePerson.vue';
import HeaderTab from '@/components/HeaderTab.vue'
import testComp from '@/components/ShowResultPage.vue'
import WhoInherit from './WhoInherit.vue';

export default {

data(){
 return {
    isTrue : true,
    receivedata : null,
    titleList : ['상속 재산', '금융 상속 재산', '채무 금액', '감정평가 수수료', "장례 비용","세대 생략 상속 비용","공동주택공제금액", "재해손실금액" ],
    titleObjects: {} ,
    sum : 0,
    whorecivedata : true

}
},

created(){

  // titleList의 각 요소에 대한 객체 생성
    this.titleObjects = this.titleList.reduce((obj, title) => {
    obj[title] = 0; // title을 key로 갖는 빈 문자열 값의 객체 생성
    obj['동일인 증여 금액'] = 0;
    obj['배우자 상속 금액'] = 0;
    return obj;
  }, {});

  console.log('this.titleObjects : ', this.titleObjects)

},

methods:{

    processChildEvent(data){
        this.receivedata = data
        if(this.receivedata === false){
            this.titleObjects['동일인 증여 금액'] = 0;
            this.$store.commit('updateDataFromChild', {'title' : '동일인 증여 금액' , 'value' :  0}); // Vuex Store로 데이터 전달 및 상태 업데이트

        }
    },
    processCalculateChildEvent(title, data){
        this.titleObjects[title] = data;
    },
    whopreocesschildevent(data){
        this.whorecivedata = data
        console.log('this.whorecivedata : ', this.whorecivedata)

    }
},

computed: {

    sumOfCal : function() {
        return Object.values(this.titleObjects).reduce((acc, curr) => acc + curr, 0);
    }
},

components : {
    WifeMoney,
    CounterCardMerge,
    SamePerson,
    testComp,
    HeaderTab,
    WhoInherit
}

}

</script>