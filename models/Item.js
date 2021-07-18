const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    categoryID:{
        type: String,
        required: true
    },

    supplierID:{
        type: String,
        required: true
    },
    
    dateAdded:{
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('items', ItemSchema);