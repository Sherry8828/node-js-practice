const mongo = require('mongodb');
const uri = 'mongodb+srv://root:xxxxx@cluster-nodejs.eeleemc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&appName=Cluster-nodeJS';
const dbName = 'mydatabase';
 console.log("test");
const client =new mongo.MongoClient(uri);
 console.log("test2");
async function main() {
    try {
        await client.connect();
        console.log("連接成功");
        // 這裡可以進行資料庫操作
    } catch (err) {
        console.log("連接失敗", err);
    } finally {
        await client.close();
        console.log("連接關閉");
    }
}

main();
