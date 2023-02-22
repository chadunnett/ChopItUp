import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import { Outlet, Link } from "react-router-dom";


const Navigation = () => {
    return (
        <Navbar bg="primary" variant="dark" >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    ChopItUp
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
                <Nav.Link as={Link} to="/addPost">
                        Add Post
                    </Nav.Link>
                
                
            </Container>
        </Navbar >
    )
}

const Layout = () => {
    return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

            <Navigation />


            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
            < Outlet />

            {/* Footer */}
        </div >
    );
}

export default Layout;