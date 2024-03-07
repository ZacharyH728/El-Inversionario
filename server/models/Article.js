const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const uri = "mongodb+srv://ZacharyH728:c3yy58HKaKJObnd7@cluster0.mh3o3ze.mongodb.net/El_Inversionario?retryWrites=true&w=majority";

mongoose.connect(
    uri,
)
    .then(run())
    .catch(e => console.log(e.message));


const ArticleSchema = new mongoose.Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_last_edited: {
        type: Date,
        default: Date.now
    },
    views: Number,
    hidden: Boolean,
    authors: [String],
    editors: [String],
    reviwers: [String],
    article: {
        title: String,
        sub_heading: String,
        summary: String,
        body: String,
        related_article_ids: [Number],
        key_points: [String],
        pros: [String],
        cons: [String],
        tags: [String],
        photos: [{
            image: Buffer,
            name: String,
        }],
        refrences: [{
            name: String,
            date_accessed: Date,
            url: String,
        }]
    }
})

function run() {
    //pass
}

module.exports = mongoose.model("Article", ArticleSchema, "articles")