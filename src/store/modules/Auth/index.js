import AxiosService from '../../../Services/AxiosService'
import { ToastProgrammatic as Toast } from 'buefy'

import router from '../../../router';
const state = {
    authToken: null, // Store this in LocalStorage
    userId: null,
    userData:null,
};

const getters = {
    isAuthenticated(state) {
        return !!state.authToken;
    },
    userData(state) {
        return state.userData;
    }
}

const mutations = {
    setAuth(state, token) {
        state.authToken = token;
    },

    clearAuth(state) {
        state.authToken = null;
        state.userId = null;
        state.userData = null;
    },

    setUser(state, userData) {
        state.userData = userData
    },
    updateUser(state, userData) {
        for (let prop in userData) {
            state.userData[prop] = userData[prop]
        }
    }

};

const actions = {
    signup({ dispatch }, authData) {
        AxiosService.post('/signup', authData).then(({ id, error, msg }) => {
            if (!error) {
                router.replace('/login')
                dispatch('login', { email: authData.email, password: authData.password })
                Toast.open({
                    duration: 5000,
                    message: 'Account created successfully',
                    type: 'is-success'
                })
            }
            else if (error) {
                Toast.open({
                    duration: 5000,
                    message: msg,
                    type: 'is-danger'
                })
            }
        })
    },

    login({ commit, dispatch }, { email, password }) {
        AxiosService.post('/login', { email, password }).then(({ error, data }) => {
            if(error){
                Toast.open({
                    duration: 2000,
                    message: 'Invalid email or password',
                    type: 'is-danger'
                })
            }
            else{
                //do something
                localStorage.setItem("Authorization", data.token);
                // console.log("token", token)
                commit('setAuth', data.token)
                AxiosService.updateAuthHeaders(data.token);
                // dispatch('autoLogin')
                Toast.open({
                    duration: 2000,
                    message: 'Login successful',
                    type: 'is-success'
                })
            }
        });
    },
    logout({ commit }) {
        commit('clearAuth')
        AxiosService.updateAuthHeaders('')
        localStorage.removeItem('Authorization')
    },

    autoLogin({ commit, dispatch }) {
        return new Promise(async (resolve, reject) => {
            
            let token = localStorage.getItem("Authorization");
            // console.log("called autologin", token)
            AxiosService.updateAuthHeaders(token);
            // let token = chrome.storage.sync.get(['Authorization']);

            if (token) {
                let user = await AxiosService.get('/autoLogin');
                if(user.login){
                    commit("setAuth", token);
                    localStorage.setItem("Authorization", token);
                    // chrome.storage.sync.set({Authorization: token});
                    // dispatch("getUser");
                    // console.log("router", router);
                    // router.replace('/dashboard')
                    return resolve({ login: true });
                }
            }
        });
    },

    // getUser({
    //     commit,
    //     rootState: {
    //         Auth: { authToken },
    //     },
    // }) {
    //     // console.log("get user", authToken);
    //     if (authToken) {
    //         AxiosService.get('/getUser').then((data) => {
    //             if (!data.user) {
    //                 localStorage.removeItem("Authorization");
    //                 router.push("/login");
    //             } else commit("setUser", data.user);
    //         });
    //     }
    // }

};

export default {
    state,
    getters,
    mutations,
    actions,
};
