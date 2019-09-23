// const jwt = require('jsonwebtoken');

// //密钥
// const secret = 'wuhan1906';

// //生成token
// exports.createToken = function(data){
//     return jwt.sign(data,secret);
// }


// //解密

// exports.checkToken= function(token){
//     return new Promise(function(resolve,reject){
//         jwt.verify(token,secret,(err,data)=>{
//             if(err){
//                 throw err;
//                 reject('token,解密失败');
//             }else{
//                 resolve(data);
//             }
//         })
//     })
// }

// exports.tokenMiddleware = function(req,res,next){
    
// }