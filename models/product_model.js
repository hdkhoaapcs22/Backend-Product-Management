const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
thumbnail: String,
title: String,
description: String,
price: Number,
stock: Number,
availabilityStatus:String,
discountPercentage: Number,
status: String,
deleted: Boolean,
deletedAt: Date,
position: Number,
slug: { // title co the trùng nhau chính vì vậy, cần slug vì slug là duy nhất
    type: String,
    slug: "title",
    unique: true,
},
deleted: {
    type: Boolean,
    default: false,
}
}, {
timestamps: true,
});

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;