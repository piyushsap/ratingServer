const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({  
  name: {
    type: String,
    required: true
  },
  cuisines: {
    type: String,
  },
  photo_url: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  all_reviews_count: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  locality_verbose: {
    type: String,
    required: true
  },
  aggregate_rating: {
    type: String,
    required: true
  },
  rating_text: {
    type: String,
    required: true
  },
  votes: {
    type: String,
    required: true
  },
  timings: {
    type: String,
    required: true
  },
});

RestaurantSchema.index({
  "$**": "text"
});
module.exports = mongoose.model("Restaurant", RestaurantSchema);
