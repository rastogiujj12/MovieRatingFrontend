import AxiosService from '../../../Services/AxiosService'
import { ToastProgrammatic as Toast } from 'buefy'

import router from '../../../router';
const state = {
    movies:[],
    genre:[],
    director:[],
    movieCount:0,
    isLoading:false,
};

const getters = {
    getMovies(state){
        return state.movies;
    },
    getGenre(state){
        return state.genre;
    },
    getDirectors(state){
        return state.director;
    },
    getMovieCount(state){
        return state.movieCount;
    },
    isLoading(state){
        return state.isLoading;
    }
}

const mutations = {
    setMovies(state, data){
        return state.movies = data
    },
    setGenre(state, data){
        return state.genre = data;
    },
    setDirectors(state, data){
        return state.director = data;
    },
    setMovieCount(state, count){
        return state.movieCount = count;
    },
    setIsLoading(state, value){
        return state.isLoading = value;
    }
}

const actions = {
    getMovies({commit}, req){
        commit("setIsLoading", true)
        AxiosService.get('/movie/get', req).then(({error, data, msg, success})=>{
            commit("setIsLoading", false)
            if(error) {
                Toast.open({
                    duration: 5000,
                    message: msg,
                    type: 'is-danger'
                })
            } else{
                commit("setMovies", data.movies);
                commit("setMovieCount", data.count)
            }
        })
    },
    deleteMovie({dispatch}, {_id}){
        AxiosService.deleteMethod('/movie/delete', {_id}).then(({msg, success})=>{
            if(!success){
                Toast.open({
                    duration: 5000,
                    message: "delete failed",
                    type: 'is-danger'
                })
            } else{
                Toast.open({
                    duration: 5000,
                    message: msg,
                    type: 'is-success'
                })
                dispatch("getMovies")
            }
        })
    },
    addMovie({dispatch}, req){
        AxiosService.put("/movie/addSingle", req).then(({msg, success})=>{
            if(!success){
                Toast.open({
                    duration: 5000,
                    message: "Add failed",
                    type: 'is-danger'
                })
            } else{
                Toast.open({
                    duration: 5000,
                    message: msg,
                    type: 'is-success'
                })
                dispatch("getMovies")
            }
        })
    },
    editMovie({dispatch}, req){
        AxiosService.post("/movie/edit", req).then(({msg, success})=>{
            if(!success){
                Toast.open({
                    duration: 5000,
                    message: "Add failed",
                    type: 'is-danger'
                })
            } else{
                Toast.open({
                    duration: 5000,
                    message: msg,
                    type: 'is-success'
                })
                dispatch("getMovies")
            }
        })
    },
    getGenre({commit}){
        AxiosService.get("/genre/get").then(({error, data, msg, success})=>{
            if(success){
                commit("setGenre", data);
            }
        })
    },
    getDirectors({commit}){
        AxiosService.get("/director/get").then(({error, data, msg, success})=>{
            if(success){
                commit("setDirectors", data);
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};
