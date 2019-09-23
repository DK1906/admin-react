
import axios from 'axios'
import {message} from 'antd'

export default function  ajax(url,data={},method='GET'){
   return new Promise (function(resolve,reject){
    let promise 
    

    if(method==='GET'){
        // return axios.get(url,{params:data})
        promise = axios.get(url,{params:data})
    }else{
        // return axios.post(url,data)
        promise = axios.post(url,data)
    }

    promise.then(response=>{
        resolve(response.data)
    }).catch(error=>{
        message.error('请求失败！'+error.message)
    })
 
   })
}

