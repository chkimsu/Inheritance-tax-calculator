import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
    state : {
        datafromChild : {},
        whoInherit : '초기값',
        CounterCard : {}
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

        }
    },
});
