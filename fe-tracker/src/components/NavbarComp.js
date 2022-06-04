import { useState, useEffect, Fragment } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const NavbarComp = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    });

    const handleLogout = e => {
        e.preventDefault();

        fetch('tracker/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.clear();
            window.location.replace('http://localhost:3000/login');
        });
    };

    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    {isAuth ? (
                        <Fragment>
                            <Link className="mynav-link" to="/">Dashboard</Link>
                            <Link className="mynav-link" to="/profil-page">Profilpage</Link>
                            <Link className='mynav-link' to="" onClick={handleLogout}>Logout</Link>
                        </Fragment>

                    ) : (
                        <Fragment>
                            <Link className="mynav-link" to="/login">Login</Link>
                            <Link className='mynav-link' to="/signup">Signup</Link>
                        </Fragment>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarComp