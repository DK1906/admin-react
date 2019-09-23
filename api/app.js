

const express = require("express");
const port = 2906;
const hostname = "0.0.0.0";

const app  = express();
// const server = http.createServer(app);

const connection = require("./utils/db");


const http = require("http");
var https = require('https');
var fs = require("fs");

// 第一步：https
var privateKey  = fs.readFileSync('./cert/xx.key', 'utf8');  
var certificate = fs.readFileSync('./cert/xx.pem', 'utf8');  
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials,app);
var httpServer = http.createServer(app);


const cors = require("cors"); 
app.use(cors());   // cors 解决跨域问题  jsonp 代理  

app.use(express.json());     // from-data 
app.use(express.urlencoded({ extended: false }));   // x-www-form-urlencoded  获取 POST 请求 获取 参数数据

app.use(express.static("public"));   // 设置 public 为静态资源目录  

app.get("/demo",(req,res)=>{
    res.send("这是一个 后台的接口 服务器地址 "+ req.query);
});

app.get("/index",(req,res)=>{
    res.json({
        code:200,
        msg:"查看 服务器信息",
        query:req.query,
        headers:req.headers,
    })
});

const session = require("express-session");
app.use(session({
    secret:"test",
    name:"appTest",
    cookie:{maxAge:60*60*1000},  // session 记录数据的时长 
    resave:false,
    saveUninitialized:true
  }))

// const {checkToken} = require("./utils");
// app.use(checkToken)

// const vue = require("./vue");
// app.use("/vue",vue);

// const react = require("./react");
// app.use("/react",react);

const admin = require("./admin");
app.use("/admin",admin);


httpsServer.listen(port,hostname,()=>{
    console.log(`my api server is running  at https://${hostname}:${port}`)
})

// server.listen(port,hostname,()=>{
//     console.log(`my api server is running  at http://${hostname}:${port}`)
// })

