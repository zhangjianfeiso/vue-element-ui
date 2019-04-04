import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        components: {},
    },
    mutations: {
        setComponents(state, payload){
            if(payload.hasOwnProperty('components')){
                state.components = payload.components
            }
        }
    }
})
