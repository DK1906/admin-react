const express = require("express");
const router = express.Router();

const {Movie, User, MyOrder, Comment, SetList } = require("./utils/schema");

const Mock = require("mockjs");

// const { keys, aesEncrypt, aesDecrypt } = require("./utils");

router.get("/index", (req, res) => {
    res.send("这是一个 vue 项目的 路由接口")
});

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

const Random = Mock.Random;

router.get("/mock/data",(req,res)=>{
    var list = [];
    for(var i = 0;i<200;i++){
        let obj =  {
            uid:Random.id(), 
            title:Random.csentence(5,28),
            city:Random.city(),
            names:Random.cname(),
            pic:Random.image('200x100', '#02adea', 'wuhan1906'),
            time:Random.date('yyyy-MM-dd') + " " + Random.time()
        }
        list.push(obj)
    }
    res.json({
        code:200,
        msg:'获取mock数据成功',
        result:list
    })
})

router.post("/register", (req, res) => {
    const body = req.body;
    console.log(req.body);
    User.findOne({
        $or: [
            {
                username: body.username,
            },
            {
                mobile: body.mobile
            }
        ]
    }, {}).then(result => {
        console.log(result)
        if (result) {
            res.json({
                code: 200,
                msg: "注册失败,用户名或者手机号已经存在",
                type: 0
            })
        } else {
            User.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "注册成功...",
                    type: 1
                })
            })
        }
    })
})


router.post("/login", (req, res) => {
    const body = req.body;
    console.log(body);
    User.findOne({
        $or: [
            {
                username: body.keys,
            },
            {
                mobile: body.keys,
            }
        ]
    }, {}).then(result => {
        if (result) {
            console.log(body.password)
            if (result.password == body.password) {
                // token    发送给前端  
                // session  后端 
                console.log(req.session);

                const token = aesEncrypt(result.username, keys);
                req.session.token = token;
                console.log(req.session.token + '222');


                res.json({
                    code: 200,
                    msg: "登录成功",
                    token,
                    type: 1
                })
            } else {
                res.json({
                    code: 200,
                    msg: "密码错误",
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "用户名或者手机号不存在",
                type: 0
            })
        }
    })

})


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/avatar');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + 'wh' + file.originalname);
    }
})

// 创建上传对象
const upload = multer({ storage }).any();

// 上传头像 
router.post("/uploadAvatar", upload, (req, res) => {
    // console.log("xxxx");
    console.log(req.files);
    var pic = req.files[0].path;
    var username = aesDecrypt(req.session.token, keys);
    //   console.log(  req.headers['token']+'pppp')
    // console.log(username+"..");

    User.updateOne({
        username
    }, {
            $set: {
                avatar: pic
            }
        }).then(result => {
            res.json({
                msg: "头像上传成功",
                code: 200,
                pic,
                result
            })
        })
})


router.post("/getAvatar", (req, res) => {
    const { username } = req.body;
    User.findOne({
        username,
    }).then(result => {
        if (result.avatar) {
            res.json({
                code: 200,
                msg: "获取个人头像成功",
                type: 1,
                avatar: result.avatar
            })
        } else {
            res.json({
                code: 200,
                msg: "个人头像尚未上传",
                type: 0,
                avatar: null
            })
        }
    })
})


//选座买票
router.get("/myOrders", (req, res) => {
    const { username, nm, cinema, time, money, count, timeMark } = req.query;
    // console.log(req.query);
    MyOrder.findOne({
        username,
        nm,
        time,
        timeMark

    }).then(result => {
        if (result) {
            result.count += count;
            result.money += money;
            res.json({
                code: 200,
                msg: '获取数据成功',
                result
            })
        } else {
            MyOrder.insertMany(req.query).then(result => {
                // console.log(result)
                res.json({
                    code: 200,
                    msg: "添加成功...",
                    result
                })
            })
        }
    })

})

//改签
router.get('/changeTime', (req, res) => {
    const { username, nm, cinema, oldTime, newTime, timeMark } = req.query;
    // console.log(newTime);
    // console.log(oldTime);
    MyOrder.updateOne({
        username,
        nm,
        time: oldTime,
        cinema,
        timeMark

    },
        {
            $set: {
                time: newTime
            }
        }
    ).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: '改签成功',

            result
        })
    })
})


//退票
router.get('/noTicket', (req, res) => {
    const { username, nm, cinema, time, timeMark } = req.query;
    // console.log(req.query);
    MyOrder.remove({
        username,
        nm,
        time,
        cinema,
        timeMark

    }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: '退票成功',
            result
        })
    })

})

//
router.get('/getInfo', (req, res) => {
    const { username } = req.query;
    // console.log(req.query);
    MyOrder.find({
        username,
    }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: '获取信息成功',
            result
        })
    })

})
router.get('/getInfonew', (req, res) => {
    const { username } = req.query;
    // console.log(req.query);
    MyOrder.find({
        username,
    }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: '获取信息成功',
            result
        })
    })

})


router.get('/getAvatar', (req, res) => {
    const { username } = req.query;
    User.findOne({
        username
    }).then(result => {
        res.json({
            code: 200,
            msg: '发表成功',
            result
        })
    })

})


//发表评论
router.post('/expressComment', (req, res) => {
    const { username, avatar, comment, time, nm } = req.body;
    Comment.insertMany({
        username,
        avatar,
        comment,
        time,
        nm
    }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: '发表成功',
            result
        })
    })

})

//我的评价
router.get('/getComment', (req, res) => {
    const { username } = req.query;
    Comment.find({ username }).then(result => {
        res.json({
            code: 200,
            msg: '获取成功',
            result
        })
    })
})


//修改评论
router.post('/changeComment', (req, res) => {
    const { username, nm, time, newcomment } = req.body;
    Comment.update(
        { username, nm, time },
        {
            $set: {
                comment: newcomment
            }
        }).then(result => {
            res.json({
                code: 200,
                msg: '修改成功',
                result
            })
        })
})

//获取修改后的评论
router.get('/getNewComment', (req, res) => {
    const { username } = req.query;
    Comment.find({ username }).then(result => {
        res.json({
            code: 200,
            msg: '获取成功',
            result
        })
    })

})


//删除评论
router.post("/deleteComment", (req, res) => {
    const { username, nm, time } = req.body;
    Comment.remove({
        username, nm, time
    }).then(result => {
        res.json({
            code: 200,
            msg: '删除评论成功',
            result
        })
    })
})


//确认座位
router.post('/comfirmSet', (req, res) => {
    const { nm, cinema, time, i,username } = req.body;
    SetList.findOne({
        nm, cinema, time, i,username
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: '已占',
                type: 0
            })
        } else {
            SetList.insertMany(req.body).then(result => {
                res.json({
                    code: 200,
                    msg: "确认成功...",
                    type: 1
                })
            })
        }
    })

})


//取消座位
router.post("/cancelSet", (req, res) => {
    const { nm, cinema, time, i ,username} = req.body;
    SetList.remove({
        nm, cinema, time, i,username
    }).then(result => {
        res.json({
            code: 200,
            msg: '已取消',
            type: 1
        })
    })
})

//printRed
router.get('/printRed', (req, res) => {
    console.log(req.query.nm)
    console.log(req.query.cinema)
    console.log(req.query.time)
    console.log(req.query)

    const { nm, cinema, time } = req.query;
    SetList.find({
        nm, cinema, time
    }).then(result => {
        res.json({
            code: 200,
            msg: 'Red',
            result
        })
    })

})

//获取所有评论
router.get('/getAllComments', (req, res) => {
    const { nm } = req.query;
    Comment.find({ nm }).sort({ _id: -1 }).then(result => {
        res.json({
            code: 200,
            msg: '获取所有评论',
            result
        })
    })
})

module.exports = router;