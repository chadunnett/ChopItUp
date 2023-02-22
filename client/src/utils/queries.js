import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      createdAt
      username
      reviews
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
        _id
      postText
      createdAt
      username
      reviews
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    
      posts {
        _id
        postText
        createdAt
        reviews
        comments {
        _id
        }
        
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users($username: String!) {
    users(username: $username) {
      _id
      username
      email
    
      posts {
        _id
        postText
        createdAt
        reviews
        comments {
        _id
        }
        
      }
    }
  }
`;
export const QUERY_ME = gql`

  {
    me {
      _id
      username
      email
    
      posts {
        _id
        postText
        createdAt
        reviews
        comments {
        _id
        }
    }
  }
  }
`;

