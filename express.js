//載入express模組
const express = require('express');
//載入Application程式
const app = express();

//設定根路徑路由
app.get('/', (req, res) => {
    console.log("主機名稱", req.hostname);
    console.log("請求的路徑", req.path);
    console.log("請求的協議", req.protocol);
    console.log("請求的IP", req.ip);
    console.log("請求的端口", req.socket.localPort);
    console.log("使用者代理", req.get('User-Agent'));
    const lang = req.get("accept-language");//"accept-language"標頭req.acceptsLanguages()
    if (lang.startsWith("zh")) {
        res.send('你好，Express.js!');
    } else {
        res.send('Hello, Express.js!');
    }
    //res.send('Hello World from Express.js!');
});


//設定/about路由，當訪問http://localhost:3000/about時，回應一段文字
app.get('/about', (req, res) => {
    const data = req.query.max;//有區分大小寫耶querystring
    if (!data) {
        //res.status(400).send('Missing query parameter: max');
        res.redirect('/'); //重定向到根路徑
        return; 
    }   
    res.send('This is the about page. data: ' + data);
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id; //從路由參數中獲取
    if(userId === '0') {
        let data={name: "forever", age: 18};
        res.json(data); //回傳JSON格式
    }else{
        let data={name: "sherry", age: 18};
        res.json(data); //回傳JSON格式
    }

    res.send(`User ID is ${userId} and name is ${req.query.name || 'unknown'}`);
});


//啟動伺服器網址:http://localhost:3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});