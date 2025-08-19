//載入express模組
const express = require('express');
//載入Application程式
const app = express();
//啟動伺服器網址:http://localhost:3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});