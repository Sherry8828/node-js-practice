const fs = require("fs");
/*寫入檔案*/
fs.writeFile("./file", "hello writing file2，哈哈哈哈", function (err) {

    if (err) {
        console.log("寫入失敗");
    } else {
        console.log("寫入成功");

    }
});

//讀取檔案

fs.readFile("./file", {encoding:"UTf8"}, function (err, data) {    
    if (err) {
        console.log("讀取失敗");
    } else {
        console.log("讀取成功", data);
    }   
});
