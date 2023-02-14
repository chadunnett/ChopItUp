const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
_id: ID 
username: String
email: String
posts: [Post]
}

type Post {
_id: ID
postText: String
createdAt: String
username: String
reviews: Float
comments: [Comment]
}

type Comment {
_id: ID
commentBody: String
username: String
createdAt: String
}

type Auth {
token: ID!
user: User
}

type Query {
me: User
users: [User]
user(username: String!): User
posts(username: String): [Post]
post(_id: ID!): Thought
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(postText: String): Post
    addComment(postId: ID!, commentBody: String!): Post
    addReview(postId: ID!, reviews: Float!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updateComment(postid: ID!, postText: String!): Post
}
`
// need to find a way to store image, use moter
//grid fs in mongodb
