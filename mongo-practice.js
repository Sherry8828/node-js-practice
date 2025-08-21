require('dotenv').config();
const mongo = require('mongodb');
const uri = process.env.MONGO_URI;
const dbName = 'NodeJs';
const client = new mongo.MongoClient(uri);
async function main() {
    try {
        await client.connect();
        let db = client.db(dbName);
        console.log("連接到資料庫:", db.databaseName);
        let collection = db.collection('member');

        //example: 新增資料
        /*let result =await collection.insertOne({ name: "test1", age: 30 , email:"test1@test.com "});
        console.log("建立成功"+result.insertedId);
        let results=await collection.insertMany([
            { name: "test5", age: 25, email: "test5@test.com" },
            { name: "test3", age: 28, email: "test3@test.com "},
            { name: "test4", age: 22, email: "test3@test.com"}]);
        console.log("建立成功"+results.insertedIds);
        let findResult = await collection.find({}).toArray();
        console.log("查詢結果:", findResult);*/

        //example: 更新資料
        /*let updateResult = await collection.updateOne({ _id: new mongo.ObjectId("68a6eb52fc46f0c0357b2e86") },
            { $set: { name: "test6" } });
        console.log("更新結果數量:", updateResult.modifiedCount);
        findResult = await collection.find({}).toArray();
        console.log("更新結果:", findResult);

        let updateResults = await collection.updateMany(
            {}, // 查詢條件，空物件代表全部
            { $set: { role: "reader" } });
        console.log("批量更新結果數量:", updateResults.modifiedCount);*/

        //example: 刪除資料
        /*let deleteResult = await collection.deleteOne({ _id: new mongo.ObjectId("68a6e91194148e936d67f956") });
        console.log("刪除結果數量:", deleteResult.deletedCount);
        findResult = await collection.find({}).toArray();
        console.log("刪除後查詢結果:", findResult);*/

        //example: 查詢資料
        let query = { age: { $lt: 30 } }; // 查詢年齡小於30的資料
        let query1={ $or: [{ name: "test1" }, { name: "test2" }] }; // 查詢名字為 test1 或 test2 的資料
        let query2 = { $and: [{ age: { $gt: 20 } }, { age: { $lt: 30 } }] }; // 查詢年齡大於20且小於30的資料
        let findResult = await collection.findOne(query);
        let sortResult = await collection.find(query2).sort({
            age: 1 // 按年齡升序排序;-1 代表降序
        }).toArray();
        
        console.log("查詢結果:", findResult);   
        console.log("排序查詢結果:", sortResult);

        // 這裡可以進行資料庫操作
    } catch (err) {
        console.log("連接失敗", err);
    } finally {
        await client.close();
        console.log("連接關閉");
    }
}

main();
