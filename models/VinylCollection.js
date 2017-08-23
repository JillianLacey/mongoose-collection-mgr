const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const VinylCollectionSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    albumName: {
        type: String,
        require: true
    },    
    condition: {
      type: String,
      required: true,
      enum: ["new", "good", "fair", "poor"]
    },
    signed: {
      type: Boolean,
      required: true
    },
    albumDetails:{
        tracks: Number,
        releaseYear: Number,
        rpm: {
            type: Number,
            enum: [33, 45, 78]
        }
    }, 
    genre: {
      type: Array,
      required: true
    },
    value: Number,
    forSale: {
        type: Boolean,
        required: true
      }
  });

  // name of collection, schema
  module.exports = mongoose.model("VinylCollection", VinylCollectionSchema);
