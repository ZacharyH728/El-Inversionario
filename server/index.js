import express from 'express';
const app = express();
import cors from 'cors';
import multer from 'multer';
import {MongoClient} from 'mongodb';
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import multerS3 from 'multer-s3';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

app.use(cors())

const url = process.env.DATABASE_URI;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucket = 'el.inversionario.images';
const region = 'us-west-1'
const cloudFront = 'https://d2po7ns1qym4os.cloudfront.net/'
const client = new MongoClient(url);
const port = 4000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverOptions = {
    key: fs.readFileSync(__dirname + '/certs/selfsigned.key'),
    cert: fs.readFileSync(__dirname + '/certs/selfsigned.crt')
};


console.log(url)

async function main(){
    await client.connect().then(() => {
        console.log("Connected successfully to server")
    })

    const db = client.db('El-Inversionario');
    const articleCollections = db.collection("Article"); 
    const imageCollections = db.collection("imageModel");

    const s3Client = new S3Client({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        }
    
    })

    const upload = multer({
        storage: multerS3({
            s3: s3Client,
            bucket: 'el.inversionario.images',
            contentDisposition: 'attachment',
            acl: 'public-read',
            serverSideEncryption: 'AES256',
            key: function (req, file, cb) {
                console.log(file)
                cb(null, file.originalname);
            }
        })
    });
    
    app.post('/submitArticle', upload.array('Images'), async (req, res) => {
        res.status(200).send();
    
        const cleanedPhotos = [];
    
        function findObjectByKeyValue(array, key, value) {
            console.log("array", array, "key", key, "value", value)
            for (var i = 0; i < array.length; i++) {
                console.log("looking at ", array[i])
                if (JSON.parse(array[i])[key] === value) {
                    return JSON.parse(array[i]);
                }
            }
            return null;
        }
    
        console.log("body", req.body)
        console.log("files", req.files)
        console.log("body files", req.body['Files'])
    
        for (let uploadedImage of req.files) {
            const postedImage = findObjectByKeyValue([req.body['Files']], 'fileName', uploadedImage.originalname)
            console.log("posted", postedImage)
            console.log("uploaded", uploadedImage)
            cleanedPhotos.push({ url: cloudFront + uploadedImage['originalname'].replace(' ', '+'), name: postedImage.imageName })
        }
    
        await articleCollections.insertOne(
            {
                "authors": Array.isArray(req.body['Author(s)']) ? [...req.body['Author(s)']] : [req.body['Author(s)']],
                "editors": Array.isArray(req.body['Editor(s)']) ? [...req.body['Editor(s)']] : [req.body['Editor(s)']],
                // reviewers: req.body['Review(s)'],
                "article": {
                    "title": req.body.Title,
                    "summary": req.body.Summary,
                    "body": req.body.Body,
                    "tags": Array.isArray(req.body['Tag(s)']) ? [...req.body['Tag(s)']] : [req.body['Tag(s)']],
                    "pros": Array.isArray(req.body['Pros']) ? [...req.body['Pros']] : [req.body['Pros']],
                    "cons": Array.isArray(req.body['Cons']) ? [...req.body['Cons']] : [req.body['Cons']],
                    "photos": cleanedPhotos
                }
            }
        ).then(() => {
            "inserted a document"
        }).catch((error) => console.error(error));
    });
    
    app.get('/test', (req, res) => {
        res.json('Hello World');
    });

    app.get("/", async (req, res) => {
        res.redirect("/page")
    })
    
    app.get("/page", async (req, res) => {
        const articles = await articleCollections.find({}).toArray();
        if (articles.length) {
            res.json(articles);
        } else {
            res.status(404).send("The articles you're looking for do not exist");
        }
    })
    
    app.get("/page/:tag", async (req, res) => {
        const { tag } = req.params;
        const articles = await articleCollections.find({ 'article.tags': tag }).toArray();
        if (articles.length) {
            res.json(articles);
        } else {
            res.status(404).send("The articles you're looking for do not exist");
        }
    })
    
    app.get("/image/:filename", async (req, res) => {
        const { filename } = req.params;
        const image = await imageCollections.findOne({ 'filename': filename }).toArray();
    
        res.contentType('json');
    
        res.send(image);
    })
    
    
    app.get("/article/:id", async (req, res) => {
        const { id } = req.params;
        const article = await articleCollections.findOne({'article.id': id}).toArray();
    
        if (article) {
            res.json(article);
        } else {
            res.status(404).send("Sorry, the article you're looking for doesn't exist");
        }
    
    })

     app.get("/tags", async (req, res) => {
         let results = new Set();
    
         for (let article of await articleCollections.find({}).toArray()) {
             for (let tag of article.article.tags) {
                 results.add(tag);
             }
         }
         res.json([...results]);
     })


    var server = https.createServer(serverOptions, app);
    
    server.listen(port, function(){
        console.log(`Running server on ${port}`)
    });
}

main()
    .catch(console.error)
