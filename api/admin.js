const express = require("express");
const router = express.Router();
// const Mock = require("mockjs");
// const { keys, aesEncrypt, aesDecrypt } = require("./utils");
const { Product,ProductList ,Role,Team} = require("./utils/schema");





router.get("/index", (req, res) => {
    res.send("这是一个 vue 项目的 路由接口")
});


//登录
router.post('/login',(req,res)=>{
    const {username,password} = req.body;
 
    Team.find({username,password}).then(result=>{
      
     if(result.length!=0){
        console.log(result)
        res.json({
            status:0,
            message:'登录成功！',
           user:{
            username,
            roleName:result[0].roleName
           },
            result
        })
     }else{
         res.json({
             status:1,
             message:'用户不存在！',
             result
         })
     }
    })
})


//获取列表
router.get('/getCategory',(req,res)=>{
    const {level} = req.query;
    Product.find({level:level}).then(result=>{
        res.json({
            status:0,
            result
        })
    })
})

//修改列表
router.post('/updateList',(req,res)=>{
    const {categoryId,categoryName} =req.body;
    Product.updateMany({_id:categoryId},{$set:{
   
        name:categoryName
    }}).then(result=>{
        console.log(result)
        res.json({
                status:0,
                result
        })
    })
})


// 添加分类

router.post('/addList',(req,res)=>{
    const {level,categoryName} = req.body;
    // console.log(categoryName)
    Product.find({name:categoryName}).then(result=>{
        console.log(result)
       if(result.length!=0){
           console.log(999)
        res.json({
            status:0,
            message:'已有分类',
        })
       }else{
        Product.insertMany({level:level,name:categoryName}).then(result=>{
            res.json({
                status:0,
                message:'添加成功',
                result
            })
        })
       }
    })
})

//请求所有商品

router.get('/getAllProducts',(req,res)=>{
    console.log('/getAllProducts')
    ProductList.find({}).then(result=>{
        res.json({
            status:0,
            message:'获取成功',
            result

        })
    })
})


//搜索

router.post('/searchName',(req,res)=>{
    const {searchName} = req.body
    ProductList.find({name:new RegExp(searchName)}).then(result=>{
        res.json({
            status:0,
            message:'获取成功',
            result

        })
    })
})

router.post('/searchDesc',(req,res)=>{
    const {searchName} = req.body
    ProductList.find({desc:new RegExp(searchName)}).then(result=>{
        res.json({
            status:0,
            message:'获取成功',
            result

        })
    })
})

router.get('/searchStatus',(req,res)=>{
    const {_id} = req.query;
    ProductList.find({_id}).then(result=>{
        res.json({
            status:0,
            message:'获取成功',
            result

        })
    })
})

router.post('/updateStatus',(req,res)=>{
    const {_id,status} = req.body;

    ProductList.find({_id}).then(result=>{
       if(result.length!=0){
        ProductList.update({_id},{$set:{status}}).then(result=>{
            res.json({
                status:0,
                message:'获取成功',
                result
    
            })
        })
       }
    })
})


router.post('/reqUpdateItem',(req,res)=>{
    const {valueN,valueP,valueD,valueS,_id} = req.body;

ProductList.find({_id}).then(result=>{
    if(result.length!=0){
        ProductList.update({_id},{$set:{status:valueS,name:valueN,price:valueP,desc:valueD}}).then(result=>{
            res.json({
                status:0,
                message:'获取成功',
                result
    
            })
        })
    }
})
})


router.post('/reqAddItem',(req,res)=>{
    const {valueN,valueP,valueD,valueS} = req.body;

    ProductList.find({status:valueS,name:valueN,price:valueP,desc:valueD}).then(result=>{
        if(result.length==0){
            ProductList.insertMany({status:valueS,name:valueN,price:valueP,desc:valueD}).then(result=>{
                res.json({
                    status:0,
                    message:'添加成功',
                    result
        
                })
            })
        }else{
            res.json({
                status:0,
                message:'已有商品',
                result
    
            })
        }
    })

})

//角色请求
router.get('/reqRoles',(req,res)=>{
    Role.find({}).then(result=>{
        res.json({
            status:0,
            message:'获取成功',
            result

        })
    })
})

//添加角色
router.post('/reqAddRole',(req,res)=>{
    const {role,power} = req.body;
    console.log(req.body)
    Role.find({name:role}).then(result=>{
        if(result.length==0){
            Role.insertMany([{name:role,power}]).then(
                res.json({
                    status:0,
                    message:'添加成功',
                    result
        
                })
            )
        }
    })
})


//获取用户
router.get('/reqTeam',(req,res)=>{
    Team.find({}).then(result=>{
        res.json({
            status:0,
            message:'获取成功',
            result

        })
    })
})

router.post('/reqDeteleInfo',(req,res)=>{
    const {_id} =req.body
    Team.remove({_id}).then(result=>{
        res.json({
            status:0,
            message:'删除成功',
            result

        })
    })
})


router.get('/reqRoleList',(req,res)=>{
    Role.find({}).then(result=>{
        res.json({
            status:0,
            message:'获取成功',
            result

        })
    })
})


router.post('/reqAddInfo',(req,res)=>{
    const {valueP,valueU,valueR} = req.body;
    console.log(req.body)
    Team.find({username:valueU,password:valueP,roleName:valueR}).then(result=>{
      if(result.length==0){
         
        Team.insertMany({username:valueU,password:valueP,roleName:valueR}).then(result=>{
            res.json({
                status:0,
                message:'添加成功',
                result
    
            })
        })
      }
    })
})


router.post('/reqUpdataInfo',(req,res)=>{
const {valueP,valueU,valueR,_id} = req.body;

Team.find({_id}).then(result=>{
    if(result.length!=0){
        Team.update({_id},{$set:{username:valueU,password:valueP,roleName:valueR}}).then(result=>{
            res.json({
                status:0,
                message:'修改成功',
                result
    
            })
        })
    }
})
})


router.post('/reqChangePassword',(req,res)=>{
    const {username,password} =req.body;
    Team.find({username}).then(result=>{
        if(result.length!=0){
            Team.update({username},{$set:{password}}).then(result=>{
                res.json({
                    status:0,
                    message:'修改成功',
                    result
        
                })
            })
        }
    })

})
module.exports = router;