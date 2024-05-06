import { MongoClient } from 'mongodb';

const uri = "";

try {
    var mongoClient = new MongoClient(uri);
    console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');
} catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
}