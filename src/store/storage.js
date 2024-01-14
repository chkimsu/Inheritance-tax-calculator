import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
    state : {
        datafromChild : {
            '부동산 상속 재산' : 0,
            "배우자 상속 금액" : 0,
            '금융 상속 재산' : 0, 
            '채무 금액': 0,
            '감정평가 수수료': 0, 
             "장례 비용": 0,
             "세대 생략 상속 비용": 0,
             "공동주택공제금액": 0, 
             "재해손실금액": 0,
             '동일인 증여 금액' : 0

        },
        whoInherit : '배우자',
        CounterCard : {
        "자녀 수" : 0,
        "연로자 수" :0,
        "미성년자 수" :0,
        "장애인 수" : 0 },

        CounterCardAge : {

            'Child' : [],
            'disabled' : []

        }
        },
        
    
    mutations : {
        updateDataFromChild(state, payload) {
            state.datafromChild[payload.title] = payload.value; // 상태 업데이트
        },
        whoInheritUpdate(state, value) {
            state.whoInherit = value; // 상태 업데이트
            console.log('whoInheritUpdate 함수 테스트중 : ', state.whoInherit)
        },
        countercardupdate(state, payload){

            state.CounterCard[payload.title] = payload.value; // 상태 업데이트

        },
        countercardAgeupdate(state, payload){
            state.CounterCardAge[payload.title] = payload.value; // 상태 업데이트
            console.log('storage.js 확인중 : ', state.CounterCardAge)

        }
    },
});
