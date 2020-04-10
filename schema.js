exports.typeDefs = `

type Restaurant {
  _id: ID
  name: String!
  cuisines: String!
  photo_url: String!
  all_reviews_count: String!
  address: String!
  locality: String!
  city: String!
  latitude: String!
  longitude: String!
  zipcode: String!
  locality_verbose: String!
  aggregate_rating: String!
  rating_text: String!
  votes: String!
  timings: String!
  rating: [Rating]
}

type Rating {
  _id: ID
  comment: String!
  rating: String!
  username: String!
  restaurantid: String!
  joinDate: String
}

type User {
  _id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
}

type Query {
  getAllRestaurants: [Restaurant]  
  searchRestaurants(searchTerm: String): [Restaurant]
  getCurrentUser: User
  getRestaurant(_id: ID!): Restaurant
  getRestaurantRatings(restaurantid: String): [Rating]
}

type Token {
  token: String!
}

type Mutation {
  signinUser(username: String!, password: String!): Token
  signupUser(username: String!, email: String!, password: String!): Token
  addRating(comment: String!, rating: String!, username: String!, restaurantid: String): Rating
}
`;
