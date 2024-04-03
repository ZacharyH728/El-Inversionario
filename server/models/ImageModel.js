const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const ImageModel = new mongoose.Schema({
    length: {
        type: Number,
    },
    chunkSize: {
        type: Number,
    },
    uploadDate: {
        type: Date,
    },
    fileName: {
        type: String,
    },
    contentType: {
        type: String
    }
})

module.exports = mongoose.model("imageModel", ImageModel, "Images.files")