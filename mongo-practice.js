require('dotenv').config();
const mongo = require('mongodb');
const uri = process.env.MONGO_URI;
const dbName = 'NodeJs';
 console.log("test");
const client =new mongo.MongoClient(uri);
 console.log("test2");
async function main() {
    try {
        await client.connect();
        let db = client.db(dbName);
        console.log("連接到資料庫:", db.databaseName);
        let collection = db.collection('member'); 

        await client.db("member").command({ ping: 1 });
        let result =await collection.insertOne({ name: "test1", age: 30 , email:"test1@test.com "});
        console.log("建立成功"+result.insertedId);
        let results=await collection.insertMany([
            { name: "test5", age: 25, email: "test5@test.com" },
            { name: "test3", age: 28, email: "test3@test.com "},
            { name: "test4", age: 22, email: "test3@test.com"}]);
        console.log("建立成功"+results.insertedIds);
        let findResult = await collection.find({}).toArray();
        console.log("查詢結果:", findResult);

        // 這裡可以進行資料庫操作
    } catch (err) {
        console.log("連接失敗", err);
    } finally {
        await client.close();
        console.log("連接關閉");
    }
}

main();
