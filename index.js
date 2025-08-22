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
    }finally{
        await client.close();
        console.log("連接關閉");
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
app.listen(3000,()=>{
    console.log("伺服器已啟動");
});
//路由設定