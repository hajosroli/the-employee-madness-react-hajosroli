const mongoose = require("mongoose")

const { Schema } = mongoose;

const toolShema = new Schema({
    name: String,
    weight: Number
})

module.exports = mongoose.model("Tools", toolShema)