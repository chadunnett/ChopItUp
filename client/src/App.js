import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//import Col from 'react-bootstrap/Col';
//import { useState, useEffect } from "react";
//import Row from 'react-bootstrap/Row';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from './utils/mutations';
import SignupForm from "./components/SignupForm";
import "./App.css";
import Home from "./views/Home";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import AuthService from './utils/auth';


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="addpost" element={<PostForm />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Container>
    </ApolloProvider>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            CHOPITUP
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </Nav>
          <Nav>
            {AuthService.loggedIn() && (
              <Nav.Link as={Link} to="/addpost" className="btn btn-outline-success">
                Add Post
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
