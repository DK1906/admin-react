

const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const movie_schema = new Schema({
    genres:Array,
    rating:Object,
    title:String,
    casts:Array,
    directors:Array,
    images:Object,
    year:String,
    id:String
});

exports.Movie = mongoose.model("movies",movie_schema);


const users_schema = new Schema({
    username:String,
    nickname:String,
    mobile:String,
    password:String,
    dbpwd:String,
    avatar:String
});

exports.User = mongoose.model("users",users_schema);

const orders_schema = new Schema({
    username:String,
    nm:String,
    money:Number,
    discount:Number,
    cinema:String,
   count:Number,
   time:String,
   timeMark:Date
});

exports.MyOrder = mongoose.model("order",orders_schema);


const shopcars_schema = new Schema({
    username:String,
    goodId:String,
    goodInfo:Object,
    count:Number,
    time:Date,
})

exports.ShopCar = mongoose.model("shopcar",shopcars_schema);
const comments_schema = new Schema({
    username:String,
    nm:String,
    comment:String,
   time:String,
   avatar:String
  
});

exports.Comment = mongoose.model("comment",comments_schema);



const sets_schema = new Schema({
  
    nm:String,
    cinema:String,
    time:String,
    i:Number
  
  
});



exports.SetList = mongoose.model("set",sets_schema);

const code_schema = new Schema({
    mobile:Number,
    code:Number,
    time:Date
})


exports.Code= mongoose.model('code',code_schema);




const product_schema = new Schema({
  
   name:String,
   level:String
})


exports.Product= mongoose.model('product',product_schema);



const productList_schema = new Schema({
  
    status:String,
    name:String,
    price:Number,
    desc:String,
 })
 
 
 exports.ProductList= mongoose.model('allproduct',productList_schema);



 const role_schema = new Schema({
  
    status:String,
    name:String,
    power:String,
    desc:String,
 })
 
 
 exports.Role= mongoose.model('role',role_schema);


 const team_schema = new Schema({
  
    status:String,
    username:String,
    password:String,
    roleName:String,
 })
 
 
 exports.Team= mongoose.model('team',team_schema);