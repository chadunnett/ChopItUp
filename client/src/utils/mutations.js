import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
      reviews
      comments {
        _id
      }
    }
  }
`;

// export const ADD_COMMENT = gql`
//   mutation addComment($postId: ID!, $commentBody: String!) {
//     addComment(postId: $postId, commentBody: $commentBody) {
//       _id
//       commentBody
//       username
//       createdAt 
// }
// `;

// export const ADD_REVIEW = gql`
//   mutation addReview($postId: ID!, $reviews: Float!) {
//     addReview(postId: $postId, reviews: $reviews) {
//       _id
// }
// `;


// export const REMOVE_POST = gql`
//   mutation removePost($id: ID!) {
//     removePost(id: $id) {
//       _id
//     }
//   }
// `;

// export const REMOVE_COMMENT = gql`
//   mutation removeComment($postId : ID!, $commentId: ID!) {
//     removeComment($postId : ID!, $commentId: ID!) {
//       _id
//     }
//   }
// `;

// export const UPDATE_COMMENT = gql`
//   mutation updateComment($Id : ID!, $commentBody: String!) {
//     updateComment($Id : ID!, $commentBody: String!) {
//       _id
//       commentBody
//     }
//   }
// `;