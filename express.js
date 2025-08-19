//載入express模組
const express = require('express');
//載入Application程式
const app = express();

//設定根路徑路由
app.get('/', (req, res) => {
    res.send('Hello World from Express.js!');
});


//設定/about路由，當訪問http://localhost:3000/about時，回應一段文字
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

//啟動伺服器網址:http://localhost:3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});