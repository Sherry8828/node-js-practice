const mongo = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const dbName = 'NodeJs';
const client = new mongo.MongoClient(uri);
let db = null;//null 代表尚未成功
async function main() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("連接到資料庫:", db.databaseName);
        let collection = db.collection('member');

        app.listen(3000, () => {
            console.log("伺服器已啟動");
        });

    } catch (err) {
        console.log("連接失敗", err);
    }
}
main().catch(console.error);
//建立網站伺服器基礎設定
const express = require('express');
const app = express();
const session = require('express-session');
app.use(session(
    {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }
));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));//處理post請求
app.use(express.static('public'));//設定靜態檔案目錄

//路由設定
app.get('/', (req, res) => {
    res.render("index.ejs", { user: req.session.user });
});

app.get('/member', async (req, res) => {
    const member = req.session.member;
    if (!member) {
        res.redirect('/error?msg=請先登入');
        return;
    }
    //取得所有會員名稱
    const collection = db.collection('member');
    //舊寫法
    /*let result = await collection.find({});
    let data =[];
    await result.forEach(item=>{
        data.push(item);
    });
    res.render('member.ejs', { member,  data });*/


    //新寫法
    try {
        const data = await collection.find({}).toArray();
        console.log("查詢到的會員資料:", data);
        res.render('member.ejs', { member, data });
    } catch (err) {
        console.error("查詢失敗", err);
        res.redirect('/error?msg=查詢失敗');
    }

});

app.get('/error', (req, res) => {
    const msg = req.query.msg;
    res.render('error.ejs', { msg });
});

app.post("/register", async (req, res) => {
    const { name, password, email } = req.body;
    const collection = db.collection('member');
    let result = await collection.findOne({ email: email });

    if (result !== null) {
        res.redirect('/error?msg=此電子郵件已被註冊');
        return;
    }

    result = await collection.insertOne({ name, password, email });
    console.log("會員註冊成功", result.insertedId);
    res.redirect('/');

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const collection = db.collection('member');
    let result = await collection.findOne({ email: email, password: password });
    if (result === null) {
        res.redirect('/error?msg=帳號或密碼錯誤');
        return;
    }
    console.log("登入成功", result);
    //紀錄會員資料到session
    req.session.member = result;
    res.redirect('/member');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');

});
