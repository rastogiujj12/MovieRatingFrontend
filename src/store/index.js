import Vue from 'vue'
import Vuex from 'vuex'

import Auth from "./modules/Auth";
import Data from "./modules/Data";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: "imdb-clone-frontend",
    },

    modules: {
        Auth,
        Data 
    },
});