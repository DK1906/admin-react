

// var crypto = require("crypto"); // node 模块 

// // 加密函数  data 需要加密的字段 
// function aesEncrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }

// // 解密 
// function aesDecrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }
// const keys = "wuhan1906";

// exports.aesEncrypt = aesEncrypt;   // 加密
// exports.aesDecrypt = aesDecrypt;   // 解密
// exports.keys = keys;        // 密钥 




// // 检测 后端session   token 是否存在 是否登录 
// // req.headers.AUTH_TOKEN  把 token 传递过来  
// // 后端需要处理的逻辑  
// // 1. 如果 req.headers 没有token 直接判断 token不存在,请马上登录
// // 2. 前端 req.headers 有 token ,但是 后端 的 session 没有存储token token过期或者失效
// // 3. 前端 req.headers 有 token, 后端 session 也有 token  但是不匹配  token不匹配


// exports.checkToken = function(req,res,next){
//     console.log(req.path);
//     if(req.path!=="/vue/login"&&req.path!=="/vue/register"){
        
//         const client_token = req.headers['token'];   // 前端的 token

//         console.log(req.headers['token']+'3333')
//         const server_token = req.session.token;   // 后端的 token
//         // console.log(req.session);
//         if(client_token){
//             if(server_token){
//                 if(client_token==server_token){
//                     next();
//                 }else{
//                     res.json({
//                         code:500,
//                         msg:"token不匹配",
//                         type:0,
//                     }) 
//                 }
//             }else{
//                 res.json({
//                     code:500,
//                     msg:"token过期或者失效",
//                     type:0,
//                 }) 
//             }
//         }else{
//             res.json({
//                 code:500,
//                 msg:"token不存在,请马上登录",
//                 type:0,
//             })
//         }
//     }else{
//         next();
//     }
   
// }