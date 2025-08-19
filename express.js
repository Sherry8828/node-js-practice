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
    res.send('This is the about page. data: ' + data);
});

//啟動伺服器網址:http://localhost:3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});