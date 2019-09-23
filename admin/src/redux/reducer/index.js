


import {combineReducers} from 'redux';
import localStorageUtil from '../../utils/localStorage'
import { SET_HEADER_TITLE, LOGIN,RECEIVE_USER, CLEARUSER } from '../action-type';


const headTitle = '首页'
    function headerTitle(state=headTitle,action){
            switch(action.type){
            case SET_HEADER_TITLE :
                return action.data


                default :
                return state;
            }
    }


const USER =localStorageUtil.getUser()
function user(state=USER,action){
    switch(action.type){

        case RECEIVE_USER :
            console.log(action.data)

        return action.data;


        case CLEARUSER:
            return action.data



        default :
        return state;
    }
}







export default combineReducers({
    headerTitle,
    user
})

