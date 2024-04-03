const express = require('express');
const app = express();
const cors = require('cors');
const Article = require('./models/Article');
const ImageModel = require('./models/ImageModel')
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const multerS3 = require('multer-s3')

require('dotenv').config();

app.use(cors())

const url = process.env.DATABASE_URL;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucket = 'el.inversionario.images';
const region = 'us-west-1'


mongoose.connect(url)
    .catch(e => console.log(e.message));

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

const db = mongoose.connection;

// db.on("open", async () => {
//     console.log(await db.db.listCollections().toArray());

// })

// console.log(mongoose.connection.db.listCollections())

app.post('/submitArticle', upload.array('Images'), async (req, res) => {
    //console.log(req);
    // console.log("files", req.files.Images);
    // console.log(req.body);
    // for (let key in req.body) {
    //     console.log(key)
    // }

    // console.log(req.body['Files']);
    res.status(200).send();
    // console.log(req.body['Tag(s)'])

    // for (let photo of req.body.Images) {

    //     // console.log(JSON.parse(photo))

    //     // const imageInput = {
    //     //     "Body": imageToUpload,
    //     //     "Bucket": el.inversionario.images,
    //     //     "Key": imageName ,
    //     //     "ServersideEncryption": ,
    //     // }

    //     // const s3Command = new PutObjectCommand(imageInput);

    //     // const s3Reponse = await s3Client.send(s3Command);

    //     // console.log(s3Reponse);
    // }

    const cleanedPhotos = [];

    function findObjectByKeyValue(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            console.log(array[i][key])
            if (JSON.parse(array[i])[key] === value) {
                return JSON.parse(array[i]);
            }
        }
        return null;
    }

    // console.log(Object.keys(req.body))
    console.log(req.body['Files'])

    for (let uploadedImage of req.files) {
        const postedImage = findObjectByKeyValue(req.body['Files'], 'fileName', uploadedImage.originalname)
        console.log("posted", postedImage)
        console.log("uploaded", uploadedImage)
        cleanedPhotos.push({ url: uploadedImage.location, name: postedImage.imageName })
        // cleanedPhotos.push({ url: 'https://s3.' + region + '.amazonaws.com/' + bucket + '/' + req.body.['originalname'].replace(' ', '+'), name: postedImage.imageName })
    }


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

app.get("/image/:filename", async (req, res) => {
    const { filename } = req.params;
    const image = await ImageModel.findOne({ 'filename': filename });

    res.contentType('json');

    res.send(image);

    // console.log(new ObjectId(image._id.toString()));
    // image.read();

    // gfs.createReadStream(new ObjectId(image._id)).pipe(res);

    // res.contentType(image.contentType);
    // gfs.createReadStream(image.filename);
    // gfs.
    //     gfs.pipe(res);
    // const image = await ImageModel.find({});
    // console.log(image);
    // res.json(image);
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