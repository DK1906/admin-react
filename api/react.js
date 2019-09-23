

const express = require("express");
const router = express.Router();

const { Liuyan,Code,User ,Movie} = require("./utils/schema");

const {getResult} = require("./config");

const {createToken,checkToken} = require("./utils/token");

router.get("/index",(req,res)=>{
    res.send("这是 react 项目的 接口 地址")
})


// 留言 
// 增删改查 

router.get("/getComments",(req,res)=>{
    Liuyan.find().sort({_id:1}).then(result=>{
        res.json({
            code:200,
            msg:"获取评论数据成功",
            result
        })
    })
})

router.post("/addComment",(req,res)=>{
    const body = req.body;
    console.log(body);
    Liuyan.insertMany(body).then(val=>{
        Liuyan.find().then(result=>{
            res.json({
                code:200,
                msg:"评论新增成功",
                result
            })
        })
    })
})


router.post("/delComment",(req,res)=>{
    const cId = req.body.cId;
    Liuyan.deleteOne({
        _id:cId
    }).then(result=>{
        res.json({
            code:200,
            msg:"评论删除成功",
            result
        })
    })
})


router.get("/movie",(req,res)=>{
    const {
        limit 
    } = req.query;
    Movie.find({},{}).limit(parseInt(limit)).sort({_id:-1}).then(result=>{
        res.json({
            code:200,
            msg:"获取电影数据成功",
            result
        })
    })  
})

// const Random = Mock.Random;

// router.get("/mock/data",(req,res)=>{
//     var list = [];
//     for(var i = 0;i<200;i++){
//         let obj =  {
//             uid:Random.id(), 
//             title:Random.csentence(5,28),
//             city:Random.city(),
//             names:Random.cname(),
//             pic:Random.image('200x100', '#02adea', 'wuhan1906'),
//             time:Random.date('yyyy-MM-dd') + " " + Random.time()
//         }
//         list.push(obj)
//     }
//     res.json({
//         code:200,
//         msg:'获取mock数据成功',
//         result:list
//     })
// })

function getCode(){
    return 1000+Math.floor(Math.random()*9000);
}
// 获取发送验证码

router.post('/sendCode',(req,res)=>{
    const {
        mobile
    }=req.body;

    if(mobile==''){
        res.json({
            code:200,
            msg:'请输入手机号'
        })
    }

    const code = getCode();
    getResult(code,mobile).then(
        response=>{
            console.log(response.data.code)
            if(response.data.code=='000000'){

                Code.insertMany({
                    mobile,
                    code,
                    time:Date.now()
                }).then(result=>{
                    res,json({
                        code:200,
                        msg:'验证码发送成功',
                        params:code,
                        type:1,
                        mobile
                    })
                })
            }else{
                res.json({
                    code:200,
                    msg:'验证码请求失败',
                    params:code,
                    type:0
                })
            }
        }
    ).catch(err=>{
        res.json({
            code:200,
            msg:'服务器错误',
            type:0
        })
    })
})

// 校验验证码 
router.post('/checkCode',(req,res)=>{
    const{
        mobile,
        code,
    }=req.body;
    Code.findOne({
        mobile,
        code
    }).then(result=>{
        if(result){
            const time = Date.now();
            if(time-result.time<60*1000){
                const token = createToken(mobile);
                res.json({
                    code:200,
                    msg:'验证码-验证通过',
                    type:1,
                    token
                })
            }else{
                res.json({
                    code:200,
                    msg:'验证码过期',
                    type:0
                })
            }
        }else{
            res.json({
                code:200,
                msg:'验证码无效',
                type:0
            })
        }
    })
})




const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/avatar');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'wh'+file.originalname);
    }
})

// 创建上传对象
const upload = multer({storage}).any();
 // 上传头像2 
 router.post('/uploadreact',upload,(req,res)=>{
     
     var pic = req.files[0].path;
     const {token}= req.headers;
     console.log(token);
     checkToken(token).then(mobile=>{
         console.log(mobile);
         res.json({
            code:200,
             msg:'头像上传成功',
             pic
         })
     }).catch(err=>{
         res.json({
             code:500,
             errMsg:err,
         })
     })

 })

module.exports = router;