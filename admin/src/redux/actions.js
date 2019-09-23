import { SET_HEADER_TITLE, LOGIN, RECEIVE_USER ,CLEARUSER} from "./action-type";
import {reqLogin} from '../api'
import {message} from "antd"
import User from '../utils/localStorage'




export const setHeaderTitle =headerTitle=>({type:SET_HEADER_TITLE,data:headerTitle})

export const receive_user =user=>({type:RECEIVE_USER,data:user}) 

export const clearUser = ()=>{
     User.removeUser();
  return  {type:CLEARUSER,data:{}}
}


export const login=(username,password)=>{
    console.log(username,password)
    return async dispatch=>{
//执行异步
//  console.log('result')
        const result = await reqLogin(username,password)
        console.log(result.user)

        if(result.status==0){
            dispatch(receive_user(result.user))
        }
       
    }
}


