//載入express模組
const express = require('express');
//載入Application程式
const app = express();
//設定樣板引擎
console.log(__dirname);
app.set('view engine', 'ejs');
//設定樣板檔案所在的目錄
app.set('views', "./views");

//靜態檔案服務 /static/20230919_155204.jpg
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: true })); //解析URL編碼的請求體




//設定根路徑路由
app.get('/', (req, res) => {
  
    res.render('home.ejs');
});

app.post('/hello', (req, res) => {
    const name = req.body.name || 'World'; //從查詢字串中獲取name參數，若沒有則預設為'World'
    res.send(`Hello, ${name}!`); //回應一段文字
});

app.get('/city', (req, res) => {
    const name = req.query.city;//有區分大小寫耶querystring
    if (name === 'kaohsiung') {
        res.render("city.ejs", { name: "高雄市", population: 2800000, description: "高雄市是台灣的第二大城市，以其港口和工業聞名，擁有美麗的海岸線和豐富的文化活動。" });
        return;
    }
    else if (name === 'taipei') {
        res.render("city.ejs", { name: "台北市", population: 2500000, description: "台北市是台灣的首都，擁有豐富的文化和歷史遺產，是一個現代化與傳統並存的城市。" });
    } else {
        res.redirect("https://www.google.com/search?q=" + name);
    }
});



//啟動伺服器網址:http://localhost:3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});