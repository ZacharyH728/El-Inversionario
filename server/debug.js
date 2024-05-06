var MongoClient = require('mongodb').MongoClient;


const url = "";

try {
    var mongoClient = new MongoClient(uri);
    console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');

    return mongoClient;
} catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
}