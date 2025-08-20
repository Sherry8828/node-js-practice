const mongo = require('mongodb');
const uri = 'mongodb+srv://root:root123@cluster-nodejs.eeleemc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-nodeJS';
const dbName = 'mydatabase';
 console.log("test");
const MongoClient =new mongo.MongoClient(uri);
 console.log("test2");
MongoClient.connect(async function(err){
    console.log("error");
    if (err) {
        console.log("連接失敗", err);
        return;
    }
    console.log("連接成功");
    MongoClient.close();
})

