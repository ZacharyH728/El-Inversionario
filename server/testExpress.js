const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();



app.listen(4000, () => console.log('API running on port 4000'));

app.get('/', (req, res) => {
    res.json("API connected");
})


const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {
    tls: true,
    tlsCAFile: './global-bundle.pem'
});

client.connect()
    .catch(e => console.log("Connection error:", e.message))
    .then(() => {
        console.log("connected successfully")
        client.close();
    });
