import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };

        fetch('tracker/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://localhost:3000/');
                } else {
                    setUsername('');
                    setPassword('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
        <Container className="pt-4">
            <Row>
                <Col xs={12} md={8} className="m-auto" >
                    {loading === false && <h1>Login</h1>}
                    {errors === true && <h2>Cannot log in with provided credentials</h2>}
                    {loading === false && (
                        <Form onSubmit={onSubmit} className="mt-5">
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>

    );
};

export default Login;