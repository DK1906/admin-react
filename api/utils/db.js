

const mongoose = require("mongoose");

const port = 27017;
const hostname = "0.0.0.0";
const dbName = "wh1906";

const CONN_DB_STR = `mongodb://${hostname}:${port}/${dbName}`;

// 链接数据库
mongoose.connect(CONN_DB_STR,{useNewUrlParser: true});

const connection = mongoose.connection;

connection.once("connect",()=>{
    console.log("数据库已经链接成功...")
});


module.exports = connection;