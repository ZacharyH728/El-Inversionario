const express = require('express');
const app = express();
const cors = require('cors');
const Article = require('./models/Article');
const ImageModel = ('./models/ImageModel')
const multer = require('multer');
const crypto = require('crypto')
const path = require('path');
const { ObjectId } = require('mongodb');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
require('dotenv').config();

app.use(cors())

const url = process.env.DATABASE_URL;

const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return {
            bucketName: 'Images',
        };
        // if (file.mimetype === 'image/*') {
        //     return {
        //         bucketName: 'Images'
        //     };
        // } else {
        //     return null;
        // }
    }
})

const upload = multer({ storage });

app.post('/submitArticle', upload.fields([{ name: 'Images', maxCount: 100 }]), async (req, res) => {
    // app.post('/submitArticle', (req, res) => {
    // app.post('/submitArticle', (req, res) => {
    // app.post('/submitArticle', (req, res) => {
    //console.log(req);
    // console.log("files", req.files.Images);
    // console.log(req.body);
    // for (let key in req.body) {
    //     console.log(key)
    // }
    // console.log(req.files);
    res.status(200).send();
    // console.log(req.body['Tag(s)'])


    function findPhoto(imageObj, fileArray) {
        let fileId = ""
        for (file of fileArray) {
            if (file.originalname === imageObj.fileName) {
                fileId = file.filename;
            }
        }

        // console.log(fileId)

        return { filename: fileId, name: imageObj.imageName }
    }

    const cleanedPhotos = []

    for (let photo of req.body.Files) {
        cleanedPhotos.push(findPhoto(JSON.parse(photo), req.files.Images))
    }

    console.log(cleanedPhotos);


    const article = await Article.create({
        authors: req.body['Author(s)'],
        editors: req.body['Editor(s)'],
        // reviewers: req.body['Review(s)'],
        article: {
            title: req.body.Title,
            summary: req.body.Summary,
            body: req.body.Body,
            tags: req.body['Tag(s)'],
            pros: req.body['Pros'],
            cons: req.body['Cons'],
            photos: cleanedPhotos

        }
    })

    console.log("\n");

    console.log(article.article);

    // res.json({file: req.file});
});

app.get('/test', (req, res) => {

    res.json('test ok');
});

app.get("/page", async (req, res) => {
    const articles = await Article.find();
    if (articles.length) {
        res.json(articles);
    } else {
        res.status(404).send("The articles you're looking for do not exist");
    }
})

app.get("/page/:tag", async (req, res) => {
    const { tag } = req.params;
    const articles = await Article.find({ 'article.tags': tag });
    if (articles.length) {
        res.json(articles);
    } else {
        res.status(404).send("The articles you're looking for do not exist");
    }
})

app.get("/article/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(await Article.findById(id))
    const article = await Article.findById(id);

    if (article) {
        res.json(article);
    } else {
        res.status(404).send("Sorry, the article you're looking for doesn't exist");
    }

})

app.get("/tags", async (req, res) => {
    // const tags = await Article.distinct('article.tags')

    let results = new Set();

    for (let element of (await Article.find().select('article.tags -_id'))) {
        results.add(element.article.tags[0]);
    }
    res.json([...results]);
})

app.listen(4000);
module.exports = express.Router();