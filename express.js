//載入express模組
const express = require('express');
//載入Application程式
const app = express();
//設定session管理工具
const session = require('express-session');
app.use(session({
    secret:"your-secret-key", //用於加密session的密鑰
    resave: false, //每次請求都重新儲存session
    saveUninitialized: true //未初始化的session會被儲存
}));


//設定根路徑路由
app.get('/', (req, res) => {
    console.log("主機名稱", req.hostname);
    console.log("請求的路徑", req.path);
    console.log("請求的協議", req.protocol);
    console.log("請求的IP", req.ip);
    console.log("請求的端口", req.socket.localPort);
    console.log("使用者代理", req.get('User-Agent'));
    const lang = req.get("accept-language");//"accept-language"標頭req.acceptsLanguages()
    const userId = req.session.userId; //從session中獲取userId

    if (lang.startsWith("zh")) {
        res.send('你好，Express.js! 你的使用者ID是: ' + userId);
    } else {
       res.send('Hello, Express.js! Your user ID is: ' + userId);
    }
    //res.send('Hello World from Express.js!');
});

app.get('/hello', (req, res) => {
    const name = req.query.name || 'World'; //從查詢字串中獲取name參數，若沒有則預設為'World'
    res.send(`Hello, ${name}!`); //回應一段文字
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
    req.session.userId = userId; //將userId存入session
    if(userId === '0') {
        let data={name: "forever", age: 18};
        //res.json(data); //回傳JSON格式
        res.render("city.ejs",{name: "台北市", population: 2500000, description: "台北市是台灣的首都，擁有豐富的文化和歷史遺產，是一個現代化與傳統並存的城市。"});
    }else{
        let data={name: "sherry", age: 18};
        //res.json(data); //回傳JSON格式
        res.render("city.ejs",{name: "高雄市", population: 2800000, description: "高雄市是台灣的第二大城市，以其港口和工業聞名，擁有美麗的海岸線和豐富的文化活動。"});
    }

   // res.send(`User ID is ${userId} and name is ${req.query.name || 'unknown'}`);
});

//設定樣板引擎
console.log(__dirname);
app.set('view engine', 'ejs');
//設定樣板檔案所在的目錄
app.set('views', "./views");

//靜態檔案服務 /static/20230919_155204.jpg
app.use('/static', express.static('public'));


//啟動伺服器網址:http://localhost:3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});