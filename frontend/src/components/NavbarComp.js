import React, { useState, useEffect, Fragment, useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavbarComp = () => {
    
    const {user, logoutUser} = useContext(AuthContext);

    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <Container className="justify-content-around justify-content-md-start">
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                {user ? (
                    <Fragment>
                        <Link className="mynav-link px-0 px-md-2" to="/">
                          Dashboard
                        </Link>
                        <Link className="mynav-link px-0 px-md-2" to="/profil-page">
                          Profilpage
                        </Link>
                        <span className="mynav-link px-0 px-md-2 cursor-pointer" onClick={logoutUser}>
                          Logout
                        </span>
                      </Fragment>
                ) : (
                    <Fragment>
                        <Link className="mynav-link px-0 px-md-2" to="/login">
                            Login
                        </Link>
                        <Link className="mynav-link px-0 px-md-2" to="/signup">
                            Signup
                        </Link>
                    </Fragment>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarComp;
