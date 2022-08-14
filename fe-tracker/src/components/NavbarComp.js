import { useState, useEffect, Fragment } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    }
  });

  const handleLogout = (e) => {
    e.preventDefault();

    fetch("tracker/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.clear();
        window.location.replace("http://localhost:3000/login");
      });
  };

  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Container className="justify-content-around justify-content-md-start">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        {isAuth ? (
          <Fragment>
            <Link className="mynav-link px-0 px-md-2" to="/">
              Dashboard
            </Link>
            <Link className="mynav-link px-0 px-md-2" to="/profil-page">
              Profilpage
            </Link>
            <span className="mynav-link px-0 px-md-2 cursor-pointer" onClick={handleLogout}>
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
