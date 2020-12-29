import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        currentUserEid:'',
    },
    mutations:{
        showDepId(state){
            return state.currentUserEid
        },
    }
})

export { store }