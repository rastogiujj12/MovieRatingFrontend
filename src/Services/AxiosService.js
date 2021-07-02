import axios from 'axios'

console.log("axios service", this)

const endpoint = "http://localhost:3000/api"

let headers = {
    Authorization:''
}
const updateAuthHeaders = (token)=>{ // User better way to load this (from localStorage)
    headers.Authorization = `${token}`;
    // console.log("header updated");
}

const post = (url, req)=>{
    return new Promise((resolve, reject)=>{
        axios.post(`${endpoint}${url}`, req, {headers})
        .then( res=>{
            // console.log("res", res)
            resolve(res.data);
        })
        .catch(error=>{
            resolve({ error: 'Invalid Token' })
        })
    })
}
const put = (url, req)=>{
    return new Promise((resolve, reject)=>{
        axios.put(`${endpoint}${url}`, req, {headers})
        .then( res=>{
            // console.log("res", res)
            resolve(res.data);
        })
        .catch(error=>{
            resolve({ error: 'Invalid Token' })
        })
    })
}
const deleteMethod = (url, req)=>{
    console.log("delete method", req);
    return new Promise((resolve, reject)=>{
        axios.delete(`${endpoint}${url}`, {data:req,  headers})
        .then( res=>{
            // console.log("res", res)
            resolve(res.data);
        })
        .catch(error=>{
            resolve({ error: 'Invalid Token' })
        })
    })
}

const get = (url)=>{
    // console.log("headers", headers);
    return new Promise((resolve, reject)=>{
        axios.get(`${endpoint}${url}`, {headers})
        .then( res=>{
            // console.log("axios get", res);
            resolve(res.data);
        })
        .catch(error=>{
            resolve({ error: 'Invalid Token' });
        })
    })
}

export default {
    post,
    get,
    put,
    deleteMethod,
    updateAuthHeaders
}