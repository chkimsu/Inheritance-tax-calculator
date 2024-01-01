import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
    state : {
        datafromChild : {}
    },
    
    mutations : {
        updateDataFromChild(state, payload) {
            state.datafromChild[payload.title] = payload.value; // 상태 업데이트
            console.log('state.datafromChild : ', state.datafromChild)
        }
    },
});
