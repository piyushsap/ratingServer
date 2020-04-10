const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRestaurants: async (root, args, { Restaurant }) => {
      const allRestaurants = await Restaurant.find();
      return allRestaurants;
    },
    searchRestaurants: async (root, { searchTerm }, { Restaurant }) => {
      if (searchTerm) {
        const searchResults = await Restaurant.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: "textScore" }
          }
        ).sort({
          score: { $meta: "textScore" }
        });
        return searchResults;
      } else {
        const restaurants = await Restaurant.find().sort();
        return restaurants;
      }
    },   
    getRestaurantRatings: async (root, { restaurantid }, { Rating }) => {
      const ratings = await Rating.find({ restaurantid });
      return ratings;
    },    
    getRestaurant: async (root, { _id }, { Restaurant }) => {
      const restaurant = await Restaurant.findOne({ _id });
      return restaurant;
    },
    getCurrentUser: async (root,args, {currentUser, User})=>{
      if(!currentUser){
        return null;
      }
      const user = await User.findOne({ username: currentUser.username })
      
      return user;
    }
  },
  Mutation: {
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    addRating: async (root, { comment, rating,  username, restaurantid }, { Rating }) => {
      console.log(comment, rating,  username, restaurantid)
      const newRating = await new Rating({
        comment,
        rating,
        username,
        restaurantid
      }).save();
      return newRating;
    },
  }
};
