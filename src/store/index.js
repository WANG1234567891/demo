import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: { //  这里相当于Vue实例中的data，用于存放数据
        msg: ''
    },
    modules: {
        app,
        user
    },
    getters
})

export default store