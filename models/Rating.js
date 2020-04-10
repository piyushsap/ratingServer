const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({  
  comment: {
    type: String,
  },
  rating: {
    type: String,
  },
  username: {
    type: String,
  },
  restaurantid:{
    type: String,
  },
  addDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Rating", RatingSchema);
