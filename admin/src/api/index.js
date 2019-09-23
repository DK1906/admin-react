

import ajax from './axios';
import Axios from './jsonp'  // 封装的文件路径

const BASE_URL="https://xx1314.fun:2906"

//登录

export const reqLogin = (username,password)=> ajax(BASE_URL+'/admin/login',{username,password},'POST')




//   const url= http://api.map.baidu.com/telematics/v3/weather?location=武汉&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
//请求天气
export const reqWeather =(city)=>Axios.jsonp({url:`https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`}).then((res)=>{
    // console.log(res.results[0].weather_data[0].dayPictureUrl)
    return res.results[0].weather_data[0]
}).catch((err)=>{
    console.log(err)
}) 


//获取一级/二级分类列表
export const reqCategory = (level)=>ajax(BASE_URL+'/admin/getCategory',{level:level},'GET')



//更新修改分类
export const reqUpdate = ({categoryId,categoryName})=>ajax(BASE_URL+'/admin/updateList',{categoryId,categoryName},'POST')


//添加分类
export const reqAdd = ({level,categoryName})=>ajax(BASE_URL+'/admin/addList',{level,categoryName},'POST')


//请求所有商品

export const reqAllProducts= ()=>ajax(BASE_URL+'/admin/getAllProducts')

//按名称搜索
export const reqName = (searchName)=>ajax(BASE_URL+'/admin/searchName',{searchName},'POST')

//按描述搜索
export const reqDesc = (searchName)=>ajax(BASE_URL+'/admin/searchDesc',{searchName},'POST')


//searchStatus
export const searchStatus=(_id)=>ajax(BASE_URL+'/admin/searchStatus',{_id},'GET')

//updateStatus
export const updateStatus=({_id,status})=>ajax(BASE_URL+'/admin/updateStatus',{_id,status},'POST')

export const reqUpdateItem=({valueN,valueP,valueD,valueS,_id})=>ajax(BASE_URL+'/admin/reqUpdateItem',{valueN,valueP,valueD,valueS,_id},'POST')


export const reqAddItem=({valueN,valueP,valueD,valueS})=>ajax(BASE_URL+'/admin/reqAddItem',{valueN,valueP,valueD,valueS},'POST')


//请求角色
export const reqRoles = ()=>ajax(BASE_URL+'/admin/reqRoles')

//添加角色
export const reqAddRole=({role,power})=>ajax(BASE_URL+'/admin/reqAddRole',{role,power},'POST')


//用户获取

export const reqTeam = ()=>ajax(BASE_URL+'/admin/reqTeam')


//删除信息
export const reqDeteleInfo=(_id)=>ajax(BASE_URL+'/admin/reqDeteleInfo',{_id},'POST')


export const reqRoleList=()=>ajax(BASE_URL+'/admin/reqRoleList')


//添加信息
export const reqAddInfo=(valueP,valueU,valueR)=>ajax(BASE_URL+'/admin/reqAddInfo',{valueP,valueU,valueR},'POST')

export const reqUpdataInfo=(valueP,valueU,valueR,_id)=>ajax(BASE_URL+'/admin/reqUpdataInfo',{valueP,valueU,valueR,_id},'POST')


export const reqChangePassword=(username,password)=>ajax(BASE_URL+'/admin/reqChangePassword',{username,password},'POST')
