const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const ImageModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})


module.exports = mongoose.model("imageModel", ImageModel)