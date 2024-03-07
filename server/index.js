const express = require('express');
const app = express();
const cors = require('cors');
const Article = require('./models/Article');

app.use(cors())

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

app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(await Article.findById(id))
    const article = await Article.findById(id);

    if (article) {
        res.json(article);
    } else {
        res.status(404).send("Sorry, the article you're looking for doesn't exist");
    }

})

app.listen(4000);