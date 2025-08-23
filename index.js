const mongo=require('mongodb');
require('dotenv').config();
const uri=process.env.MONGO_URI;
const dbName='NodeJs';
const client=new mongo.MongoClient(uri);
let db=null;//null 代表尚未成功
async function main(){
    try{
        await client.connect();
        db=client.db(dbName);
        console.log("連接到資料庫:",db.databaseName);
        let collection=db.collection('member');
        }catch(err){
        console.log("連接失敗",err);
    }
}
main().catch(console.error);
//建立網站伺服器基礎設定
const express=require('express');
const app=express();
const session=require('express-session');
app.use(session(
    {
        secret:'keyboard cat',
        resave:false,
        saveUninitialized:true,
    }
));
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded({extended:true}));//處理post請求
app.use(express.static('public'));//設定靜態檔案目錄

//路由設定
app.get('/',(req,res)=>{
    res.render("index.ejs",{user:req.session.user});
});

app.get('/member',(req,res)=>{
    res.render('member.ejs');
});

app.get('/error',(req,res)=>{
    const msg=req.query.msg;
    res.render('error.ejs',{msg});
});

app.post("/register",async (req,res)=>{
    const {name,password,email}=req.body;
    const collection=db.collection('member');
    let result=await collection.findOne({email:email});

    if(result!== null ){
        res.redirect('/error?msg=此電子郵件已被註冊');
        return;
    }

    result=await collection.insertOne({name, password, email});
    console.log("會員註冊成功",result.insertedId);
    res.redirect('/');

});

app.listen(3000,()=>{
    console.log("伺服器已啟動");
});
//路由設定